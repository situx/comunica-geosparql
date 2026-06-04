import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermAsGeoJSON } from '../lib';

describe('like \'asGeoJSON\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermAsGeoJSON(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'asGeoJSON',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "{\\"type\\":\\"Polygon\\",\\"coordinates\\":[[[-83.6,34.1],[-83.2,34.1],[-83.2,34.5],[-83.6,34.5],[-83.6,34.1]]]}"^^<http://www.opengis.net/ont/geosparql#geoJSONLiteral> 
      `,
  });
});
