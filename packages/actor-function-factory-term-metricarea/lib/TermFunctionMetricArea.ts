import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, double, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/metricarea
 */
export class TermFunctionMetricArea extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.METRICAREA,
      overloads: declare(GeoSparqlOperator.METRICAREA).onGeometry1(() => term => double(turf.area(term))).collect(),
    });
  }
}
