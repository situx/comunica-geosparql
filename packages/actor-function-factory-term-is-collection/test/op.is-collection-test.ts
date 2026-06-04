import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermIsCollection } from '../lib';

describe('like \'isCollection\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermIsCollection(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'isCollection',
    testTable: `
        "GEOMETRYCOLLECTION (MULTIPOINT((0 0), (1 1)), POINT(3 4), LINESTRING(2 3, 3 4))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = true
        "MULTIPOLYGON (((1 1, 1 3, 3 3, 3 1, 1 1)), ((4 3, 6 3, 6 1, 4 1, 4 3)))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = false
        "POLYGON ((0 0, 4 0, 4 4, 0 4, 0 0), (1 1, 1 2, 2 2, 2 1, 1 1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = false
      `,
  });
});
