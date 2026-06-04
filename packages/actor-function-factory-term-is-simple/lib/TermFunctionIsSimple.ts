import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isSimple
 */
export class TermFunctionIsSimple extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ISSIMPLE,
      overloads: declare(GeoSparqlOperator.ISSIMPLE).onGeometry1(
        () => (thegeom) => {
          if (thegeom.type === 'Point') {
            return bool(true);
          }
          // eslint-disable-next-line max-len
          if (thegeom.type === 'LineString' || thegeom.type === 'MultiLineString' || thegeom.type === 'MultiPolygon' || thegeom.type === 'Polygon') {
            return bool(turf.kinks(thegeom).features.length === 0);
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
