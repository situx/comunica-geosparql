import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermShortestLine } from '../lib';

describe('like \'shortestLine\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermShortestLine(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 2,
    aliases: bool,
    notation: Notation.Function,
    operation: 'shortestLine',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon ((2.47217 47.52403, 2.40693 47.49713, 2.44607 47.43679, 2.57104 47.48553, 2.39251 47.44793, 2.47217 47.52403))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "LINESTRING (-83.2 34.5,2.40693 47.49713)"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
