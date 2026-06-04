import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, double, GeoSparqlOperator, unitURIToTurfString} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';
import type {AreaUnits} from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionArea extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.AREA,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.AREA).onGeometry1Literal1(() => (term, unit) => double(turf.convertArea(turf.area(term), 'metres', <AreaUnits>unitURIToTurfString(unit.str())))).collect(),
    });
  }
}
