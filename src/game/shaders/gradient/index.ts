import {
  Color,
} from 'three';

import base from '../base/base.vert';
import gradient from './gradient.frag';

export default {
  uniforms: {
    'tDiffuse': { value: null },
    'color1': { value: new Color( 0xffffff ) },
    'color2': { value: new Color( 0xff00ff ) },
  },
  vertexShader: base,
  fragmentShader: gradient,

};
