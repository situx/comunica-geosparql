import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/removePoint
 */
export class TermFunctionRemovePoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.REMOVEPOINT,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.REMOVEPOINT).onGeometryTup1Literal1(() => (thegeom, offset) => {
        const theoffset = Number.parseInt(offset.str(), 10);
        turf.coordEach(thegeom[0], (currentCoord, coordIndex) => {
          if (coordIndex === theoffset) {
            currentCoord.pop();
          }
        });
        return serializeGeometry(thegeom[0], thegeom[2]);
      }).collect(),
    });
  }
}
