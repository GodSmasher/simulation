// src/useDoublePendulumPhysics.js
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { rk4 } from './physics';

export default function useDoublePendulumPhysics(initialTheta1 = 0, initialTheta2 = 0) {
  const dt = 0.02;
  const params = {
    L1: 2,
    L2: 2,
    m1: 1,
    m2: 1,
    g: 9.81,
  };

  const [state, setState] = useState({
    theta1: initialTheta1,
    theta2: initialTheta2,
    omega1: 0,
    omega2: 0,
  });
  
  useFrame(() => {
    setState(prevState => rk4(prevState, dt, params));
  });
  
  return { theta1: state.theta1, theta2: state.theta2 };
}
