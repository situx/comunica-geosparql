import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermForce2D } from '../lib';

describe('like \'force2D\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermForce2D(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'force2D',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon Z((-77.089005 38.913574 1,-77.029953 38.913574 2,-77.029953 38.886321 2,-77.089005 38.886321 1,-77.089005 38.913574 1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "POLYGON ((-77.089005 38.913574,-77.029953 38.913574,-77.029953 38.886321,-77.089005 38.886321,-77.089005 38.913574))"^^<http://www.opengis.net/ont/geosparql#wktLiteral>
      `,
  });
});
