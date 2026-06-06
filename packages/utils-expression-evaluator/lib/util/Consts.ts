import type * as RDF from '@rdfjs/types';
import { DataFactory } from 'rdf-data-factory';

export type KnownLiteralTypes = TypeAlias | TypeURL;

export enum TypeAlias {
  // Numeric is everything defined in https://www.w3.org/TR/sparql11-query/#operandDataTypes
  SPARQL_NUMERIC = 'SPARQL_NUMERIC',
  /**
   * Stringly is everything defined in https://www.w3.org/TR/sparql11-query/#func-strings
   * In other words it is a simple literal, a plain literal with language tag, or a literal with datatype xsd:string
   * In other words, since utils-expression-evaluator transforms a simple literal to xsd_string.
   * It is RDF_LANG_STRING or XSD_STRING.
   * Reasons for this are mentioned here: w3c/sparql-12#112
   */
  SPARQL_STRINGLY = 'SPARQL_STRINGLY',
}

const DF = new DataFactory();

export function typedLiteral(value: string, type: TypeURL): RDF.Literal {
  return DF.literal(value, DF.namedNode(type));
}

export enum TypeURL {
  XSD_ANY_URI = 'http://www.w3.org/2001/XMLSchema#anyURI',
  XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string',
  RDF_LANG_STRING = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString',
  RDF_DIR_LANG_STRING = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString',

  DGGS_LITERAL = 'http://www.opengis.net/ont/geosparql#dggsLiteral',
  GEOJSON_LITERAL = 'http://www.opengis.net/ont/geosparql#geoJSONLiteral',
  GML_LITERAL = 'http://www.opengis.net/ont/geosparql#gmlLiteral',
  KML_LITERAL = 'http://www.opengis.net/ont/geosparql#kmlLiteral',
  WKT_LITERAL = 'http://www.opengis.net/ont/geosparql#wktLiteral',

  XSD_BOOLEAN = 'http://www.w3.org/2001/XMLSchema#boolean',

  XSD_DATE_TIME = 'http://www.w3.org/2001/XMLSchema#dateTime',
  XSD_DATE_TIME_STAMP = 'http://www.w3.org/2001/XMLSchema#dateTimeStamp',
  XSD_DATE = 'http://www.w3.org/2001/XMLSchema#date',

  XSD_G_MONTH = 'http://www.w3.org/2001/XMLSchema#gMonth',
  XSD_G_MONTHDAY = 'http://www.w3.org/2001/XMLSchema#gMonthDay',
  XSD_G_YEAR = 'http://www.w3.org/2001/XMLSchema#gYear',
  XSD_G_YEAR_MONTH = 'http://www.w3.org/2001/XMLSchema#gYearMonth',
  XSD_TIME = 'http://www.w3.org/2001/XMLSchema#time',
  XSD_G_DAY = 'http://www.w3.org/2001/XMLSchema#gDay',

  // Numeric types
  XSD_DECIMAL = 'http://www.w3.org/2001/XMLSchema#decimal',
  XSD_FLOAT = 'http://www.w3.org/2001/XMLSchema#float',
  XSD_DOUBLE = 'http://www.w3.org/2001/XMLSchema#double',

  // Derived numeric types
  XSD_INTEGER = 'http://www.w3.org/2001/XMLSchema#integer',

  XSD_NON_POSITIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#nonPositiveInteger',
  XSD_NEGATIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#negativeInteger',

  XSD_LONG = 'http://www.w3.org/2001/XMLSchema#long',
  XSD_INT = 'http://www.w3.org/2001/XMLSchema#int',
  XSD_SHORT = 'http://www.w3.org/2001/XMLSchema#short',
  XSD_BYTE = 'http://www.w3.org/2001/XMLSchema#byte',

  XSD_NON_NEGATIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#nonNegativeInteger',
  XSD_POSITIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#positiveInteger',
  XSD_UNSIGNED_LONG = 'http://www.w3.org/2001/XMLSchema#unsignedLong',
  XSD_UNSIGNED_INT = 'http://www.w3.org/2001/XMLSchema#unsignedInt',
  XSD_UNSIGNED_SHORT = 'http://www.w3.org/2001/XMLSchema#unsignedShort',
  XSD_UNSIGNED_BYTE = 'http://www.w3.org/2001/XMLSchema#unsignedByte',

  // Derived String Type
  XSD_NORMALIZED_STRING = 'http://www.w3.org/2001/XMLSchema#normalizedString',
  XSD_TOKEN = 'http://www.w3.org/2001/XMLSchema#token',
  XSD_LANGUAGE = 'http://www.w3.org/2001/XMLSchema#language',
  XSD_NM_TOKEN = 'http://www.w3.org/2001/XMLSchema#NMTOKEN',

