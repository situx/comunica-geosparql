import type {
  IDateRepresentation,
  IDateTimeRepresentation,
  IDayTimeDurationRepresentation,
  IDurationRepresentation,
  ITimeRepresentation,
  ITimeZoneRepresentation,
  IYearMonthDurationRepresentation,
} from '@comunica/types';

import type { Literal } from '@comunica/utils-expression-evaluator';
import * as turf from '@turf/turf';
import * as WK from 'betterknown';
import { decodeBase32 } from 'geohashing';
import type * as GJ from 'geojson';
import { cellsToMultiPolygon, cellToLatLng } from 'h3-js';
import OpenLocationCode from 'open-location-code-typescript';
import * as THREE from 'three';
import type { ISerializable } from '../expressions';
import { supported_Geocodes } from './Consts';
import { simplifyDurationRepresentation } from './DateTimeHelpers';
import { ParseError } from './Errors';
import { maximumDayInMonthFor } from './SpecAlgos';

/**
 * Parses float datatypes (double, float).
 *
 * All invalid lexical values return undefined.
 *
 * @param value the string to interpret as a number
 */
export function parseXSDFloat(value: string): number | undefined {
  const numb = Number(value);
  if (Number.isNaN(numb)) {
    if (value === 'NaN') {
      return Number.NaN;
    }
    if (value === 'INF' || value === '+INF') {
      return Number.POSITIVE_INFINITY;
    }
    if (value === '-INF') {
      return Number.NEGATIVE_INFINITY;
    }
    return undefined;
  }
  return numb;
}

/**
 * Parses decimal datatypes (decimal, int, byte, nonPositiveInteger, etc...).
 *
 * All other values, including NaN, INF, and floating point numbers all
 * return undefined;
 *
 * @param value the string to interpret as a number
 */
export function parseXSDDecimal(value: string): number | undefined {
  const numb = Number(value);
  return Number.isNaN(numb) ? undefined : numb;
}

export function parseDateTime(dateTimeStr: string): IDateTimeRepresentation {
  // https://www.w3.org/TR/xmlschema-2/#dateTime
  const [ date, time ] = dateTimeStr.split('T');
  if (time === undefined) {
    throw new ParseError(dateTimeStr, 'dateTime');
  }
  return { ...parseDate(date), ...__parseTime(time) };
}

function parseTimeZone(timeZoneStr: string): Partial<ITimeZoneRepresentation> {
  // https://www.w3.org/TR/xmlschema-2/#dateTime-timezones
  if (timeZoneStr === '') {
    return { zoneHours: undefined, zoneMinutes: undefined };
  }
  if (timeZoneStr === 'Z') {
    return { zoneHours: 0, zoneMinutes: 0 };
  }
  const timeZoneStrings = timeZoneStr.replaceAll(/^([+|-])(\d\d):(\d\d)$/gu, '$11!$2!$3').split('!');
  const timeZone = timeZoneStrings.map(Number);
  return {
    zoneHours: timeZone[0] * timeZone[1],
    zoneMinutes: timeZone[0] * timeZone[2],
  };
}

export function parseDate(dateStr: string): IDateRepresentation {
  // https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
  const formatted = dateStr.replaceAll(
    /^(-)?([123456789]*\d{4})-(\d\d)-(\d\d)(Z|([+-]\d\d:\d\d))?$/gu,
    '$11!$2!$3!$4!$5',
  );
  if (formatted === dateStr) {
    throw new ParseError(dateStr, 'date');
  }
  const dateStrings = formatted.split('!');
  const date = dateStrings.slice(0, -1).map(Number);

  const res = {
    year: date[0] * date[1],
    month: date[2],
    day: date[3],
    ...parseTimeZone(dateStrings[4]),
  };
  if (!(res.month >= 1 && res.month <= 12) || !(res.day >= 1 && res.day <= maximumDayInMonthFor(res.year, res.month))) {
    throw new ParseError(dateStr, 'date');
  }
  return res;
}

