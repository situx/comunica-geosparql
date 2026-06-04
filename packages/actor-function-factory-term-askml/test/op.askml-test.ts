import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermAsKML } from '../lib';

describe('like \'asKML\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermAsKML(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'asKML',
    testTable: `
        "<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Polygon((-83.6 34.1, -83.2 34.1, -83.2 34.5, -83.6 34.5, -83.6 34.1))"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>\\n<Placemark>\\n<ExtendedData></ExtendedData>\\n  <Polygon>\\n<outerBoundaryIs>\\n  <LinearRing><coordinates>-83.6,34.1\\n-83.2,34.1\\n-83.2,34.5\\n-83.6,34.5\\n-83.6,34.1</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark></Document></kml>"^^<http://www.opengis.net/ont/geosparql#kmlLiteral>
      `,
  });
});
