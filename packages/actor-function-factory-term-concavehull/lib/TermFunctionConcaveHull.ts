import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import type { Feature, Point, GeoJsonProperties } from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/minX
 */
export class TermFunctionConcaveHull extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.CONCAVEHULL,
      overloads: declare(GeoSparqlOperator.CONCAVEHULL).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        /*
        const pointcoll: Feature<Point, GeoJsonProperties>[] | number[][] = [];
        turf.coordEach(thegeom, (currentCoord) => {
          pointcoll.push(turf.point([currentCoord[0].toFixed(), currentCoord[1].toFixed()]));
        });
        turf.near
        turf.concave(turf.points(pointcoll));
        const chull = turf.concave()?.geometry;
        if (chull !== undefined) {
          return serializeGeometry(chull, term.dataType);
        }*/
        return serializeGeometry(turf.point([]).geometry, term.dataType);
      }).collect(),
    });
  }
}
