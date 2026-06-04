import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxZ
 */
export class TermFunctionMaxZ extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MAXZ,
      overloads: declare(GeoSparqlOperator.MAXZ).onGeometry1(() => (thegeom) => {
        let maxZ = Number.MIN_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[2] > maxZ) {
            maxZ = currentCoord[2];
          }
        });
        return double(maxZ);
      }).collect(),
    });
  }
}
