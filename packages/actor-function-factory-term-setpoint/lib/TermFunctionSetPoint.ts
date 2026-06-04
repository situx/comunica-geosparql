import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  parseGeometry,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/removePoint
 */
export class TermFunctionSetPoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 3,
      operator: GeoSparqlExtOperator.SETPOINT,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.SETPOINT).onGeometryTup1Literal2(() => (thegeom, position, point) => {
        const theposition = Number.parseInt(position.str(), 10);
        const thepoint = turf.getCoord(<GJ.Point>parseGeometry(point)[0]);
        turf.coordEach(thegeom[0], (currentCoord, coordIndex) => {
          if (coordIndex === theposition) {
            console.log(currentCoord);
            console.log(thepoint);
            currentCoord[0] = thepoint[0];
            currentCoord[1] = thepoint[1];
            if (thepoint.length > 2) {
              if (currentCoord.length === 2) {
                currentCoord.push(thepoint[2]);
              } else {
                currentCoord[2] = thepoint[2];
              }
            }
          }
        });
        return serializeGeometry(thegeom[0], thegeom[2]);
      }).collect(),
    });
  }
}
