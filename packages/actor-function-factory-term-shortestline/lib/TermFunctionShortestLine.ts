import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  distanceWrapper,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minDistance
 */
export class TermFunctionShortestLine extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.SHORTESTLINE,
      overloads: declare(GeoSparqlExtOperator.SHORTESTLINE).geometryFuncNormalizedCRS(() => (left, right) => {
        let minDistance = Number.MAX_VALUE;
        let minDistancePointPair: number[][] = [];
        turf.coordEach(left, (currentCoord, _coordIndex) => {
          turf.coordEach(right, (currentCoord1, _coordIndex1) => {
            const curdist = distanceWrapper(currentCoord, currentCoord1);
            if (curdist < minDistance) {
              minDistance = curdist;
              minDistancePointPair = [ currentCoord, currentCoord1 ];
            }
          });
        });
        return serializeGeometry(turf.lineString([ minDistancePointPair[0], minDistancePointPair[1] ]).geometry, 'http://www.opengis.net/ont/geosparql#wktLiteral');
      }).collect(),
    });
  }
}
