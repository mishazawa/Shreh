import vertexShader   from './raymarchingBalls.vert';
import fragmentShader from './raymarchingBalls.frag';
import { Vector3 } from 'three';

const body = {
  uniforms: {
    tDiffuse: { value: null },
    camera: { value: new Vector3(0, 1, 0) },
    objects: {
      value: [
        new Vector3(0, 1, 70),
        new Vector3(1, 1, 50),
        new Vector3(-1, 1, 40),
        new Vector3(0, -1, 30),
      ],
    }
  },
  defines: {
    MAX_STEPS: 100,
    MAX_DIST: 99.99,
    SURF_DIST: .01,
    NUM_OBJECTS: 4,
  },
  vertexShader,
  fragmentShader,
};

export default body;
