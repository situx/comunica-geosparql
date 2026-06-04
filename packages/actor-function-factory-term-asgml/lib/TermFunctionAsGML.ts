import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asWKT
 */
export class TermFunctionAsGML extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ASGML,
      overloads: declare(GeoSparqlOperator.ASGML).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#gmlLiteral')).collect(),
    });
  }
}
