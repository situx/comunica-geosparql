import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/X
 */
export class TermFunctionX extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.X,
      overloads: declare(GeoSparqlExtOperator.X).onGeometry1(() => (thegeom) => {
        if (thegeom.type === 'Point') {
          return double(turf.getCoord(thegeom)[0]);
        }
        return double(turf.getCoord(turf.centroid(thegeom))[0]);
      }).collect(),
    });
  }
}
