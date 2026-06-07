import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';
import { maxDistanceCalc } from '@comunica/utils-expression-evaluator/lib/functions/GeoHelpers';


/**
 * http://www.opengis.net/def/function/geosparql/maxDistance
 */
export class TermFunctionMaxDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.MAXDISTANCE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.MAXDISTANCE).geometryFuncNormalizedCRS(() => (left, right) => double(maxDistanceCalc(left, right))).collect(),
    });
  }
}