  XSD_NAME = 'http://www.w3.org/2001/XMLSchema#name',
  XSD_NC_NAME = 'http://www.w3.org/2001/XMLSchema#NCName',
  XSD_ENTITY = 'http://www.w3.org/2001/XMLSchema#ENTITY',
  XSD_ID = 'http://www.w3.org/2001/XMLSchema#ID',
  XSD_ID_REF = 'http://www.w3.org/2001/XMLSchema#IDREF',

  // Other types
  XSD_DURATION = 'http://www.w3.org/2001/XMLSchema#duration',
  XSD_YEAR_MONTH_DURATION = 'http://www.w3.org/2001/XMLSchema#yearMonthDuration',
  XSD_DAY_TIME_DURATION = 'http://www.w3.org/2001/XMLSchema#dayTimeDuration',
  XSD_UNTYPED_ATOMIC = 'http://www.w3.org/2001/XMLSchema#untypedAtomic',
}

// ----------------------------------------------------------------------------
// Operators
// ----------------------------------------------------------------------------

export type GeneralOperator = KnownOperator | string;

export type KnownOperator = SparqlOperator | NamedOperator;

export enum GeoSparqlExtOperator {
  ABOVE = 'http://www.opengis.net/def/function/geosparql/ext/above',
  ADDPOINT = 'http://www.opengis.net/def/function/geosparql/ext/addpoint',
  ASGEOCODE = 'http://www.opengis.net/def/function/geosparql/ext/asGeoCode',
  ASJSONFG = 'http://www.opengis.net/def/function/geosparql/ext/asJSONFG',
  ASOBJ = 'http://www.opengis.net/def/function/geosparql/ext/asOBJ',
  ASPLY = 'http://www.opengis.net/def/function/geosparql/ext/asPLY',
  ASGLTF = 'http://www.opengis.net/def/function/geosparql/ext/asGLTF',
  ASSTL = 'http://www.opengis.net/def/function/geosparql/ext/asSTL',
  ASSVG = 'http://www.opengis.net/def/function/geosparql/ext/asSVG',
  ASWKB = 'http://www.opengis.net/def/function/geosparql/ext/asWKB',
  ASXYZ = 'http://www.opengis.net/def/function/geosparql/ext/asXYZ',
  AZIMUTH = 'http://www.opengis.net/def/function/geosparql/ext/azimuth',
  BOUNDINGDIAGONAL = 'http://www.opengis.net/def/function/geosparql/ext/boundingDiagonal',
  BEHIND = 'http://www.opengis.net/def/function/geosparql/ext/behind',
  BELOW = 'http://www.opengis.net/def/function/geosparql/ext/below',
  CLIPBYRECT = 'http://www.opengis.net/def/function/geosparql/ext/clipByRect',
  CLOSESTPOINT = 'http://www.opengis.net/def/function/geosparql/ext/closestPoint',
  COMPACTNESSRATIO = 'http://www.opengis.net/def/function/geosparql/ext/compactnessRatio',
  FARTHESTCOORDINATE = 'http://www.opengis.net/def/function/geosparql/ext/farthestCoordinate',
  ENDPOINT = 'http://www.opengis.net/def/function/geosparql/ext/endPoint',
  EXPLODE = 'http://www.opengis.net/def/function/geosparql/ext/explode',
  FORCE2D = 'http://www.opengis.net/def/function/geosparql/ext/force2D',
  FORCE3D = 'http://www.opengis.net/def/function/geosparql/ext/force3D',
  FRECHETDISTANCE = 'http://www.opengis.net/def/function/geosparql/ext/frechetDistance',
  INFRONTOF = 'http://www.opengis.net/def/function/geosparql/ext/inFrontOf',
  ISCW = 'http://www.opengis.net/def/function/geosparql/ext/isCW',
  ISCCW = 'http://www.opengis.net/def/function/geosparql/ext/isCCW',
  ISCOLLECTION = 'http://www.opengis.net/def/function/geosparql/ext/isCollection',
  ISCONCAVE = 'http://www.opengis.net/def/function/geosparql/ext/isConcave',
  ISRECTANGLE = 'http://www.opengis.net/def/function/geosparql/ext/isRectangle',
  ISRING = 'http://www.opengis.net/def/function/geosparql/ext/isRing',
  ISTRIANGLE = 'http://www.opengis.net/def/function/geosparql/ext/isTriangle',
  ISVALID = 'http://www.opengis.net/def/function/geosparql/ext/isValid',
  ISVALIDTRAJECTORY = 'http://www.opengis.net/def/function/geosparql/ext/isValidTrajectory',
  LEFTOF = 'http://www.opengis.net/def/function/geosparql/ext/leftOf',
  LONGESTLINE = 'http://www.opengis.net/def/function/geosparql/ext/longestLine',
  MAXDISTANCE = 'http://www.opengis.net/def/function/geosparql/ext/maxDistance',
  NUMGEOMETRIES = 'http://www.opengis.net/def/function/geosparql/ext/numGeometries',
  NUMINTERIORRING = 'http://www.opengis.net/def/function/geosparql/ext/numInteriorRing',
  OFFSETCURVE = 'http://www.opengis.net/def/function/geosparql/ext/offsetCurve',
  POINTINSIDECIRCLE = 'http://www.opengis.net/def/function/geosparql/ext/pointInsideCircle',
  POINTN = 'http://www.opengis.net/def/function/geosparql/ext/pointN',
  POINTONSURFACE = 'http://www.opengis.net/def/function/geosparql/ext/pointOnSurface',
  REMOVEPOINT = 'http://www.opengis.net/def/function/geosparql/ext/removePoint',
  REMOVEREPEATEDPOINTS = 'http://www.opengis.net/def/function/geosparql/ext/removeRepeatedPoints',
  REVERSE = 'http://www.opengis.net/def/function/geosparql/ext/reverse',
  RIGHTOF = 'http://www.opengis.net/def/function/geosparql/ext/rightOf',
  ROTATE = 'http://www.opengis.net/def/function/geosparql/ext/rotate',
  SCALE = 'http://www.opengis.net/def/function/geosparql/ext/scale',
  SELFINTERSECTIONS = 'http://www.opengis.net/def/function/geosparql/ext/selfIntersections',
  SETPOINT = 'http://www.opengis.net/def/function/geosparql/ext/setPoint',
  STARTPOINT = 'http://www.opengis.net/def/function/geosparql/ext/startPoint',
  SHORTESTLINE = 'http://www.opengis.net/def/function/geosparql/ext/shortestLine',
  SIMPLIFY = 'http://www.opengis.net/def/function/geosparql/ext/simplify',
  SKEW = 'http://www.opengis.net/def/function/geosparql/ext/skew',
  SMOOTH = 'http://www.opengis.net/def/function/geosparql/ext/smooth',
  TRANSLATE = 'http://www.opengis.net/def/function/geosparql/ext/translate',
  TRANSFORMCRS84 = 'http://www.opengis.net/def/function/geosparql/ext/transformCRS84',
  WITHINDISTANCE = 'http://www.opengis.net/def/function/geosparql/ext/withinDistance',
  X = 'http://www.opengis.net/def/function/geosparql/ext/X',
  Y = 'http://www.opengis.net/def/function/geosparql/ext/Y',
  Z = 'http://www.opengis.net/def/function/geosparql/ext/Z',
}

