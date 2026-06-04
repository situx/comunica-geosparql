import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/intersection
 */
export class TermFunctionIntersection extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.INTERSECTION,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.INTERSECTION).geometryFuncNormalizedCRS(() => (left, right) => {
        // @ts-ignore
        return serializeGeometry(turf.intersect(turf.featureCollection([ turf.feature(<GJ.Polygon>left), turf.feature(<GJ.Polygon>right) ])).geometry, 'http://www.opengis.net/ont/geosparql#wktLiteral');
      }).collect(),
    });
  }
}
