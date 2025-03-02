// src/TrailLine.jsx
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export default function TrailLine(props) {
  // Explizit sicherstellen, dass props.points ein Array ist
  const safePoints = Array.isArray(props.points) ? props.points : [];
  
  const vectorPoints = useMemo(() => {
    return safePoints.map(p => new THREE.Vector3(...p));
  }, [safePoints]);

  const geometry = useMemo(() => {
    if (vectorPoints.length === 0) return null;
    const positions = new Float32Array(vectorPoints.length * 3);
    const colors = new Float32Array(vectorPoints.length * 3);
    vectorPoints.forEach((vec, i) => {
      positions.set([vec.x, vec.y, vec.z], i * 3);
      const t = vectorPoints.length > 1 ? i / (vectorPoints.length - 1) : 0;
      // Farbverlauf: Alte Punkte rot, neue Punkte blau
      const r = 1 - t;
      const g = 0;
      const b = t;
      colors.set([r, g, b], i * 3);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [vectorPoints]);

  if (!geometry) return null;

  return (
    <Line
      geometry={geometry}
      material-transparent={true}
      material-opacity={0.8}
      material-vertexColors={true}
      lineWidth={1}
    />
  );
}




