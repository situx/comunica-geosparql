import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import {distance3DGeoms, is3D} from '@comunica/utils-expression-evaluator/lib/functions/GeoHelpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8dc
 */
export class TermFunctionRCC8DC extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8DC,
      overloads: declare(GeoSparqlOperator.RCC8DC).geometryTestNormalizedCRS(() => (left, right) => {
        if (is3D(left) && is3D(right)) {
          return distance3DGeoms(left, right) <= 0;
        }
        return turf.booleanDisjoint(left, right);
      }).collect(),
    });
  }
}
