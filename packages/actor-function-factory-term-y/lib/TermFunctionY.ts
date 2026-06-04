import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/Y
 */
export class TermFunctionY extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.Y,
      overloads: declare(GeoSparqlExtOperator.Y).onGeometry1(() => (thegeom) => {
        if (thegeom.type === 'Point') {
          return double(turf.getCoord(thegeom)[1]);
        }
        return double(turf.getCoord(turf.centroid(thegeom))[1]);
      }).collect(),
    });
  }
}
