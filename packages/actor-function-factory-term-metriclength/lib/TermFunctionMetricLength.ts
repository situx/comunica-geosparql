import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { length3D } from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/metriclength
 */
export class TermFunctionMetricLength extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.METRICLENGTH,
      overloads: declare(GeoSparqlOperator.METRICLENGTH).onFeature1(() => (thefeat) => {
        if (turf.findPoint(thefeat, { coordIndex: 0 }).geometry.coordinates.length === 3) {
          return double(length3D(turf.coordAll(thefeat)));
        }
        return double(turf.length(thefeat));
      }).collect(),
    });
  }
}
