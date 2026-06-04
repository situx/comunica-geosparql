import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlExtOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

import {serializeGeometry} from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/compactnessRatio
 */
export class TermFunctionClipByRect extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.CLIPBYRECT,
      overloads: declare(GeoSparqlExtOperator.CLIPBYRECT).geometryFuncNormalizedCRS(() => (left, right) => {
        // eslint-disable-next-line max-len
        if (left.type === 'LineString' || left.type === 'MultiLineString' || left.type === 'Polygon' || left.type === 'MultiPolygon') {
          return serializeGeometry(turf.bboxClip(left, turf.bbox(right)).geometry, 'http://www.opengis.net/ont/geosparql#wktLiteral');
        }
        return new StringLiteral('Invalid input geometry type');
      }).collect(),
    });
  }
}
