// src/DoublePendulumScene.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useDoublePendulumPhysics from './useDoublePendulumPhysics';

function DoublePendulum({ parameters }) {
  const {
    L1 = 2,
    L2 = 2,
    theta1: initialTheta1 = 0,
    theta2: initialTheta2 = 0,
  } = parameters || {};

  const { theta1, theta2 } = useDoublePendulumPhysics(initialTheta1, initialTheta2);
  
  const rod1Ref = useRef();
  const rod2Ref = useRef();
  
  useFrame(() => {
    if (rod1Ref.current) {
      rod1Ref.current.rotation.z = theta1;
    }
    if (rod2Ref.current) {
      rod2Ref.current.position.x = L1;
      rod2Ref.current.rotation.z = theta2;
    }
  });
  
  return (
    <group>
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
      <group ref={rod2Ref}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, L2, 16]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
        <mesh position={[L2, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </group>
    </group>
  );
}

export default function DoublePendulumScene({ parameters }) {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls />
      <DoublePendulum parameters={parameters} />
    </Canvas>
  );
}
