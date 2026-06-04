import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  integer,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/numGeometries
 */
export class TermFunctionNumGeometries extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.NUMGEOMETRIES,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.NUMGEOMETRIES).onGeometry1(() => thegeom => integer(turf.explode(thegeom).features.length)).collect(),
    });
  }
}
