import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionCentroid extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.CENTROID,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.CENTROID).onGeometryTup1(() => term => serializeGeometry(turf.centroid(term[0]).geometry, term[2])).collect(),
    });
  }
}
