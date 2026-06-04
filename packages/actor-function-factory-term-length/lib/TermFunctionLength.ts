import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
  unitURIToTurfString,
} from '@comunica/utils-expression-evaluator';
import {is3D, length3D} from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';
import type { Units } from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionLength extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.LENGTH,
      overloads: declare(GeoSparqlOperator.LENGTH).onFeature1Literal1(() => (thefeat, unit) => {
        if (is3D(thefeat.geometry)) {
          // eslint-disable-next-line max-len
          return double(turf.convertLength(length3D(turf.coordAll(thefeat)), 'metres', <Units>unitURIToTurfString(unit.str())));
        }
        return double(turf.convertLength(turf.length(thefeat), 'metres', <Units>unitURIToTurfString(unit.str())));
      }).collect(),
    });
  }
}
