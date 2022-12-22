// import vertexShader   from './uvdistortion.vert';
import fragmentShader from './uvdistortion.frag';
import { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk';

const body = {
  uniforms: {
    tDiffuse: { value: null },
    iTime: { value: 0 },
  },
  defines: {},
  vertexShader: ShaderChunk.meshbasic_vert,
  fragmentShader,
};

export default body;

