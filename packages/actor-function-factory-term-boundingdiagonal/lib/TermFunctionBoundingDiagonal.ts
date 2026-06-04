import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator, string } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/boundary
 */
export class TermFunctionBoundingDiagonal extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.BOUNDINGDIAGONAL,
      overloads: declare(GeoSparqlExtOperator.BOUNDINGDIAGONAL).onGeometryTup1(() => (term) => {
        const thebbox = turf.bboxPolygon(turf.bbox(term[0])).bbox;
        if (thebbox) {
          // eslint-disable-next-line max-len
          return serializeGeometry(turf.getGeom({ type: 'LineString', coordinates: [[ thebbox[0], thebbox[1] ], [ thebbox[2], thebbox[3] ]]}), term[2]);
        }
        return string('The calculated bounding box was invalid');
      }).collect(),
    });
  }
}
