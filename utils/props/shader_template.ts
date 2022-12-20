import vertexShader   from './%%%SHADER_NAME.vert';
import fragmentShader from './%%%SHADER_NAME.frag';

const body = {
  uniforms: {
    tDiffuse: { value: null },
  },
  defines: {},
  vertexShader,
  fragmentShader,
};

export default body;
