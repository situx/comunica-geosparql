import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermRCC8NTPPI } from '../lib';

describe('like \'rcc8ntppi\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermRCC8NTPPI(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 2,
    aliases: bool,
    notation: Notation.Function,
    operation: 'rcc8ntppi',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.5 34.2, -83.3 34.2, -83.3 34.4, -83.5 34.4, -83.5 34.2))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = true
      `,
  });
});
