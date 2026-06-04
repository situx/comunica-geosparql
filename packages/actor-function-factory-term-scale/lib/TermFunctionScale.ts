import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlExtOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

/**
 * http://www.opengis.net/def/function/geosparql/scale
 */
export class TermFunctionScale extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.SCALE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.SCALE).onTerm3(() => (term1, term2, term3) => {
        return new StringLiteral('');
        //return serializeGeometry(turf.transformScale(parseGeometry(<StringLiteral>term1)[0], Number.parseFloat(<StringLiteral>term2.str().toString()), Number.parseFloat(<StringLiteral>term3.toString())),term1.termType);
      }).collect(),
    });
  }
}
