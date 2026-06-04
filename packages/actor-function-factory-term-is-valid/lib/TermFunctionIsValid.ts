import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isValid
 */
export class TermFunctionIsValid extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISVALID,
      overloads: declare(GeoSparqlExtOperator.ISVALID).onGeometry1(
        () => (thegeom) => bool(turf.booleanValid(thegeom)),
      ).collect(),
    });
  }
}
