import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import {distance3DGeoms, is3D} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/intersects
 */
export class TermFunctionSFIntersects extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.SFINTERSECTS,
      overloads: declare(GeoSparqlOperator.SFINTERSECTS).geometryTestNormalizedCRS(() => (left, right) => {
        if (is3D(left) && is3D(right)) {
          return distance3DGeoms(left, right) === 0;
        }
        return turf.booleanIntersects(left, right);
      }).collect(),
    });
  }
}
