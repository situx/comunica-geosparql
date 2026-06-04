import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/Z
 */
export class TermFunctionZ extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.Z,
      overloads: declare(GeoSparqlExtOperator.Z).onGeometry1(() => (thegeom) => {
        if (thegeom.type === 'Point') {
          return double(turf.getCoord(thegeom)[2]);
        }
        return double(turf.getCoord(turf.centroid(thegeom))[2]);
      }).collect(),
    });
  }
}
