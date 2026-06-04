import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermOffsetCurve } from '../lib';

describe('like \'offsetCurve\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermOffsetCurve(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'offsetCurve',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> LineString(-83.4 34.0, -83.3 34.3)"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "LINESTRING (-83.31468297913379 33.97156099304459,-83.21468297913378 34.27156099304459)"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
