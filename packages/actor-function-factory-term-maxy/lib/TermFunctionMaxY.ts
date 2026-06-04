import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxY
 */
export class TermFunctionMaxY extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MAXY,
      overloads: declare(GeoSparqlOperator.MAXY).onGeometry1(() => (thegeom) => {
        let maxY = Number.MIN_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[1] > maxY) {
            maxY = currentCoord[1];
          }
        });
        return double(maxY);
      }).collect(),
    });
  }
}
