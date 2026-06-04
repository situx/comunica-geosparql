import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermIsEmpty } from '../lib';

describe('like \'isEmpty\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermIsEmpty(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'isEmpty',
    testTable: `
        "LINESTRING EMPTY"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = true
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-77.089005 38.913574,-77.029953 38.913574,-77.029953 38.886321,-77.089005 38.886321,-77.089005 38.913574))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = false
      `,
  });
});
