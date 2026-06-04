import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';
import {
  string,
} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionOffsetCurve extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.OFFSETCURVE,
      overloads: declare(GeoSparqlExtOperator.OFFSETCURVE).onGeometryTup1Literal1(() => (geomtup, offset) => {
        if (geomtup[0].type === 'LineString') {
          // eslint-disable-next-line max-len
          return serializeGeometry(turf.lineOffset(geomtup[0], Number.parseFloat(offset.str())).geometry, geomtup[2], geomtup[1]);
        }
        if (geomtup[0].type === 'MultiLineString') {
          // eslint-disable-next-line max-len
          return serializeGeometry(turf.lineOffset(geomtup[0], Number.parseFloat(offset.str())).geometry, geomtup[2], geomtup[1]);
        }
        return string('The function offsetCurve is only defined for (Multi)LineString');
      }).collect(),
    });
  }

}
