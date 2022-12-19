import base from '../base/base.vert';
import gradient from './gradient.frag';

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

export function init (t) {
  const shader = Object.assign({}, body)
  shader.uniforms.gradations.value = t;
  shader.defines.DIM = t.length;
  shader.fragmentShader = body.fragmentShader.replace("???REPLACE", genShaderCode(t))

  return shader;
}
