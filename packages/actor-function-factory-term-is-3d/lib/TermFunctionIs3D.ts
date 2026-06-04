import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { is3D } from '@comunica/utils-expression-evaluator/lib/functions/Helpers';

/**
 * http://www.opengis.net/def/function/geosparql/is3D
 */
export class TermFunctionIs3D extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.IS3D,
      overloads: declare(GeoSparqlOperator.IS3D).onGeometry1(
        () => thegeom => bool(is3D(thegeom)),
      ).collect(),
    });
  }
}
