import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator, string } from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/geometryType
 */
export class TermFunctionGeometryType extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.GEOMETRYTYPE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.GEOMETRYTYPE).onGeometry1(() => term => string(turf.getType(term))).collect(),
    });
  }
}
