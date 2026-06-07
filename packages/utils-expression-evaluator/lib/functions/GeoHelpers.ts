import * as turf from '@turf/turf';
import type * as GJ from 'geojson';
import * as THREE from 'three';
import type { ISerializable, Literal } from '../expressions';
import { convertGeometry } from '../util/EPSGDefs';
import { parseGeometry } from '../util/Parsing';

export function rangeOverlaps(Astart: number, Afinish: number, Bstart: number, Bfinish: number): boolean {
  if (Bstart < Astart) {
    return Bfinish > Astart;
  }
  return Bstart < Afinish;
}

export function rangeOverlap(start1: number, end1: number, start2: number, end2: number): number {
  return Math.max(Math.max(end2 - start1, 0) - Math.max(end2 - end1, 0) - Math.max(start2 - start1, 0), 0);
}

export function length3D(coords: number[][]): number {
  let length3d = 0;
  for (let i = 0; i < coords.length; i += 2) {
    const coord1 = coords[i];
    const coord2 = coords[i + 1];
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    const dz = coord1[2] - coord2[2];
    length3d += Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  return length3d;
}

export function is3D(geom: GJ.Geometry): boolean {
  if (turf.findPoint(geom, { coordIndex: 0 }).geometry.coordinates.length === 3) {
    return true;
  }
  return false;
}

export function bbox3D(thegeom: GJ.Geometry): number[] {
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let minZ = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;
  let maxZ = Number.MIN_VALUE;
  if (is3D(thegeom)) {
    turf.coordEach(thegeom, (
      currentCoord,
      _coordIndex,
      _featureIndex,
      _multiFeatureIndex,
      _geometryIndex,
    ) => {
      const [ x, y, z ] = currentCoord;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);

      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      maxZ = Math.max(maxZ, z);
    });
  }
  return [ minX, minY, minZ, maxX, maxY, maxZ ];
}

export function distance3DGeoms(left: GJ.Geometry, right: GJ.Geometry): number {
  let minDistance = Number.MAX_VALUE;
  turf.coordEach(left, (currentCoord, _coordIndex) => {
    turf.coordEach(right, (currentCoord1, _coordIndex1) => {
      const curdist = distanceWrapper(currentCoord, currentCoord1);
      if (curdist < minDistance) {
        minDistance = curdist;
      }
    });
  });
  return minDistance;
}

export function intersects3D(left: GJ.Geometry, right: GJ.Geometry): boolean {
  return distance3DGeoms(left, right) === 0;
}

export function maxDistanceCalc(left: GJ.Geometry, right: GJ.Geometry): number {
  let maxDistance = Number.MIN_VALUE;
  turf.coordEach(left, (currentCoord, _coordIndex) => {
    turf.coordEach(right, (currentCoord1, _coordIndex1) => {
      const curdist = distanceWrapper(currentCoord, currentCoord1);
      if (curdist > maxDistance) {
        maxDistance = curdist;
      }
    });
  });
  return maxDistance;
}

