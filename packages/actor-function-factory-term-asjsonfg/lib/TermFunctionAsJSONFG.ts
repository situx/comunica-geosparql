import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asJSONFG
 */
export class TermFunctionAsJSONFG extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ASJSONFG,
      overloads: declare(GeoSparqlExtOperator.ASJSONFG).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#jsonfgLiteral')).collect(),
    });
  }
}
