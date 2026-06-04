import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8tpp
 */
export class TermFunctionRCC8TPP extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8TPP,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8TPP).geometryTestNormalizedCRS(() => (left, right) => turf.booleanWithin(right, left)).collect(),
    });
  }
}
