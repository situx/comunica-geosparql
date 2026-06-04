import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import type { Point } from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/sfCrosse
 */
export class TermFunctionSelfIntersections extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.SELFINTERSECTIONS,

      overloads: declare(GeoSparqlExtOperator.SELFINTERSECTIONS).onGeometryTup1(() => (thegeom) => {
        // eslint-disable-next-line max-len
        if (thegeom[0].type === 'LineString' || thegeom[0].type === 'MultiLineString' || thegeom[0].type === 'Polygon' || thegeom[0].type === 'MultiPolygon') {
          const geocoll: Point[] = [];
          for (const feat of turf.kinks(thegeom[0]).features) {
            geocoll.push(feat.geometry);
          }
          return serializeGeometry(turf.geometryCollection(geocoll).geometry, thegeom[2]);
        }
        return serializeGeometry(turf.geometryCollection([]).geometry, thegeom[2]);
      }).collect(),
    });
  }
}
