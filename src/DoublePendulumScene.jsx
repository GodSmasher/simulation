
// src/DoublePendulumScene.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import useDoublePendulumPhysics from './useDoublePendulumPhysics'; 

function DoublePendulum({ parameters, onAngleUpdate }) {
  const {
    L1 = 2,
    L2 = 2,
    theta1: initialTheta1 = 0,
    theta2: initialTheta2 = 0,
  } = parameters || {};

  const { theta1, theta2 } = useDoublePendulumPhysics(initialTheta1, initialTheta2);

  const rod1Ref = useRef();
  const rod2Ref = useRef();
  const bob2Ref = useRef();

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
      setPoints(prevPoints => {
        const newPoints = [...prevPoints, pos.toArray()];
        if (newPoints.length > 100) newPoints.shift();
        return newPoints;
      });
    }
  });

  return (
    <group>
      {/* Erstes Pendel: Stab und Kugel */}
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
      
      {/* Zweites Pendel, angehängt an das erste */}
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
      
      {/* Trail-Linie */}
      {points.length > 1 && (
        <Line
          points={points} // Array von 3D-Punkten
          color="white"
          lineWidth={1}
          transparent
          opacity={0.7}
        />
      )}
    </group>
  );
}

export default function DoublePendulumScene({ parameters, onAngleUpdate }) {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls />
      <DoublePendulum parameters={parameters} onAngleUpdate={onAngleUpdate} />
    </Canvas>
  );
}






