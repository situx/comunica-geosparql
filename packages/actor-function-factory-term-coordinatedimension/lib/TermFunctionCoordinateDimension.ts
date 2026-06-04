import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  integer,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/coordinateDimension
 */
export class TermFunctionCoordinateDimension extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.COORDINATEDIMENSION,
      overloads: declare(GeoSparqlOperator.COORDINATEDIMENSION).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        let coordinator = 0;
        turf.coordEach(thegeom, (currentCoord) => {
          if (currentCoord.length > coordinator) {
            coordinator = currentCoord.length;
          }
        });
        return integer(coordinator);
      }).collect(),
    });
  }
}
