import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isCollection
 */
export class TermFunctionIsCollection extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISCOLLECTION,
      overloads: declare(GeoSparqlExtOperator.ISCOLLECTION).onGeometry1(
        () => (thegeom) => {
          if (turf.getType(thegeom) === 'GeometryCollection') {
            return bool(true);
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
