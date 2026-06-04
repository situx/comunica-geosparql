import { TermFunctionBase } from '@comunica/bus-function-factory';
import {  declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { rangeOverlap } from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionAbove extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.ABOVE,
      overloads: declare(GeoSparqlExtOperator.ABOVE).geometryTestNormalizedCRS(() => (left, right) => {
        const leftbbox = turf.bbox(left);
        const rightbbox = turf.bbox(right);
        // eslint-disable-next-line max-len
        const xoverlap = rangeOverlap(<number>leftbbox.at(0), <number>leftbbox.at(2), <number>rightbbox.at(0), <number>rightbbox.at(2));
        const leftmaxY = <number>leftbbox.at(3);
        const rightminY = <number>rightbbox.at(1);
        return xoverlap > 0 && leftmaxY > rightminY;
      }).collect(),
    });
  }
}
