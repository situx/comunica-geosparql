import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minX
 */
export class TermFunctionConvexHull extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.CONVEXHULL,
      overloads: declare(GeoSparqlOperator.CONVEXHULL).onLiteral1(() => (term) => {
        const chull = turf.convex(parseGeometry(term)[0])?.geometry;
        if (chull !== undefined) {
          return serializeGeometry(chull, term.dataType);
        }
        return serializeGeometry(turf.point([]).geometry, term.dataType);
      }).collect(),
    });
  }
}
