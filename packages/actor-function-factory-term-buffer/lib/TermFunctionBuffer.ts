import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlOperator, string, StringLiteral} from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/buffer
 */
export class TermFunctionBuffer extends TermFunctionBase {
  public constructor() {
    super({
      arity: 3,
      operator: GeoSparqlOperator.BUFFER,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.BUFFER).onGeometryTup1Literal1(() => (thegeomtup, radius) => {
        if (thegeomtup[0].type === 'Point') {
          // @ts-ignore
          return serializeGeometry(turf.buffer(thegeomtup[0], Number.parseFloat(radius.str())).geometry, thegeomtup[2]);
        }
        if (thegeomtup[0].type === 'Polygon') {
          // @ts-ignore
          return serializeGeometry(turf.buffer(thegeomtup[0], Number.parseFloat(radius.str())).geometry, thegeomtup[2]);
        }
        if (thegeomtup[0].type === 'LineString') {
          // @ts-ignore
          return serializeGeometry(turf.buffer(thegeomtup[0], Number.parseFloat(radius.str())).geometry, thegeomtup[2]);
        }
        return string('');
      }).collect(),
    });
  }
}
