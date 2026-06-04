import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minY
 */
export class TermFunctionMinY extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MINY,
      overloads: declare(GeoSparqlOperator.MINY).onGeometry1(() => (thegeom) => {
        let minY = Number.MAX_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[1] < minY) {
            minY = currentCoord[1];
          }
        });
        return double(minY);
      }).collect(),
    });
  }
}
