import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isConcave
 */
export class TermFunctionIsConcave extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISCONCAVE,
      overloads: declare(GeoSparqlExtOperator.ISCONCAVE).onGeometry1(
        () => (thegeom) => {
          if (thegeom.type === 'Polygon') {
            return bool(turf.booleanConcave(thegeom));
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
