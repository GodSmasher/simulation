// src/useDoublePendulumPhysics.js
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { rk4 } from './physics';

export default function useDoublePendulumPhysics(initialTheta1 = 0, initialTheta2 = 0, paused = false, extraParams = {}) {
  const dt = 0.02;
  const simulationSpeed = extraParams.simulationSpeed || 1;
  const params = {
    L1: extraParams.L1 || 2,
    L2: extraParams.L2 || 2,
    m1: extraParams.m1 || 1,
    m2: extraParams.m2 || 1,
    g: 9.81,
    damping: extraParams.damping || 0,
  };

  const [state, setState] = useState({
    theta1: initialTheta1,
    theta2: initialTheta2,
    omega1: 0,
    omega2: 0,
  });

  useFrame(() => {
    if (!paused) {
      setState(prevState => rk4(prevState, dt * simulationSpeed, params));
    }
  });

  return state;
}


