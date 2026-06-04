import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/endPoint
 */
export class TermFunctionEndPoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ENDPOINT,
      overloads: declare(GeoSparqlExtOperator.ENDPOINT).onGeometryTup1(() => (thegeomtup) => {
        const thegeom = thegeomtup[0];
        const datatype = thegeomtup[2];
        if (thegeom.type === 'Point') {
          return serializeGeometry(thegeom, datatype);
        }
        return serializeGeometry(turf.findPoint(thegeom, { coordIndex: -1 }).geometry, datatype);
      }).collect(),
    });
  }
}
