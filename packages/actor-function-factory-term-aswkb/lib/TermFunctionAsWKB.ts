import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asWKT
 */
export class TermFunctionAsWKB extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ASWKB,
      overloads: declare(GeoSparqlExtOperator.ASWKB).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#wkbLiteral')).collect(),
    });
  }
}
