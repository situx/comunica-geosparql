import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, double, GeoSparqlOperator, string, StringLiteral} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';
import {serializeGeometry} from "@comunica/utils-expression-evaluator/lib/util/Serialization";


/**
 * http://www.opengis.net/def/function/geosparql/metricbuffer
 */
export class TermFunctionMetricBuffer extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.METRICBUFFER,
      overloads: declare(GeoSparqlOperator.METRICBUFFER).onGeometryTup1Literal1(() => (thegeomtup,radius) => {
        if (thegeomtup[0].type === 'Point') {
          // @ts-ignore
          return serializeGeometry(turf.buffer(thegeomtup[0], Number.parseFloat(radius.str())).geometry, thegeomtup[2]);
        }
        if (thegeomtup[0].type === 'Polygon') {
          // @ts-ignore
          return serializeGeometry(turf.buffer(thegeomtup[0], Number.parseFloat(radius.str())).geometry, thegeomtup[2]);
        }
        if (thegeomtup[0].type === 'LineString') {
          // @ts-ignore
          return serializeGeometry(turf.buffer(thegeomtup[0], Number.parseFloat(radius.str())).geometry, thegeomtup[2]);
        }
        return string('');
      }).collect(),
    });
  }
}
