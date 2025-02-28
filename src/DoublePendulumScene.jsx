// src/DoublePendulumScene.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
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
  const bob1Ref = useRef(); 
  const [dragging, setDragging] = useState(false);
  const { camera, gl, scene } = useThree();
  const bindDrag = useDrag(({ offset: [x, y], first, last }) => {
    if (first) {
      setDragging(true);
    }
    if (last) {
      setDragging(false);
      const newTheta1 = Math.atan2(y, x);
      if (onAngleUpdate) {
      onAngleUpdate(newTheta1);
    }
   }
  }, { pointerEvents: true, from: () => [0, 0] });

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
      {/* Erstes Pendel: Stab und Kugel */}
      <group ref={rod1Ref}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, L1, 16]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        {/* Der Bob wird jetzt dragable gemacht */}
        <mesh
          ref={bob1Ref}
          position={[L1, 0, 0]}
          {...bindDrag()} // Hier werden die Drag-Events angehängt
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={Math.abs(Math.sin(theta1))} />
        </mesh>
      </group>
      
      {/* Zweites Pendel, angehängt an das erste */}
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