export const supported_Geocodes = [
  'http://opengis.net/ont/geocode/OpenLocationCode',
  'http://opengis.net/ont/geocode/GeoURI',
];

export const _supported_DGGS = [
  'http://opengis.net/ont/geocode/OpenLocationCode',
];

export enum GeoSparqlOperator {
  AREA = 'http://www.opengis.net/def/function/geosparql/area',
  ASDGGS = 'http://www.opengis.net/def/function/geosparql/asDGGS',
  ASGEOJSON = 'http://www.opengis.net/def/function/geosparql/asGeoJSON',
  ASGML = 'http://www.opengis.net/def/function/geosparql/asGML',
  ASKML = 'http://www.opengis.net/def/function/geosparql/asKML',
  ASWKT = 'http://www.opengis.net/def/function/geosparql/asWKT',
  BOUNDARY = 'http://www.opengis.net/def/function/geosparql/boundary',
  BUFFER = 'http://www.opengis.net/def/function/geosparql/buffer',
  CENTROID = 'http://www.opengis.net/def/function/geosparql/centroid',
  CONCAVEHULL = 'http://www.opengis.net/def/function/geosparql/concaveHull',
  CONVEXHULL = 'http://www.opengis.net/def/function/geosparql/convexHull',
  COORDINATEDIMENSION = 'http://www.opengis.net/def/function/geosparql/coordinateDimension',
  DIFFERENCE = 'http://www.opengis.net/def/function/geosparql/difference',
  DISTANCE = 'http://www.opengis.net/def/function/geosparql/distance',
  DIMENSION = 'http://www.opengis.net/def/function/geosparql/dimension',
  EHCONTAINS = 'http://www.opengis.net/def/function/geosparql/ehContains',
  EHCOVEREDBY = 'http://www.opengis.net/def/function/geosparql/ehCoveredBy',
  EHCOVERS = 'http://www.opengis.net/def/function/geosparql/ehCovers',
  EHDISJOINT = 'http://www.opengis.net/def/function/geosparql/ehDisjoint',
  EHEQUALS = 'http://www.opengis.net/def/function/geosparql/ehEquals',
  EHINSIDE = 'http://www.opengis.net/def/function/geosparql/ehInside',
  EHMEET = 'http://www.opengis.net/def/function/geosparql/ehMeet',
  EHOVERLAP = 'http://www.opengis.net/def/function/geosparql/ehOverlap',
  ENVELOPE = 'http://www.opengis.net/def/function/geosparql/envelope',
  GEOMETRYTYPE = 'http://www.opengis.net/def/function/geosparql/geometryType',
  GEOMETRYN = 'http://www.opengis.net/def/function/geosparql/geometryN',
  GETSRID = 'http://www.opengis.net/def/function/geosparql/getSRID',
  INTERSECTION = 'http://www.opengis.net/def/function/geosparql/intersection',
  IS3D = 'http://www.opengis.net/def/function/geosparql/is3D',
  ISEMPTY = 'http://www.opengis.net/def/function/geosparql/isEmpty',
  ISMEASURED = 'http://www.opengis.net/def/function/geosparql/isMeasured',
  ISSIMPLE = 'http://www.opengis.net/def/function/geosparql/isSimple',
  ISCLOSED = 'http://www.opengis.net/def/function/geosparql/isClosed',
  LENGTH = 'http://www.opengis.net/def/function/geosparql/length',
  MAXX = 'http://www.opengis.net/def/function/geosparql/maxX',
  MAXY = 'http://www.opengis.net/def/function/geosparql/maxY',
  MAXZ = 'http://www.opengis.net/def/function/geosparql/maxZ',
  METRICAREA = 'http://www.opengis.net/def/function/geosparql/metricArea',
  METRICBUFFER = 'http://www.opengis.net/def/function/geosparql/metricBuffer',
  METRICDISTANCE = 'http://www.opengis.net/def/function/geosparql/metricDistance',
  METRICLENGTH = 'http://www.opengis.net/def/function/geosparql/metricLength',
  METRICPERIMETER = 'http://www.opengis.net/def/function/geosparql/metricPerimeter',
  MINX = 'http://www.opengis.net/def/function/geosparql/minX',
  MINY = 'http://www.opengis.net/def/function/geosparql/minY',
  MINZ = 'http://www.opengis.net/def/function/geosparql/minZ',
  NUMGEOMETRIES = 'http://www.opengis.net/def/function/geosparql/numGeometries',
  NUMPOINTS = 'http://www.opengis.net/def/function/geosparql/numPoints',
  PERIMETER = 'http://www.opengis.net/def/function/geosparql/perimeter',
  RCC8DC = 'http://www.opengis.net/def/function/geosparql/rcc8dc',
  RCC8EC = 'http://www.opengis.net/def/function/geosparql/rcc8ec',
  RCC8EQ = 'http://www.opengis.net/def/function/geosparql/rcc8eq',
  RCC8NTPP = 'http://www.opengis.net/def/function/geosparql/rcc8ntpp',
  RCC8NTPPI = 'http://www.opengis.net/def/function/geosparql/rcc8ntppi',
  RCC8PO = 'http://www.opengis.net/def/function/geosparql/rcc8po',
  RCC8TPP = 'http://www.opengis.net/def/function/geosparql/rcc8tpp',
  RCC8TPPI = 'http://www.opengis.net/def/function/geosparql/rcc8tppi',
  RELATE = 'http://www.opengis.net/def/function/geosparql/relate',
  SFCONTAINS = 'http://www.opengis.net/def/function/geosparql/sfContains',
  SFCROSSES = 'http://www.opengis.net/def/function/geosparql/sfCrosses',
  SFDISJOINT = 'http://www.opengis.net/def/function/geosparql/sfDisjoint',
  SFEQUALS = 'http://www.opengis.net/def/function/geosparql/sfEquals',
  SFINTERSECTS = 'http://www.opengis.net/def/function/geosparql/sfIntersects',
  SFOVERLAPS = 'http://www.opengis.net/def/function/geosparql/sfOverlaps',
  SFTOUCHES = 'http://www.opengis.net/def/function/geosparql/sfTouches',
  SFWITHIN = 'http://www.opengis.net/def/function/geosparql/sfWithin',
  SPATIALDIMENSION = 'http://www.opengis.net/def/function/geosparql/spatialDimension',
  SYMDIFFERENCE = 'http://www.opengis.net/def/function/geosparql/symDifference',
  TRANSFORM = 'http://www.opengis.net/def/function/geosparql/transform',
  GEO_UNION = 'http://www.opengis.net/def/function/geosparql/union',
}