function __parseTime(timeStr: string): ITimeRepresentation {
  // https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
  const formatted = timeStr.replaceAll(/^(\d\d):(\d\d):(\d\d(\.\d+)?)(Z|([+-]\d\d:\d\d))?$/gu, '$1!$2!$3!$5');
  if (formatted === timeStr) {
    throw new ParseError(timeStr, 'time');
  }
  const timeStrings = formatted.split('!');
  const time = timeStrings.slice(0, -1).map(Number);

  const res = {
    hours: time[0],
    minutes: time[1],
    seconds: time[2],
    ...parseTimeZone(timeStrings[3]),
  };

  if (res.seconds >= 60 || res.minutes >= 60 || res.hours > 24 ||
    (res.hours === 24 && (res.minutes !== 0 || res.seconds !== 0))) {
    throw new ParseError(timeStr, 'time');
  }
  return res;
}

// We make a separation in internal and external since dateTime will have hour-date rollover,
// but time just does modulo the time.
export function parseTime(timeStr: string): ITimeRepresentation {
  // https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
  const res = __parseTime(timeStr);
  res.hours %= 24;
  return res;
}

export function parseDuration(durationStr: string): Partial<IDurationRepresentation> {
  // https://www.w3.org/TR/xmlschema-2/#duration-lexical-repr
  const [ dayNotation, timeNotation ] = durationStr.split('T');

  // Handle date part
  const formattedDayDur = dayNotation.replaceAll(/^(-)?P(\d+Y)?(\d+M)?(\d+D)?$/gu, '$11S!$2!$3!$4');
  if (formattedDayDur === dayNotation) {
    throw new ParseError(durationStr, 'duration');
  }

  const durationStrings = formattedDayDur.split('!');
  if (timeNotation !== undefined) {
    const formattedTimeDur = timeNotation.replaceAll(/^(\d+H)?(\d+M)?(\d+(\.\d+)?S)?$/gu, '$1!$2!$3');

    if (timeNotation === '' || timeNotation === formattedTimeDur) {
      throw new ParseError(durationStr, 'duration');
    }
    durationStrings.push(...formattedTimeDur.split('!'));
  }
  const duration = durationStrings.map(str => str.slice(0, -1));
  if (!duration.slice(1).some(Boolean)) {
    throw new ParseError(durationStr, 'duration');
  }

  const sign = <-1 | 1> Number(duration[0]);
  return simplifyDurationRepresentation({
    year: duration[1] ? sign * Number(duration[1]) : undefined,
    month: duration[2] ? sign * Number(duration[2]) : undefined,
    day: duration[3] ? sign * Number(duration[3]) : undefined,
    hours: duration[4] ? sign * Number(duration[4]) : undefined,
    minutes: duration[5] ? sign * Number(duration[5]) : undefined,
    seconds: duration[6] ? sign * Number(duration[6]) : undefined,
  });
}

export function parseYearMonthDuration(durationStr: string): Partial<IYearMonthDurationRepresentation> {
  const res = parseDuration(durationStr);
  if ([ 'hours', 'minutes', 'seconds', 'day' ].some(key => Boolean((<any> res)[key]))) {
    throw new ParseError(durationStr, 'yearMonthDuration');
  }
  return res;
}

export function parseDayTimeDuration(durationStr: string): Partial<IDayTimeDurationRepresentation> {
  const res = parseDuration(durationStr);
  if ([ 'year', 'month' ].some(key => Boolean((<any> res)[key]))) {
    throw new ParseError(durationStr, 'dayTimeDuration');
  }
  return res;
}

export function parseGeometryFeature(geomlit: Literal<ISerializable>): [GJ.Feature /* | THREE.Mesh */, string, string] {
  const geomresult = parseGeometry(geomlit);
  // C if (geomresult[0] instanceof THREE.Mesh) {
  // return [ geomresult[0], '', geomlit.dataType ];
  // }
  return [ turf.feature(geomresult[0]), geomresult[1], geomresult[2] ];
}

