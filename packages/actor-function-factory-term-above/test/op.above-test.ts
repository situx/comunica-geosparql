import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermAbove } from '../lib';

describe('like \'asWKT\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermAbove(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 2,
    aliases: bool,
    notation: Notation.Function,
    operation: 'asWKT',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "Polygon((-83.3 33.0, -83.1 33.0, -83.1 33.2, -83.3 33.2, -83.3 33.0))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = false
        "Polygon((-83.3 33.0, -83.1 33.0, -83.1 33.2, -83.3 33.2, -83.3 33.0))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral>  = true      
        `,
  });
});