export function distance3D(coord1: number[], coord2: number[]): number {
  const dx = coord1[0] - coord2[0];
  const dy = coord1[1] - coord2[1];
  const dz = coord1[2] - coord2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function distanceWrapper(coord1: number[], coord2: number[]): number {
  if (coord1.length === 3 && coord2.length === 3) {
    return distance3D(coord1, coord2);
  }
  return turf.distance(coord1, coord2);
}

export function castGeometryTo(geom: GJ.Geometry, geomtype: string): GJ.LineString | GJ.Polygon | null {
  if (geom.type === 'LineString' && geom.type === geomtype) {
    return turf.lineString(geom.coordinates).geometry;
  }
  if (geom.type === 'Polygon' && geom.type === geomtype) {
    return turf.polygon(geom.coordinates).geometry;
  }
  return null;
}

export function castGeometryToTurfType(geom: GJ.Geometry): GJ.Geometry | GJ.Point | GJ.LineString | GJ.Polygon | null {
  if (geom.type === 'Point') {
    return turf.point(geom.coordinates).geometry;
  }
  if (geom.type === 'LineString') {
    return turf.lineString(geom.coordinates).geometry;
  }
  if (geom.type === 'Polygon') {
    return turf.polygon(geom.coordinates).geometry;
  }
  return geom;
}

export function GeometryToThree(geom: GJ.Geometry): THREE.Mesh | null {
  if ('coordinates' in geom) {
    const shape = new THREE.Shape();
    let first = true;
    turf.coordEach(geom, (
      currentCoord,
    ) => {
      if (first) {
        shape.moveTo(currentCoord[0], currentCoord[1]);
        first = false;
      } else {
        shape.lineTo(currentCoord[0], currentCoord[1]);
      }
    });
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    return new THREE.Mesh(geometry, material);
  }
  return null;
}

// Export function ThreeToGeometry(mesh: THREE.Mesh) {
// const result = { type: 'Polygon', coordinates: []};
// // Const coords: [[]] = [[]];
// // const positions = mesh.geometry.attributes.position.array;
// // const ptCout = positions.length / 3;
// // for (let i = 0; i < ptCout; i++) {
// // result.coordinates[0].push([ positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2] ]);
// // }
// return result;
// }

export function extrudeGeometry3D(geom: GJ.Geometry, depth = 0.1): THREE.Mesh | null {
  if ('coordinates' in geom) {
    const shape = new THREE.Shape();
    let first = true;
    turf.coordEach(geom, (
      currentCoord,
    ) => {
      if (first) {
        shape.moveTo(currentCoord[0], currentCoord[1]);
        first = false;
      } else {
        shape.lineTo(currentCoord[0], currentCoord[1]);
      }
    });
    const geometry = new THREE.ExtrudeGeometry(shape, { depth });
    const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    return new THREE.Mesh(geometry, material);
  }
  return null;
}

export function transformGeometry(geom: GJ.Geometry, source: string, dest: string): GJ.Geometry {
  if (source.startsWith('http')) {
    source = `EPSG:${source.replaceAll('http://www.opengis.net/def/crs/EPSG/0/', '')}`;
  }
  if (dest.startsWith('http')) {
    dest = `EPSG:${dest.replaceAll('http://www.opengis.net/def/crs/EPSG/0/', '')}`;
  }
  if (source === dest) {
    return geom;
  }
  return convertGeometry(geom, source, dest, '');
}

export function unitURIToTurfString(uri: string): string {
  const uriToTurfStr: Record<string, string> = {
    'http://qudt.org/vocab/unit/M': 'meters',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/meter': 'meters',
    'http://qudt.org/vocab/unit/KiloM': 'kilometers',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/kilometer': 'kilometers',
    'http://qudt.org/vocab/unit/CentiM': 'centimeters',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/centimeter': 'centimeters',
    'http://qudt.org/vocab/unit/M2': 'squaremeters',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/squaremeter': 'squaremeters',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/acre': 'acres',
    'http://qudt.org/vocab/unit/AC': 'acres',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/foot': 'feet',
    'http://qudt.org/vocab/unit/FT': 'feet',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/radian': 'radians',
    'http://qudt.org/vocab/unit/RAD': 'radians',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/yard': 'yards',
    'http://qudt.org/vocab/unit/YD': 'yards',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/inch': 'inches',
    'http://qudt.org/vocab/unit/IN': 'inches',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/mile': 'miles',
    'http://qudt.org/vocab/unit/MI': 'miles',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/nauticalmile': 'nauticalmiles',
    'http://qudt.org/vocab/unit/MI_N': 'nauticalmiles',
    'http://www.ontology-of-units-of-measure.org/resource/om-2/hectare': 'hectares',
    'http://qudt.org/vocab/unit/HA': 'hectares',
  };
  if (uri in uriToTurfStr) {
    return uriToTurfStr[uri];
  }
  return '';
}

export function transformGeometryLiteral(thegeom: Literal<ISerializable>, dest: string): GJ.Geometry {
  const thegeomtup = parseGeometry(thegeom);
  return transformGeometry(thegeomtup[0], thegeomtup[1], dest);
}

export function transformGeometryLiteralCRS84(thegeom: Literal<ISerializable>): GJ.Geometry {
  const thegeomtup = parseGeometry(thegeom);
  return transformGeometry(thegeomtup[0], thegeomtup[1], 'http://www.opengis.net/def/crs/OGC/1.3/CRS84');
}
