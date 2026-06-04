import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/withinDistance
 */
export class TermFunctionWithinDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.WITHINDISTANCE,
      overloads: declare(GeoSparqlExtOperator.WITHINDISTANCE).onLiteral3(() => (term, term2, term3) => {
        const left = parseGeometry(term)[0];
        const right = parseGeometry(term2)[0];
        const distance = Number.parseFloat(term3.str());
        let measureddistance = -1;
        if (left.type === 'Point' && right.type === 'Point') {
          measureddistance = turf.distance(left, right);
        }
        if (left.type === 'Point' && right.type === 'LineString') {
          measureddistance = turf.pointToLineDistance(left, right);
        }
        if (right.type === 'Point' && left.type === 'LineString') {
          measureddistance = turf.pointToLineDistance(right, left);
        }
        if (left.type === 'Point' && right.type === 'Polygon') {
          measureddistance = turf.pointToPolygonDistance(left, right);
        }
        if (right.type === 'Point' && left.type === 'Polygon') {
          measureddistance = turf.pointToPolygonDistance(right, left);
        }
        return bool(measureddistance !== -1 && measureddistance <= distance);
      }).collect(),
    });
  }
}
