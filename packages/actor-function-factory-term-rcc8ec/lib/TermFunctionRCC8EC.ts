import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8ec
 */
export class TermFunctionRCC8EC extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8EC,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8EC).geometryTestNormalizedCRS(() => (left, right) => turf.booleanTouches(left, right)).collect(),
    });
  }
}
