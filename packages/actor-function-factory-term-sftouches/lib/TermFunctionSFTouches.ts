import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/touches
 */
export class TermFunctionSFTouches extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.SFTOUCHES,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.SFTOUCHES).geometryTestNormalizedCRS(() => (left, right) => turf.booleanTouches(left, right)).collect(),
    });
  }
}
