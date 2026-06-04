import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermRemoveRepeatedPoints } from '../lib';

describe('like \'RemoveRepeatedPoints\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermRemoveRepeatedPoints(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'removeRepeatedPoints',
    testTable: `
        "POLYGON ((-83.6 34.1, -83.6 34.5, -83.6 34.5, -83.2 34.5, -83.2 34.1, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "POLYGON ((-83.6 34.1,-83.6 34.5,-83.2 34.5,-83.2 34.1,-83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
