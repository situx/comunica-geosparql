import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermTransformCRS84 } from '../lib';

describe('like \'transformCRS84\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermTransformCRS84(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'transformCRS84',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Point(-88.38 31.95)"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Point(-88.38 31.95)"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
