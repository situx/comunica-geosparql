import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/ehCovers
 */
export class TermFunctionEHOverlap extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.EHOVERLAP,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.EHOVERLAP).geometryTestNormalizedCRS(() => (left, right) => turf.booleanOverlap(left, right)).collect(),
    });
  }
}
