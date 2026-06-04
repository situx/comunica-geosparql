import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/isCW
 */
export class TermFunctionIsCW extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISCW,
      overloads: declare(GeoSparqlExtOperator.ISCW).onGeometry1(
        () => term => bool(turf.booleanClockwise(<GJ.LineString>term)),
      ).collect(),
    });
  }
}
