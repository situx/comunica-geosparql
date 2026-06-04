import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  integer,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/spatialDimension
 */
export class TermFunctionSpatialDimension extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.SPATIALDIMENSION,
      overloads: declare(GeoSparqlOperator.SPATIALDIMENSION).onGeometry1(() => (thegeom) => {
        let coordinator = 0;
        turf.coordEach(thegeom, (currentCoord) => {
          if (currentCoord.length > coordinator) {
            coordinator = currentCoord.length;
          }
        });
        return integer(coordinator);
      }).collect(),
    });
  }
}
