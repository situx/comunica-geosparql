import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minZ
 */
export class TermFunctionMinZ extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MINZ,
      overloads: declare(GeoSparqlOperator.MINZ).onGeometry1(() => (thegeom) => {
        let minZ = Number.MAX_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[2] < minZ) {
            minZ = currentCoord[2];
          }
        });
        return double(minZ);
      }).collect(),
    });
  }
}
