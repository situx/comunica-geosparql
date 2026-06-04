import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minX
 */
export class TermFunctionMinX extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MINX,
      overloads: declare(GeoSparqlOperator.MINX).onGeometry1(() => (thegeom) => {
        let minX = Number.MAX_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[0] < minX) {
            minX = currentCoord[0];
          }
        });
        return double(minX);
      }).collect(),
    });
  }
}
