import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/isTriangle
 */
export class TermFunctionIsTriangle extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISTRIANGLE,
      overloads: declare(GeoSparqlExtOperator.ISTRIANGLE).onGeometry1(
        () => (thegeom) => {
          const thetype = turf.getType(thegeom);
          if (thetype === 'Polygon') {
            const thecoords = turf.getCoords(<GJ.Polygon>thegeom);
            return bool(thecoords.length === 4 && thecoords.at(0) === thecoords.at(-1));
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
