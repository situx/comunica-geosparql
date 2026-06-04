import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asWKT
 */
export class TermFunctionAsWKT extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ASWKT,
      overloads: declare(GeoSparqlOperator.ASWKT).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#wktLiteral')).collect(),
    });
  }
}