export enum SparqlOperator {
  // Operator mapping
  // https://www.w3.org/TR/sparql11-query/#OperatorMapping
  NOT = '!',
  UMINUS = 'uminus',
  UPLUS = 'uplus',
  LOGICAL_OR = '||',
  LOGICAL_AND = '&&',

  EQUAL = '=',
  NOT_EQUAL = '!=',
  LT = '<',
  GT = '>',
  LTE = '<=',
  GTE = '>=',
  SAME_TERM = 'sameterm',
  IN = 'in',
  NOT_IN = 'notin',

  MULTIPLICATION = '*',
  DIVISION = '/',
  ADDITION = '+',
  SUBTRACTION = '-',

  // Functional Forms
  // https://www.w3.org/TR/sparql11-query/#func-forms
  // See SpecialOperators

  // Functions on RDF Terms
  // https://www.w3.org/TR/sparql11-query/#func-rdfTerms
  IS_IRI = 'isiri',
  IS_URI = 'isuri',
  IS_BLANK = 'isblank',
  IS_LITERAL = 'isliteral',
  IS_NUMERIC = 'isnumeric',
  HAS_LANG = 'haslang',
  HAS_LANGDIR = 'haslangdir',
  STR = 'str',
  LANG = 'lang',
  LANGDIR = 'langdir',
  DATATYPE = 'datatype',
  IRI = 'iri',
  URI = 'uri',
  BNODE = 'bnode',
  STRDT = 'strdt',
  STRLANG = 'strlang',
  STRLANGDIR = 'strlangdir',
  UUID = 'uuid',
  STRUUID = 'struuid',

