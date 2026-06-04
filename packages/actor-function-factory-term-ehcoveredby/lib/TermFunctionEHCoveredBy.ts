import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/ehCovers
 */
export class TermFunctionEHCoveredBy extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.EHCOVEREDBY,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.EHCOVEREDBY).geometryTestNormalizedCRS(() => (left, right) => turf.booleanContains(right, left)).collect(),
    });
  }
}
