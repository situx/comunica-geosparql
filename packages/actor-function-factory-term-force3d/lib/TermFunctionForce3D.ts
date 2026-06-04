import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/force3d
 */
export class TermFunctionForce3D extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.FORCE3D,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.FORCE3D).onGeometryTup1Literal1(() => (thegeom, zvalue) => {
        const zval = Number.parseFloat(zvalue.str());
        turf.coordEach(thegeom[0], (currentCoord) => {
          currentCoord.push(zval);
        });
        return serializeGeometry(thegeom[0], thegeom[2]);
      }).collect(),
    });
  }
}
