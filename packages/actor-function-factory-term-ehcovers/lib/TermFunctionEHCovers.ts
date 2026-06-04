import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/ehCovers
 */
export class TermFunctionEHCovers extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.EHCOVERS,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.EHCOVERS).geometryTest(() => (left, right) => turf.booleanContains(left, right)).collect(),
    });
  }
}
