import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermClosestPoint } from '../lib';

describe('like \'closestPoint\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermClosestPoint(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 2,
    aliases: bool,
    notation: Notation.Function,
    operation: 'closestPoint',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Point(-83.4 34.3)"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.3 34.0, -83.1 34.0, -83.1 34.2, -83.3 34.2, -83.3 34.0))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "POINT (-83.3 34.2)"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
