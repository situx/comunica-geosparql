import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  distanceWrapper,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionLongestLine extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.LONGESTLINE,
      overloads: declare(GeoSparqlExtOperator.LONGESTLINE).geometryFuncNormalizedCRS(() => (left, right) => {
        let maxDistance = Number.MIN_VALUE;
        let maxDistancePointPair: number[][] = [];
        turf.coordEach(left, (currentCoord, _coordIndex) => {
          turf.coordEach(right, (currentCoord1, _coordIndex1) => {
            const curdist = distanceWrapper(currentCoord, currentCoord1);
            if (curdist > maxDistance) {
              maxDistance = curdist;
              maxDistancePointPair = [ currentCoord, currentCoord1 ];
            }
          });
        });
        return serializeGeometry(turf.lineString([ maxDistancePointPair[0], maxDistancePointPair[1] ]).geometry, 'http://www.opengis.net/ont/geosparql#wktLiteral');
      }).collect(),
    });
  }
}
