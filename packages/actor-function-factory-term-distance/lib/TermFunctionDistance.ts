import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
  StringLiteral,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.DISTANCE,
      overloads: declare(GeoSparqlOperator.DISTANCE).geometryFuncNormalizedCRS(() => (left, right) => {
        if (left.type === 'Point' && right.type === 'Point') {
          return double(turf.distance(left, right));
        }
        if (left.type === 'Point' && right.type === 'LineString') {
          return new StringLiteral(turf.pointToLineDistance(left, right).toString(), 'http://www.w3.org/2001/XMLSchema#double');
        }
        if (right.type === 'Point' && left.type === 'LineString') {
          return new StringLiteral(turf.pointToLineDistance(right, left).toString(), 'http://www.w3.org/2001/XMLSchema#double');
        }
        if (left.type === 'Point' && right.type === 'Polygon') {
          return new StringLiteral(turf.pointToPolygonDistance(left, right).toString(), 'http://www.w3.org/2001/XMLSchema#double');
        }
        if (right.type === 'Point' && left.type === 'Polygon') {
          return new StringLiteral(turf.pointToPolygonDistance(right, left).toString(), 'http://www.w3.org/2001/XMLSchema#double');
        }
        return new StringLiteral('1', 'http://www.w3.org/2001/XMLSchema#double');
      }).collect(),
    });
  }
}
