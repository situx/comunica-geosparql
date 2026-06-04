import type {
  IDateRepresentation,
  IDateTimeRepresentation,
  IDurationRepresentation,
  ITimeRepresentation,
  ITimeZoneRepresentation,
} from '@comunica/types';

import * as tokml from '@placemarkio/tokml';
import * as turf from '@turf/turf';
import * as WK from 'betterknown';
import { encodeBase32 } from 'geohashing';
import type * as GJ from 'geojson';
import { latLngToCell, polygonToCells } from 'h3-js';
import OpenLocationCode from 'open-location-code-typescript';
// @ts-ignore
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// @ts-ignore
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
// @ts-ignore
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import * as wkxx from 'wkx-ts';
import { StringLiteral } from '../expressions';
import { extrudeGeometry3D } from '../functions/Helpers';

function numSerializer(num: number, min = 2): string {
  return num.toLocaleString(undefined, { minimumIntegerDigits: min, useGrouping: false });
}

export function serializeDateTime(date: IDateTimeRepresentation): string {
  // https://www.w3.org/TR/xmlschema-2/#dateTime
  // Extraction is needed because the date serializer can not add timezone y
  return `${serializeDate({ year: date.year, month: date.month, day: date.day })}T${serializeTime(date)}`;
}

function serializeTimeZone(tz: Partial<ITimeZoneRepresentation>): string {
  // https://www.w3.org/TR/xmlschema-2/#dateTime-timezones
  if (tz.zoneHours === undefined || tz.zoneMinutes === undefined) {
    return '';
  }
  if (tz.zoneHours === 0 && tz.zoneMinutes === 0) {
    return 'Z';
  }
  // SerializeTimeZone({ zoneHours: 5, zoneMinutes: 4 }) returns +05:04
  return `${tz.zoneHours >= 0 ? `+${numSerializer(tz.zoneHours)}` : numSerializer(tz.zoneHours)}:${numSerializer(Math.abs(tz.zoneMinutes))}`;
}

export function serializeDate(date: IDateRepresentation): string {
  // https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
  return `${numSerializer(date.year, 4)}-${numSerializer(date.month)}-${numSerializer(date.day)}${serializeTimeZone(date)}`;
}

