// src/physics.js
export function derivatives(state, params) {
    const { theta1, theta2, omega1, omega2 } = state;
    const { L1, L2, m1, m2, g } = params;
    
    const delta = theta2 - theta1;
    const denominator1 = (m1 + m2) * L1 - m2 * L1 * Math.cos(delta) * Math.cos(delta);
    const denominator2 = (L2 / L1) * denominator1;
    
    const domega1 = (m2 * L1 * omega1 * omega1 * Math.sin(delta) * Math.cos(delta) +
                      m2 * g * Math.sin(theta2) * Math.cos(delta) +
                      m2 * L2 * omega2 * omega2 * Math.sin(delta) -
                      (m1 + m2) * g * Math.sin(theta1)) / denominator1;
    
    const domega2 = (-m2 * L2 * omega2 * omega2 * Math.sin(delta) * Math.cos(delta) +
                      (m1 + m2) * (g * Math.sin(theta1) * Math.cos(delta) -
                      L1 * omega1 * omega1 * Math.sin(delta) -
                      g * Math.sin(theta2))) / denominator2;
    
    return {
      dtheta1: omega1,
      dtheta2: omega2,
      domega1,
      domega2,
    };
  }
  
  export function rk4(state, dt, params) {
    const k1 = derivatives(state, params);
    
    const state2 = {
      theta1: state.theta1 + k1.dtheta1 * dt / 2,
      theta2: state.theta2 + k1.dtheta2 * dt / 2,
      omega1: state.omega1 + k1.domega1 * dt / 2,
      omega2: state.omega2 + k1.domega2 * dt / 2,
    };
    const k2 = derivatives(state2, params);
    
    const state3 = {
      theta1: state.theta1 + k2.dtheta1 * dt / 2,
      theta2: state.theta2 + k2.dtheta2 * dt / 2,
      omega1: state.omega1 + k2.domega1 * dt / 2,
      omega2: state.omega2 + k2.domega2 * dt / 2,
    };
    const k3 = derivatives(state3, params);
    
    const state4 = {
      theta1: state.theta1 + k3.dtheta1 * dt,
      theta2: state.theta2 + k3.dtheta2 * dt,
      omega1: state.omega1 + k3.domega1 * dt,
      omega2: state.omega2 + k3.domega2 * dt,
    };
    const k4 = derivatives(state4, params);
    
    return {
      theta1: state.theta1 + dt * (k1.dtheta1 + 2 * k2.dtheta1 + 2 * k3.dtheta1 + k4.dtheta1) / 6,
      theta2: state.theta2 + dt * (k1.dtheta2 + 2 * k2.dtheta2 + 2 * k3.dtheta2 + k4.dtheta2) / 6,
      omega1: state.omega1 + dt * (k1.domega1 + 2 * k2.domega1 + 2 * k3.domega1 + k4.domega1) / 6,
      omega2: state.omega2 + dt * (k1.domega2 + 2 * k2.domega2 + 2 * k3.domega2 + k4.domega2) / 6,
    };
  }
  