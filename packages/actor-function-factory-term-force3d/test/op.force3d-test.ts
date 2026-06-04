import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermForce3D } from '../lib';

describe('like \'force3D\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermForce3D(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'force3D',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "POLYGON Z ((-83.6 34.1 5,-83.2 34.1 5,-83.2 34.5 5,-83.6 34.5 5,-83.6 34.1 5))"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
