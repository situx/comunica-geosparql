import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxZ
 */
export class TermFunctionSimplify extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.SIMPLIFY,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.SIMPLIFY).onGeometryTup1Literal1(() => (geomtup, toleranceLiteral) => serializeGeometry(turf.simplify(geomtup[0], { tolerance: Number.parseFloat(toleranceLiteral.str()) }), geomtup[2])).collect(),
    });
  }
}
