import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, ExpressionError, GeoSparqlExtOperator} from '@comunica/utils-expression-evaluator';

import {bbox3D, is3D, rangeOverlaps} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';

/**
 * http://www.opengis.net/def/function/geosparql/behind
 */
export class TermFunctionBehind extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.BEHIND,
      overloads: declare(GeoSparqlExtOperator.BEHIND).geometryTestNormalizedCRS(() => (left, right) => {
        let leftbbox;
        let rightbbox;
        if (is3D(left) && is3D(right)) {
          leftbbox = bbox3D(left);
          rightbbox = bbox3D(right);
          // eslint-disable-next-line max-len
          const yoverlap = rangeOverlaps(<number>leftbbox.at(1), <number>leftbbox.at(4), <number>rightbbox.at(1), <number>rightbbox.at(4));
          // eslint-disable-next-line max-len
          const xoverlap = rangeOverlaps(<number>leftbbox.at(0), <number>leftbbox.at(3), <number>rightbbox.at(0), <number>rightbbox.at(3));
          const leftmaxZ = <number>leftbbox.at(5);
          const rightminZ = <number>rightbbox.at(2);
          return xoverlap && yoverlap && leftmaxZ < rightminZ;
        }
        throw new ExpressionError('Input parameters must be 3D geometries');
      }).collect(),
    });
  }
}
