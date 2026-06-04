import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8po
 */
export class TermFunctionRCC8PO extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8PO,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8PO).geometryTestNormalizedCRS(() => (left, right) => turf.booleanOverlap(left, right)).collect(),
    });
  }
}
