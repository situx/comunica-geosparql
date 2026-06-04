import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isTriangle
 */
export class TermFunctionIsRectangle extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISRECTANGLE,
      overloads: declare(GeoSparqlExtOperator.ISRECTANGLE).onGeometry1(
        () => (thegeom) => {
          if (thegeom.type === 'Polygon') {
            return bool(turf.area(turf.bboxPolygon(turf.bbox(thegeom))) === turf.area(thegeom));
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
