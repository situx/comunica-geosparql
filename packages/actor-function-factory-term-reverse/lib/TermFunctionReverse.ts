import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/reverse
 */
export class TermFunctionReverse extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.REVERSE,
      overloads: declare(GeoSparqlExtOperator.REVERSE).onGeometryTup1(() => (term) => {
        const thegeom = term[0];
        const datatype = term[2];
        if (thegeom.type === 'Point') {
          return serializeGeometry(thegeom, datatype);
        }
        return serializeGeometry(<GJ.Geometry>turf.rewind(thegeom), datatype);
      }).collect(),
    });
  }
}
