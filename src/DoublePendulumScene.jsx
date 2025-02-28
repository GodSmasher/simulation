// src/DoublePendulumScene.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


function useDoublePendulumPhysics() {
  const [theta1, setTheta1] = useState(0);
  const [theta2, setTheta2] = useState(0);
  
  useFrame(() => {
    setTheta1(prev => prev + 0.01);
    setTheta2(prev => prev + 0.015);
  });
  
  return { theta1, theta2 };
}

function DoublePendulum() {
  const { theta1, theta2 } = useDoublePendulumPhysics();
  

  const L1 = 2;
  const L2 = 2;

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
      {/* Erstes Pendel: Stab und Kugel */}
      <group ref={rod1Ref}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, L1, 16]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        {/* Kugel am Ende */}
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
        <mesh position={[L2, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="limegreen" />
        </mesh>
      </group>
    </group>
  );
}

export default function DoublePendulumScene() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls />
      <DoublePendulum />
    </Canvas>
  );
}
