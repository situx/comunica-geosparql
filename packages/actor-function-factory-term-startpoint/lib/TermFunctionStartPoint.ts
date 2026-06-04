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
export class TermFunctionStartPoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.STARTPOINT,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.STARTPOINT).onGeometryTup1(() => thegeom => serializeGeometry(turf.findPoint(thegeom[0]).geometry, thegeom[2])).collect(),
    });
  }
}
