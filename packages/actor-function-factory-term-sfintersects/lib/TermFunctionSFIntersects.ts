import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import {intersects3D, is3D} from '@comunica/utils-expression-evaluator/lib/functions/GeoHelpers';
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
          return intersects3D(left, right);
        }
        return turf.booleanIntersects(left, right);
      }).collect(),
    });
  }
}
