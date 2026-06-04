import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/ehEquals
 */
export class TermFunctionEHEquals extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.EHEQUALS,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.EHEQUALS).geometryTestNormalizedCRS(() => (left, right) => turf.booleanEqual(left, right)).collect(),
    });
  }
}
