import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  GeoSparqlExtOperator,
  declare,
} from '@comunica/utils-expression-evaluator';
import {serializeGeometry} from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from "@turf/turf";
import type * as GJ from 'geojson';

/**
 * https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal
 */
export class TermFunctionSmooth extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.SMOOTH,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.SMOOTH).onGeometryTup1(() => term => serializeGeometry(turf.polygonSmooth(<GJ.Polygon>term[0]).features.at(0)?.geometry, term[2])).collect(),
    });
  }
}
