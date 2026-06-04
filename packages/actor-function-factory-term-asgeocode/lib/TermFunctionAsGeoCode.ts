import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asGeoCode
 */
export class TermFunctionAsGeoCode extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.ASGEOCODE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.ASGEOCODE).onGeometry1Literal1(() => (term1, term2) => serializeGeometry(term1, term2.str())).collect(),
    });
  }
}
