import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isRing
 */
export class TermFunctionIsRing extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISRING,
      overloads: declare(GeoSparqlExtOperator.ISRING).onGeometry1(
        () => (thegeom) => {
          if (thegeom.type === 'LineString' && typeof (thegeom) !== 'undefined') {
            const firstcoord = turf.coordAll(thegeom)[0];
            const lastcoord = turf.coordAll(thegeom)[thegeom.coordinates.length - 1];
            let closed = false;
            if (firstcoord[0] === lastcoord[0] && firstcoord[1] === lastcoord[1]) {
              closed = true;
            }
            return bool(closed && turf.kinks(thegeom).features.length === 0);
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
