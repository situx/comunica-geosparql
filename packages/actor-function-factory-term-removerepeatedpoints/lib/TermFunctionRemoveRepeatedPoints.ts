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
export class TermFunctionRemoveRepeatedPoints extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.REMOVEREPEATEDPOINTS,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.REMOVEREPEATEDPOINTS).onGeometryTup1(() => term => serializeGeometry(turf.cleanCoords(term[0]), term[2])).collect(),
    });
  }
}
