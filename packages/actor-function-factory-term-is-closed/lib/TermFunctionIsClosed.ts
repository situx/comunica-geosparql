import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isClosed
 */
export class TermFunctionIsClosed extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ISCLOSED,
      overloads: declare(GeoSparqlOperator.ISCLOSED).onGeometry1(
        () => (thegeom) => {
          if (thegeom.type.includes('Polygon')) {
            return bool(true);
          }
          if (typeof (thegeom) !== 'undefined' && thegeom.type === 'LineString') {
            const firstcoord = turf.coordAll(thegeom)[0];
            const lastcoord = turf.coordAll(thegeom)[thegeom.coordinates.length - 1];
            if (firstcoord[0] === lastcoord[0] && firstcoord[1] === lastcoord[1]) {
              return bool(true);
            }
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
