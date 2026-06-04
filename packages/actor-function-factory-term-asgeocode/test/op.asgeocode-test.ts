import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermAsGeoCode } from '../lib';

describe('like \'asGeoJSON\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermAsGeoCode(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 2,
    aliases: bool,
    notation: Notation.Function,
    operation: 'asGeoCode',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "http://opengis.net/ont/geocode/OpenLocationCode" = "<http://opengis.net/ont/geocode/OpenLocationCode> 2G8PJ822+22"^^<http://www.opengis.net/ont/geosparql#geoCodeLiteral>
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "http://opengis.net/ont/geocode/GeoHash" = "<http://opengis.net/ont/geocode/GeoHash> hc0ms92rz"^^<http://www.opengis.net/ont/geosparql#geoCodeLiteral>
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> "http://opengis.net/ont/geocode/GeoURI" = "<http://opengis.net/ont/geocode/GeoURI> geo:-83.4,34.3"^^<http://www.opengis.net/ont/geosparql#geoCodeLiteral>
        `,
  });
});
