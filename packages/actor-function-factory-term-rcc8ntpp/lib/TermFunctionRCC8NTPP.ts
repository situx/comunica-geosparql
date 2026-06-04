import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8po
 */
export class TermFunctionRCC8NTPP extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8NTPP,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8NTPP).geometryTestNormalizedCRS(() => (left, right) => turf.booleanContains(right, left)).collect(),
    });
  }
}
