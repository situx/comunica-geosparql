import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/translate
 */
export class TermFunctionTranslate extends TermFunctionBase {
  public constructor() {
    super({
      arity: 3,
      operator: GeoSparqlExtOperator.TRANSLATE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.TRANSLATE).onGeometryTup1Literal2(() => (term1, term2, term3) => serializeGeometry(turf.transformTranslate(term1[0], Number.parseFloat(term2.str()), Number.parseFloat(term3.str())), term1[2])).collect(),
    });
  }
}
