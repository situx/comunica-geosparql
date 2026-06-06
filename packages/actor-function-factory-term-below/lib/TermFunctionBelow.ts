import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import {bbox3D, is3D, rangeOverlaps} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionBelow extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.BELOW,
      overloads: declare(GeoSparqlExtOperator.BELOW).geometryTestNormalizedCRS(() => (left, right) => {
        let leftbbox;
        let rightbbox;
        let zoverlap = true;
        let xoverlap = false;
        if (is3D(left) && is3D(right)) {
          leftbbox = bbox3D(left);
          rightbbox = bbox3D(right);
          // eslint-disable-next-line max-len
          zoverlap = rangeOverlaps(<number>leftbbox.at(2), <number>leftbbox.at(5), <number>rightbbox.at(2), <number>rightbbox.at(5));
          // eslint-disable-next-line max-len
          xoverlap = rangeOverlaps(leftbbox[0], leftbbox[3], rightbbox[0], rightbbox[3]);
        } else {
          leftbbox = turf.bbox(left);
          rightbbox = turf.bbox(right);
          // eslint-disable-next-line max-len
          xoverlap = rangeOverlaps(<number>leftbbox.at(0), <number>leftbbox.at(2), <number>rightbbox.at(0), <number>rightbbox.at(2));
        }
        // eslint-disable-next-line max-len
        const leftmaxY = <number>leftbbox.at(3);
        const rightminY = <number>rightbbox.at(1);
        return xoverlap && zoverlap && leftmaxY < rightminY;
      }).collect(),
    });
  }
}