export function parseGeometry(geomlit: Literal<ISerializable>): [GJ.Geometry /* | THREE.Mesh */, string, string] {
  let thestr = geomlit.str().replaceAll(/^\s+|\s+$/gu, '');
  let crsuri = '<http://www.opengis.net/def/crs/OGC/1.3/CRS84>';
  try {
    if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#wktLiteral') {
      if (thestr.startsWith('<')) {
        const spl = thestr.split('>');
        crsuri = spl[0].slice(1);
        thestr = spl[1].trim();
      }
      return [ turf.getGeom(<GJ.Geometry>WK.wktToGeoJSON(thestr)), crsuri, geomlit.dataType ];
    }
    // I if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#gmlLiteral') {
    // const parser = new GmlParser();
    // const geojson = await parser.parse(thestr);
    // return [ <GJ.Geometry>geojson, '' ];
    // }
    // if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#gpxLiteral') {
    // const parsed = tmgj.gpx(new DOMParser().parseFromString(thestr, 'text/xml')).features[0].geometry;
    // if (parsed !== null) {
    //     return [ parsed, crsuri, geomlit.dataType ];
    // }
    // }
    /*if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#kmlLiteral') {
      if (!thestr.startsWith('<kml')) {
        thestr = `<kml><Document><Placemark>${thestr}</Placemark></Document></kml>`;
      }
      return [ new KmlToGeojson().parse(thestr).geojson.features[0].geometry, crsuri, geomlit.dataType ];
    }*/
    if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#geoJSONLiteral') {
      return [ turf.getGeom(JSON.parse(thestr)), crsuri, geomlit.dataType ];
    }
    if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#geoCodeLiteral') {
      if (thestr.startsWith('<')) {
        const spl = thestr.split('>');
        crsuri = spl[0].slice(1);
        thestr = spl[1].trim();
      }
      if (crsuri in supported_Geocodes) {
        if (crsuri === 'http://opengis.net/ont/geocode/OpenLocationCode') {
          const decoded = OpenLocationCode.decode(thestr);
          // eslint-disable-next-line max-len
          return [ turf.geometry('Point', [ decoded.latitudeCenter, decoded.longitudeCenter ]), crsuri, geomlit.dataType ];
        }
        if (crsuri === 'http://opengis.net/ont/geocode/GeoURI') {
          const decoded = thestr.replaceAll('geo:', '').split(',');
          return [ turf.geometry('Point', [ decoded[0], decoded[1] ]), crsuri, geomlit.dataType ];
        }
        if (crsuri === 'http://opengis.net/ont/geocode/GeoHash' || crsuri === 'http://opengis.net/ont/geocode/GeoHash-36') {
          const decoded = decodeBase32(thestr);
          return [ turf.geometry('Point', [ decoded.lng, decoded.lat ]), crsuri, geomlit.dataType ];
        }
      }
      if (crsuri.startsWith('https://h3geo.org/res/')) {
        // let resolution = crsuri.replaceAll('https://h3geo.org/res/', '');
        let ispoint = true;
        if (thestr.includes('CELLLIST')) {
          ispoint = false;
        }
        // eslint-disable-next-line max-len
        thestr = thestr.replaceAll('CELLLIST', '').replaceAll('CELL', '').replaceAll('(', '[').replaceAll(')', ']').replaceAll('\'', '"');
        const dggsdict = JSON.parse(thestr);
        if (ispoint) {
          const decoded = cellToLatLng(dggsdict[0]);
          return [ turf.getGeom({ type: 'Point', coordinates: [ decoded[0], decoded[1] ]}), crsuri, geomlit.dataType ];
        }
        const result = cellsToMultiPolygon(dggsdict);
        return [ turf.getGeom({ type: 'MultiPolygon', coordinates: result }), crsuri, geomlit.dataType ];
      }
      return [ turf.getGeom(JSON.parse(thestr)), crsuri, geomlit.dataType ];
    }
    //
    // if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#objLiteral') {
    // return [ new THREE.Mesh(new OBJLoader().parse(geomlit.str()). .getA, material), crsuri, geomlit.dataType ];
    // }
    // if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#plyLiteral') {
    // return [ new THREE.Mesh(new PLYLoader().parse(geomlit.str()), material), crsuri, geomlit.dataType ];
    // }
    // if (geomlit.dataType === 'http://www.opengis.net/ont/geosparql#stlLiteral') {
    // return [ new THREE.Mesh(new STLLoader().parse(geomlit.str()), material), crsuri, geomlit.dataType ];
    // }
  } catch {
    throw new ParseError(`Geometry literal with type ${geomlit.dataType} could not be parsed.\nContent: ${geomlit.str()}`, 'geometry');
  }
  return [ turf.getGeom({ type: 'Point', coordinates: []}), crsuri, geomlit.dataType ];
}