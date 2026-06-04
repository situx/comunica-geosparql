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
export class TermFunctionPointOnSurface extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.POINTONSURFACE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.POINTONSURFACE).onGeometryTup1(() => term => serializeGeometry(turf.pointOnFeature(term[0]).geometry, term[2])).collect(),
    });
  }
}
