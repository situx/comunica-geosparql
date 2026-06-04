import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8eq
 */
export class TermFunctionRCC8EQ extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8EQ,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8EQ).geometryTestNormalizedCRS(() => (left, right) => turf.booleanEqual(left, right)).collect(),
    });
  }
}
