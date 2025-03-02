// src/DoublePendulumScene.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useDoublePendulumPhysics from './useDoublePendulumPhysics';
import TrailLine from './TrailLine';

function DoublePendulum({ parameters, paused }) {
  const {
    L1 = 2,
    L2 = 2,
    theta1: initialTheta1 = 0,
    theta2: initialTheta2 = 0,
  } = parameters || {};

  const { theta1, theta2 } = useDoublePendulumPhysics(initialTheta1, initialTheta2, paused, parameters);

  const rod1Ref = useRef();
  const rod2Ref = useRef();
  const bob2Ref = useRef();

  // Zustand für die Trail-Punkte (Positionen der zweiten Kugel)
  const [points, setPoints] = useState([]);

  useFrame(() => {
    if (rod1Ref.current) {
      rod1Ref.current.rotation.z = theta1;
    }
    if (rod2Ref.current) {
      rod2Ref.current.position.x = L1;
      rod2Ref.current.rotation.z = theta2;
    }
    if (bob2Ref.current) {
      const pos = new THREE.Vector3();
      bob2Ref.current.getWorldPosition(pos);
      setPoints(prev => {
        const newPoints = [...prev, pos.toArray()];
        if (newPoints.length > 100) newPoints.shift();
        return newPoints;
      });
    }
  });

  return (
    <group>
      {/* Erstes Pendel: Stab und Bob */}
      <group ref={rod1Ref}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, L1, 16]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <mesh position={[L1, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>

      {/* Zweites Pendel: Stab und Bob */}
      <group ref={rod2Ref}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, L2, 16]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
        <mesh ref={bob2Ref} position={[L2, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </group>

      {points.length > 1 && <TrailLine points={points} />}
    </group>
  );
}

export default function DoublePendulumScene({ parameters, paused }) {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls />
      <DoublePendulum parameters={parameters} paused={paused} />
    </Canvas>
  );
}









