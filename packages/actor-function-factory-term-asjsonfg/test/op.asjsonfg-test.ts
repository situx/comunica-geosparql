import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermAsJSONFG } from '../lib';

describe('like \'asGeoJSON\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermAsJSONFG(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'asJSONFG',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "{\\"type\\":\\"Polygon\\",\\"coordinates\\":[[[-83.6,34.1],[-83.2,34.1],[-83.2,34.5],[-83.6,34.5],[-83.6,34.1]]],\\"coordRefSys\\":\\"http://www.opengis.net/def/crs/OGC/1.3/CRS84\\",\\"conformsTo\\":[\\"http://www.opengis.net/spec/json-fg-1/1.0/conf/core\\",\\"http://www.opengis.net/spec/json-fg-1/1.0/conf/types-schemas\\"]}"^^<http://www.opengis.net/ont/geosparql#jsonfgLiteral>
      `,
  });
});
