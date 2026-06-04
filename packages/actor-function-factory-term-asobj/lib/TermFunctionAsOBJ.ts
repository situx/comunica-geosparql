import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator, string,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asPLY
 */
export class TermFunctionAsOBJ extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ASOBJ,
      overloads: declare(GeoSparqlExtOperator.ASOBJ).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#objLiteral')).collect(),
    });
  }
}
