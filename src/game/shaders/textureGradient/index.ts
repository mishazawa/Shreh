import base from '../base/base.vert';
import gradient from './gradient.frag';

export default {
  uniforms: {
    tDiffuse: { value: null },
    gradations: {
      value: []
    }
  },
  defines: {
    DIM: 0,
  },
  vertexShader: base,
  fragmentShader: gradient,
};
