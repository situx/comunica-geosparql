import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

/**
 * http://www.opengis.net/def/function/geosparql/geometryType
 */
export class TermFunctionGetSRID extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.GETSRID,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.GETSRID).onGeometryTup1(() => term => new StringLiteral(term[1], 'http://www.w3.org/2001/XMLSchema#anyURI')).collect(),
    });
  }
}
