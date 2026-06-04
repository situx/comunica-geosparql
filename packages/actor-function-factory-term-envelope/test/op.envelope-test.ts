import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermEnvelope } from '../lib';

describe('like \'envelope\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermEnvelope(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'envelope',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> LineString(-83.4 34.0, -83.3 34.3)"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "POLYGON ((-83.4 34,-83.3 34,-83.3 34.3,-83.4 34.3,-83.4 34))"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
