import vertexShader   from './raymarchingBalls.vert';
import fragmentShader from './raymarchingBalls.frag';
import { BufferGeometry, Vector3 } from 'three';

const body = {
  uniforms: {
    tDiffuse: { value: null },
    camera: { value: new Vector3(0, 0, -10) },
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
    SPHERE_SIZE: .1,
  },
  vertexShader,
  fragmentShader,
};

export default body;

export function init (mesh: BufferGeometry) {
  const shader = Object.assign({}, body);
  const pos = mesh.getAttribute('position');

  const values = fromBufferAttrib(pos);
  shader.uniforms.objects.value = values;
  shader.defines.NUM_OBJECTS = values.length;
  console.log(shader)
  return shader;
}

function fromBufferAttrib(pos) {
  const p = [];
  for (let i = 0; i < pos.count; i += pos.itemSize) {
    p.push(new Vector3().fromBufferAttribute(pos, i));
  }
  return p;
}
