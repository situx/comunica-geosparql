import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator, StringLiteral,
} from '@comunica/utils-expression-evaluator';

import {serializeGeometry} from "@comunica/utils-expression-evaluator/lib/util/Serialization";
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/union
 */
export class TermFunctionUnion extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.GEO_UNION,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.GEO_UNION).geometryFuncNormalizedCRS(() => (left, right) => {
        return new StringLiteral('false');
        //return serializeGeometry(turf.union(turf.featureCollection([<GJ.Polygon>left,<GJ.Polygon>right])),lefttype)
      }).collect(),
    });
  }
}