export function serializeGeometry(thegeom: GJ.Geometry | GJ.Polygon | GJ.Point | undefined, literaltype: string, crsuri = 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'): StringLiteral {
  if (typeof (thegeom) !== 'undefined') {
    const centcoords = turf.centroid(thegeom).geometry.coordinates;
    let extruded;
    let data;
    switch (literaltype) {
      case 'http://www.opengis.net/ont/geosparql#wkbLiteral':
        return new StringLiteral(`<${crsuri}> ${wkxx.Geometry.parse(JSON.stringify(thegeom)).toWkb().toString()}`, 'http://www.opengis.net/ont/geosparql#wkbLiteral');
      case 'http://www.opengis.net/ont/geosparql#wktLiteral':
        if (crsuri !== 'http://www.opengis.net/def/crs/OGC/1.3/CRS84') {
          return new StringLiteral(`<${crsuri}> ${WK.geoJSONToWkt(thegeom)}`, 'http://www.opengis.net/ont/geosparql#wktLiteral');
        }
        return new StringLiteral(`${WK.geoJSONToWkt(thegeom)}`, 'http://www.opengis.net/ont/geosparql#wktLiteral');
      case 'http://www.opengis.net/ont/geosparql#gltfLiteral':
        extruded = extrudeGeometry3D(thegeom);
        if (extruded !== null) {
          data = new GLTFExporter().parseAsync(extruded);
          // eslint-disable-next-line ts/no-base-to-string
          return new StringLiteral(data.toString(), 'http://www.opengis.net/ont/geosparql#gltfLiteral');
        }
        return new StringLiteral(`Literal ${JSON.stringify(thegeom)} could not be converted to GLTF`);
      case 'http://www.opengis.net/ont/geosparql#geoJSONLiteral':
        return new StringLiteral(JSON.stringify(thegeom), 'http://www.opengis.net/ont/geosparql#geoJSONLiteral');
      case 'http://www.opengis.net/ont/geosparql#jsonfgLiteral':
        // eslint-disable-next-line no-case-declarations
        const thegeomjs = JSON.parse(JSON.stringify(thegeom));
        thegeomjs.coordRefSys = crsuri;
        thegeomjs.conformsTo = [ 'http://www.opengis.net/spec/json-fg-1/1.0/conf/core', 'http://www.opengis.net/spec/json-fg-1/1.0/conf/types-schemas' ];
        return new StringLiteral(JSON.stringify(thegeomjs), 'http://www.opengis.net/ont/geosparql#jsonfgLiteral');
      case 'http://www.opengis.net/ont/geosparql#objLiteral':
        extruded = extrudeGeometry3D(thegeom);
        if (extruded !== null) {
          return new StringLiteral(new OBJExporter().parse(extruded).toString(), 'http://www.opengis.net/ont/geosparql#objLiteral');
        }
        return new StringLiteral(`Literal ${JSON.stringify(thegeom)} could not be converted to OBJ`);
      case 'http://www.opengis.net/ont/geosparql#plyLiteral':
        extruded = extrudeGeometry3D(thegeom);
        if (extruded !== null) {
          // eslint-disable-next-line ts/ban-ts-comment
          return new StringLiteral(new PLYExporter().parse(extruded).toString(), 'http://www.opengis.net/ont/geosparql#plyLiteral');
        }
        return new StringLiteral(`Literal ${JSON.stringify(thegeom)} could not be converted to PLY`);
      case 'http://www.opengis.net/ont/geosparql#stlLiteral':
        extruded = extrudeGeometry3D(thegeom);
        if (extruded !== null) {
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-expect-error
          return new StringLiteral(new STLExporter().parse(extruded).toString(), 'http://www.opengis.net/ont/geosparql#stlLiteral');
        }
        return new StringLiteral(`Literal ${JSON.stringify(thegeom)} could not be converted to STL`);
      case 'http://www.opengis.net/ont/geosparql#kmlLiteral':
        if (crsuri !== 'http://www.opengis.net/def/crs/OGC/1.3/CRS84') {
          return new StringLiteral(tokml.toKML(turf.featureCollection([ turf.feature(thegeom) ])), 'http://www.opengis.net/ont/geosparql#kmlLiteral');
        }
        return new StringLiteral(tokml.toKML(turf.featureCollection([ turf.feature(thegeom) ])), 'http://www.opengis.net/ont/geosparql#kmlLiteral');
      case 'http://opengis.net/ont/geocode/OpenLocationCode':
        return new StringLiteral(`<http://opengis.net/ont/geocode/OpenLocationCode> ${OpenLocationCode.encode(centcoords[0], centcoords[1]).toString()}`, 'http://www.opengis.net/ont/geosparql#geoCodeLiteral');
      case 'http://opengis.net/ont/geocode/GeoURI':
        return new StringLiteral(`<http://opengis.net/ont/geocode/GeoURI> geo:${centcoords[0]},${centcoords[1]}`, 'http://www.opengis.net/ont/geosparql#geoCodeLiteral');
      case 'http://opengis.net/ont/geocode/GeoHash':
        return new StringLiteral(`<http://opengis.net/ont/geocode/GeoHash> ${encodeBase32(centcoords[0], centcoords[1])}`, 'http://www.opengis.net/ont/geosparql#geoCodeLiteral');
    }
    if (literaltype.includes('https://h3geo.org/res/')) {
      const resolution = literaltype.replaceAll('https://h3geo.org/res/', '');
      if (thegeom.type === 'Point') {
        return new StringLiteral(`<${literaltype}> CELL ((${latLngToCell(centcoords[0], centcoords[1], Number.parseInt(resolution, 10)).toString()}))`, 'http://www.opengis.net/ont/geosparql#dggsLiteral');
      }
      return new StringLiteral(`<${literaltype}> CELLLIST ((${polygonToCells(turf.coordAll(thegeom), Number.parseInt(resolution, 10), true).toString().replaceAll(',', ' ')}))`, 'http://www.opengis.net/ont/geosparql#dggsLiteral');
    }
    if (crsuri.includes('https://w3id.org/dggs/auspix')) {
      return new StringLiteral('AUSPIX DGGS not yet supported');
    }
    return new StringLiteral(`Could not serialize geometry of type ${literaltype} ${JSON.stringify(thegeom)}`);
  }
  return new StringLiteral(`Could not serialize undefined geometry`);
}

export function serializeTime(time: ITimeRepresentation): string {
  // https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
  return `${numSerializer(time.hours)}:${numSerializer(time.minutes)}:${numSerializer(time.seconds)}${serializeTimeZone(time)}`;
}

export function serializeDuration(dur: Partial<IDurationRepresentation>, zeroString: 'PT0S' | 'P0M' = 'PT0S'): string {
  // https://www.w3.org/TR/xmlschema-2/#duration-lexical-repr
  if (!Object.values(dur).some(val => (val || 0) !== 0)) {
    return zeroString;
  }

  const sign = Object.values(dur).some(val => (val || 0) < 0) ? '-' : '';
  const year = dur.year ? `${Math.abs(dur.year)}Y` : '';
  const month = dur.month ? `${Math.abs(dur.month)}M` : '';
  const day = dur.day ? `${Math.abs(dur.day)}D` : '';

  const dayNotation = `${sign}P${year}${month}${day}`;
  // eslint-disable-next-line ts/prefer-nullish-coalescing
  if (!(dur.hours || dur.minutes || dur.seconds)) {
    return dayNotation;
  }

  const hour = dur.hours ? `${Math.abs(dur.hours)}H` : '';
  const minute = dur.minutes ? `${Math.abs(dur.minutes)}M` : '';
  const second = dur.seconds ? `${Math.abs(dur.seconds)}S` : '';

  return `${dayNotation}T${hour}${minute}${second}`;
}
