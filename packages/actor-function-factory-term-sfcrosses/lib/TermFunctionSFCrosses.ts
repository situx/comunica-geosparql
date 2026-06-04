import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/sfCrosse
 */
export class TermFunctionSFCrosses extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.SFCROSSES,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.SFCROSSES).geometryTestNormalizedCRS(() => (left, right) => turf.booleanCrosses(left, right)).collect(),
    });
  }
}
