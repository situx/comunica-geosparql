import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, double, GeoSparqlExtOperator, parseGeometryFeature} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/compactnessRatio
 */
export class TermFunctionCompactnessRatio extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.COMPACTNESSRATIO,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.COMPACTNESSRATIO).onLiteral1(() => (term) => {
        const thegeom: GJ.Geometry = parseGeometry(term)[0];
        const thegeomfeat = parseGeometryFeature(term)[0];
        const length = turf.length(thegeomfeat);
        const area = turf.area(thegeom);
        return double(1 / (length / (2 * Math.PI * Math.sqrt(area / Math.PI))));
      }).collect(),
    });
  }
}
