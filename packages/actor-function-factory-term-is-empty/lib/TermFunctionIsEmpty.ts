import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/is3D
 */
export class TermFunctionIsEmpty extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ISEMPTY,
        // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.ISEMPTY).onLiteral1(() => (term) => {
        return bool(false);
        /*return bool(turf.getCoords(parseGeometry(term)[0]).length===0);
        thegeom..forEach({

        });coordinates.length === 0)*/
        }).collect(),
    });
  }
}
