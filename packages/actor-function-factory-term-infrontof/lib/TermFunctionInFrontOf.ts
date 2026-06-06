import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, ExpressionError, GeoSparqlExtOperator} from '@comunica/utils-expression-evaluator';

import {bbox3D, is3D, rangeOverlaps} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';

/**
 * http://www.opengis.net/def/function/geosparql/infrontof
 */
export class TermFunctionInFrontOf extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.INFRONTOF,
      overloads: declare(GeoSparqlExtOperator.INFRONTOF).geometryTestNormalizedCRS(() => (left, right) => {
        let leftbbox;
        let rightbbox;
        if (is3D(left) && is3D(right)) {
          leftbbox = bbox3D(left);
          rightbbox = bbox3D(right);
          // eslint-disable-next-line max-len
          const yoverlap = rangeOverlaps(<number>leftbbox.at(1), <number>leftbbox.at(4), <number>rightbbox.at(1), <number>rightbbox.at(4));
          // eslint-disable-next-line max-len
          const xoverlap = rangeOverlaps(<number>leftbbox.at(0), <number>leftbbox.at(3), <number>rightbbox.at(0), <number>rightbbox.at(3));
          const leftminZ = <number>leftbbox.at(2);
          const rightmaxZ = <number>rightbbox.at(5);
          return xoverlap && yoverlap && leftminZ > rightmaxZ;
        }
        throw new ExpressionError('Input parameters must be 3D geometries');
      }).collect(),
    });
  }
}
