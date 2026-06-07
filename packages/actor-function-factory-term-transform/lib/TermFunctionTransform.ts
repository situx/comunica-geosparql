import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator } from '@comunica/utils-expression-evaluator';

import { transformGeometryLiteral } from '@comunica/utils-expression-evaluator/lib/functions/GeoHelpers';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/transform
 */
export class TermFunctionTransform extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.TRANSFORM,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.TRANSFORM).onLiteral2(() => (term1, term2) => {
        console.log(term1);
        console.log(term2);
        const res=transformGeometryLiteral(term1, term2.str());
        console.log(res);
        return serializeGeometry(res, term1.dataType)
      }).collect(),
    });
  }
}
