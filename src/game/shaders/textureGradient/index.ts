import base from '../base/base.vert';
import gradient from './gradient.frag';

import texture1 from 'assets/textures/1.png';
import texture2 from 'assets/textures/2.png';
import texture3 from 'assets/textures/3.png';
import { loadTexture } from 'core/loaders';

const body = {
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

export default body;

function genShaderCode(txt) {
  return txt.map((_, i) => {
    return `
      if (index == ${i}) {
        return texture2D(gradations[${i}], uv);
      }
    `;
  }).join("\n")

}

export async function init () {
  const textures = await Promise.all([
    loadTexture(texture1),
    loadTexture(texture2),
    loadTexture(texture3),
  ]);
  const shader = Object.assign({}, body)
  shader.uniforms.gradations.value = textures;
  shader.defines.DIM = textures.length;
  shader.fragmentShader = body.fragmentShader.replace("???REPLACE", genShaderCode(textures))

  return shader;
}
