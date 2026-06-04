import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator, string } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/geometryType
 */
export class TermFunctionGeometryN extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.GEOMETRYN,

      overloads: declare(GeoSparqlOperator.GEOMETRYN).onGeometryTup1Literal1(() => (thegeom, index) => {
        // eslint-disable-next-line max-len
        const theindex = Number.parseInt(index.str(), 10);
        // eslint-disable-next-line max-len
        if (thegeom[0].type === 'LineString' || thegeom[0].type === 'MultiLineString' || thegeom[0].type === 'Polygon' || thegeom[0].type === 'MultiPolygon' || thegeom[0].type === 'GeometryCollection') {
          turf.lineEach(thegeom[0], (currentLine, geometryIndex) => {
            if (geometryIndex === theindex) {
              return serializeGeometry(currentLine.geometry, thegeom[2]);
            }
          });
        }
        return string('Wrong geometry type or wrong index position given to function geof:geometryN');
      }).collect(),
    });
  }
}
