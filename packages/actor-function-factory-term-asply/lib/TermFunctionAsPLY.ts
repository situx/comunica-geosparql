import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator, string,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asPLY
 */
export class TermFunctionAsPLY extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ASPLY,
      overloads: declare(GeoSparqlExtOperator.ASPLY).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#plyLiteral')).collect(),
    });
  }
}
