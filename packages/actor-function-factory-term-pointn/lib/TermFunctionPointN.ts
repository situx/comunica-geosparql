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
export class TermFunctionPointN extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.POINTN,
      overloads: declare(GeoSparqlExtOperator.POINTN).onGeometryTup1Literal1(() => (geomtup, index) => {
        // eslint-disable-next-line max-len
        return serializeGeometry(turf.findPoint(geomtup[0], { coordIndex: Number.parseInt(index.str(), 10) }).geometry, geomtup[2]);
      }).collect(),
    });
  }
}