  // Functions on strings
  // https://www.w3.org/TR/sparql11-query/#func-strings
  STRLEN = 'strlen',
  SUBSTR = 'substr',
  UCASE = 'ucase',
  LCASE = 'lcase',
  STRSTARTS = 'strstarts',
  STRENDS = 'strends',
  CONTAINS = 'contains',
  STRBEFORE = 'strbefore',
  STRAFTER = 'strafter',
  ENCODE_FOR_URI = 'encode_for_uri',
  CONCAT = 'concat',
  LANG_MATCHES = 'langmatches',
  REGEX = 'regex',
  REPLACE = 'replace',

  // Functions on numerics
  // https://www.w3.org/TR/sparql11-query/#func-numerics
  ABS = 'abs',
  ROUND = 'round',
  CEIL = 'ceil',
  FLOOR = 'floor',
  RAND = 'rand',

  // Functions on Dates and Times
  // https://www.w3.org/TR/sparql11-query/#func-date-time
  NOW = 'now',
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
  TIMEZONE = 'timezone',
  TZ = 'tz',
  // Hash functions
  // https://www.w3.org/TR/sparql11-query/#func-hash
  MD5 = 'md5',
  SHA1 = 'sha1',
  SHA256 = 'sha256',
  SHA384 = 'sha384',
  SHA512 = 'sha512',

  // XPath Constructor functions
  // https://www.w3.org/TR/sparql11-query/#FunctionMapping
  // See Named Operators

  // Functions for quoted triples
  // https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#triple-function
  TRIPLE = 'triple',
  SUBJECT = 'subject',
  PREDICATE = 'predicate',
  OBJECT = 'object',
  IS_TRIPLE = 'istriple',

  // Functional Forms
  // https://www.w3.org/TR/sparql11-query/#func-forms
  BOUND = 'bound',
  IF = 'if',
  COALESCE = 'coalesce',
}

export type NamedOperator =
  // XPath Constructor functions
  // https://www.w3.org/TR/sparql11-query/#FunctionMapping
  TypeURL.XSD_STRING
  | TypeURL.XSD_FLOAT
  | TypeURL.XSD_DOUBLE
  | TypeURL.XSD_DECIMAL
  | TypeURL.XSD_INTEGER
  | TypeURL.XSD_DATE_TIME
  | TypeURL.XSD_DATE
  | TypeURL.XSD_BOOLEAN
  | TypeURL.XSD_TIME
  | TypeURL.XSD_DURATION
  | TypeURL.XSD_DAY_TIME_DURATION
  | TypeURL.XSD_YEAR_MONTH_DURATION;
