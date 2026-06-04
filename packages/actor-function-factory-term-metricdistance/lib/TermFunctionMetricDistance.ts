import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, double, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/metricarea
 */
export class TermFunctionMetricDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.METRICDISTANCE,
      overloads: declare(GeoSparqlOperator.METRICDISTANCE).geometryFuncNormalizedCRS(() => (left, right) => {
        if (left.type === 'Point' && right.type === 'Point') {
          return double(turf.distance(left, right));
        }
        if (left.type === 'Point' && right.type === 'LineString') {
          return double(turf.pointToLineDistance(left, right));
        }
        if (right.type === 'Point' && left.type === 'LineString') {
          return double(turf.pointToLineDistance(right, left));
        }
        if (left.type === 'Point' && right.type === 'Polygon') {
          return double(turf.pointToPolygonDistance(left, right));
        }
        if (right.type === 'Point' && left.type === 'Polygon') {
          return double(turf.pointToPolygonDistance(right, left));
        }
        return double(1);
      }).collect(),
    });
  }
}
