import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8tppi
 */
export class TermFunctionRCC8TPPI extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8TPPI,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8TPPI).geometryTestNormalizedCRS(() => (left, right) => turf.booleanContains(left, right)).collect(),
    });
  }
}
