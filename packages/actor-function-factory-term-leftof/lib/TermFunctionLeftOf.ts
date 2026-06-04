import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import {bbox3D, is3D, rangeOverlaps} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/leftOf
 */
export class TermFunctionLeftOf extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.LEFTOF,
      overloads: declare(GeoSparqlExtOperator.LEFTOF).geometryTestNormalizedCRS(() => (left, right) => {
        let leftbbox;
        let rightbbox;
        let zoverlap = true;
        if (is3D(left) && is3D(right)) {
          leftbbox = bbox3D(left);
          rightbbox = bbox3D(right);
          // eslint-disable-next-line max-len
          zoverlap = rangeOverlaps(<number>leftbbox.at(2), <number>leftbbox.at(5), <number>rightbbox.at(2), <number>rightbbox.at(5));
        } else {
          leftbbox = turf.bbox(left);
          rightbbox = turf.bbox(right);
        }
        // eslint-disable-next-line max-len
        const yoverlap = rangeOverlaps(<number>leftbbox.at(1), <number>leftbbox.at(3), <number>rightbbox.at(1), <number>rightbbox.at(3));
        const leftmaxX = <number>leftbbox.at(2);
        const rightminX = <number>rightbbox.at(0);
        return yoverlap && zoverlap && leftmaxX < rightminX;
      }).collect(),
    });
  }
}
