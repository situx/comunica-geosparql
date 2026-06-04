import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/scale
 */
export class TermFunctionRotate extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.ROTATE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.ROTATE).onGeometryTup1Literal1(() => (term1, term2) => serializeGeometry(turf.transformRotate(term1[0], Number.parseFloat(term2.str())), term1[2])).collect(),
    });
  }
}
