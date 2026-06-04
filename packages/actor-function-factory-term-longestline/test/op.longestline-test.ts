import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermLongestLine } from '../lib';

describe('like \'longestLine\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermLongestLine(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 2,
    aliases: bool,
    notation: Notation.Function,
    operation: 'longestLine',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.3 34.0, -83.1 34.0, -83.1 34.2, -83.3 34.2, -83.3 34.0))"^^<http://www.opengis.net/ont/geosparql#wktLiteral>  = "LINESTRING (-83.6 34.5,-83.1 34)"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
