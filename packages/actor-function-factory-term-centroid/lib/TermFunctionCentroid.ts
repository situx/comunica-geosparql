import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import {is3D} from "@comunica/utils-expression-evaluator/lib/functions/Helpers";

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionCentroid extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.CENTROID,
      overloads: declare(GeoSparqlOperator.CENTROID).onGeometryTup1(() => thegeomtup => {
        if (is3D(thegeomtup[0])) {
          let xSum = 0;
          let ySum = 0;
          let zSum = 0;
          let len = 0;
          turf.coordEach(thegeomtup[0], (coord) => {
            xSum += coord[0];
            ySum += coord[1];
            zSum += coord[2];
            len++;
          }, true);
          return serializeGeometry(turf.geometry('Point', [ xSum / len, ySum / len, zSum / len ]), thegeomtup[2]);
        }
        return serializeGeometry(turf.centroid(thegeomtup[0]).geometry, thegeomtup[2]);
      }).collect(),
    });
  }
}
