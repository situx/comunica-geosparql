import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
  InvalidArgumentTypes,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionMaxX extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MAXX,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.MAXX).onGeometry1((() => thegeom => double(this.calculate(thegeom)))).collect(),
    });
  }

  private calculate(thegeom: GJ.Geometry): number {
    let maxX = Number.MIN_VALUE;
    turf.coordEach(thegeom, (
      currentCoord,
      _cordIndex,
      _featureIndex,
      _multiFeatureIndex,
      _geometryIndex,
    ) => {
      if (currentCoord[0] > maxX) {
        maxX = currentCoord[0];
      }
    });
    return maxX;
  }
}
