import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlExtOperator,
  maxDistanceCalc,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';

/**
 * http://www.opengis.net/def/function/geosparql/withinDistance
 */
export class TermFunctionFullyWithinDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.FULLYWITHINDISTANCE,
      overloads: declare(GeoSparqlExtOperator.FULLYWITHINDISTANCE).onLiteral3(() => (term, term2, term3) => {
        const left = parseGeometry(term)[0];
        const right = parseGeometry(term2)[0];
        const distance = Number.parseFloat(term3.str());
        const maxdist = maxDistanceCalc(left, right);
        return bool(maxdist !== -1 && maxdist <= distance);
      }).collect(),
    });
  }
}
