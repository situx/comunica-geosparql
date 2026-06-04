import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { transformGeometryLiteralCRS84 } from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/transform
 */
export class TermFunctionTransformCRS84 extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.TRANSFORMCRS84,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.TRANSFORMCRS84).onLiteral1(() => term1 => serializeGeometry(transformGeometryLiteralCRS84(term1), term1.dataType)).collect(),
    });
  }
}
