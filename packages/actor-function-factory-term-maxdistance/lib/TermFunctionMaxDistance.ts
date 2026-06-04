import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  distanceWrapper,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/maxDistance
 */
export class TermFunctionMaxDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.MAXDISTANCE,
      overloads: declare(GeoSparqlExtOperator.MAXDISTANCE).geometryFuncNormalizedCRS(() => (left, right) => {
        let maxDistance = Number.MIN_VALUE;
        turf.coordEach(left, (currentCoord, _coordIndex) => {
          turf.coordEach(right, (currentCoord1, _coordIndex1) => {
            const curdist = distanceWrapper(currentCoord, currentCoord1);
            if (curdist > maxDistance) {
              maxDistance = curdist;
            }
          });
        });
        return double(maxDistance);
      }).collect(),
    });
  }
}
