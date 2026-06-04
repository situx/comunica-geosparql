import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/ehInside
 */
export class TermFunctionEHInside extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.EHINSIDE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.EHINSIDE).geometryTestNormalizedCRS(() => (left, right) => turf.booleanContains(right, left)).collect(),
    });
  }
}
