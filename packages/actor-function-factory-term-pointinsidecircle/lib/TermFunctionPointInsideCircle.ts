import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlExtOperator,
  parseGeometry,
} from '@comunica/utils-expression-evaluator';

/**
 * http://www.opengis.net/def/function/geosparql/pointInsideCircle
 */
export class TermFunctionPointInsideCircle extends TermFunctionBase {
  public constructor() {
    super({
      arity: 3,
      operator: GeoSparqlExtOperator.POINTINSIDECIRCLE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.POINTINSIDECIRCLE).onGeometryTup1Literal2(() => (geomtup, centerpoint, radius) => {
        // eslint-disable-next-line max-len
        const cpoint = parseGeometry(centerpoint)[0];
        const rad = Number.parseFloat(radius.str());
        if (geomtup[0].type === 'Point' && cpoint.type === 'Point') {
          if (cpoint.coordinates.length === 3 && geomtup[0].coordinates.length === 3) {
            // eslint-disable-next-line max-len
            return bool((geomtup[0].coordinates[0] - cpoint.coordinates[0]) ** 2 + (geomtup[0].coordinates[1] - cpoint.coordinates[1]) ** 2 + (geomtup[0].coordinates[2] - cpoint.coordinates[2]) ** 2 <= rad ** 2);
          }
          // eslint-disable-next-line max-len
          return bool((geomtup[0].coordinates[0] - cpoint.coordinates[0]) ** 2 + (geomtup[0].coordinates[1] - cpoint.coordinates[1]) ** 2 <= rad ** 2);
        }
        return bool(false);
      }).collect(),
    });
  }
}
