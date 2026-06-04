import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  integer,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minX
 */
export class TermFunctionNumPoints extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.NUMPOINTS,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.NUMPOINTS).onGeometry1(() => thegeom => integer(turf.explode(thegeom).features.length)).collect(),
    });
  }
}
