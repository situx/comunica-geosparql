import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asSTL
 */
export class TermFunctionAsSTL extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ASSTL,
      overloads: declare(GeoSparqlExtOperator.ASSTL).onGeometry1(() => term => serializeGeometry(term, 'http://www.opengis.net/ont/geosparql#stlLiteral')).collect(),
    });
  }
}
