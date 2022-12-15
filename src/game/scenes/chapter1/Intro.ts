import { AmbientLight, BoxGeometry, BufferGeometry, Color, DirectionalLight, DynamicDrawUsage, HemisphereLight, IcosahedronGeometry, InstancedMesh, Matrix4, Mesh, MeshDepthMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, Points, PointsMaterial, RectAreaLight, Scene, SphereGeometry, Vector3 } from "three";
import { Globals } from "core/globals";
import { IOnDestroy, IOnInit } from "core/lifecycle";
import { Scene as ShrehScene } from "core/Scene";

import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadTexture } from "core/loaders";

import matcapTexture from "assets/textures/matcap-porcelain-white.jpg";

let positions;
let normals;
let elapsed = 0;
let freq = .1;
let amp = 3;

export class Intro extends ShrehScene implements IOnInit, IOnDestroy {
  private base;
  private mesh;

  private controls;

  constructor () {
    super();

    this.scene = new Scene();
    this.scene.background = new Color(0xffffff);

    this.camera = new PerspectiveCamera(
      Globals.defaultCamera.fov,
      Globals.aspect,
      Globals.defaultCamera.near,
      Globals.defaultCamera.far
    );

    this.camera.position.z = 5;
    this.controls = new OrbitControls(this.camera, Globals.renderer.domElement);
  }

  public override animate(delta: number) {
    this.controls.update();
    this.updateInstances(delta);
  }

  public onInit () {
    const light = new DirectionalLight( 0xffffff, .6 );
    // this.scene.add(light);

    const width = 20;
    const height = 20;
    const intensity = 15;
    const rectLight = new RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight.position.set( 25, 25, 25 );
    rectLight.lookAt( 0, 0, 0 );

    this.scene.add( rectLight )

    this.scene.add(new AmbientLight( 0xfc7f03, 1 ));
    light.position.set( 0, 2, 0 );

    const target = new Object3D();
    target.position.add(new Vector3(-5, 0, -5));

    light.target = target;

    this.scene.add(target);

    // tut

    const sphere   = new SphereGeometry(1);
    const material = new MeshStandardMaterial( {
      color: 0xfc7f03,
      roughness: 0,
      // matcap: loadTexture(matcapTexture)
    } );

    const geo = icosphere(15, 3);

    positions = geo.points;
    normals   = geo.normals;

    this.mesh = new InstancedMesh(sphere, material, positions.length);
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.scene.add(this.mesh);

    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }

  private updateInstances (delta) {
    elapsed += delta;
    const matrix = new Matrix4();

    for (let i = 0; i < positions.length; i++) {
      const dist = amp * noise(freq * (i + elapsed)) * noise(freq * (i + elapsed + 123));

      const p = positions[i].clone();
      const n = normals[i].clone();
      const v = p.add(n.multiplyScalar(dist));

      matrix.setPosition(v);

      this.mesh.setMatrixAt(i, matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }
}


const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

let perlin_octaves = 4; // default to medium smooth
let perlin_amp_falloff = 0.5; // 50% reduction/octave

const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));

let perlin;

function noise (x, y = 0, z = 0) {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;

  let r = 0;
  let ampl = 0.5;

  let n1, n2, n3;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
};

function icosphere (scale = 1, order = 0) {
  // set up a 20-triangle icosahedron
  const f = (1 + Math.pow(5, 0.5)) / 2;
  const T = Math.pow(4, order);

  const vertices = new Float32Array((10 * T + 2) * 3);
  vertices.set(Float32Array.of(
    -1, f, 0, 1, f, 0, -1, -f, 0, 1, -f, 0,
    0, -1, f, 0, 1, f, 0, -1, -f, 0, 1, -f,
    f, 0, -1, f, 0, 1, -f, 0, -1, -f, 0, 1));

  let triangles = Uint32Array.of(
    0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
    11, 10, 2, 5, 11, 4, 1, 5, 9, 7, 1, 8, 10, 7, 6,
    3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
    9, 8, 1, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7);

  let v = 12;
  const midCache = order ? new Map() : null; // midpoint vertices cache to avoid duplicating shared vertices

  function addMidPoint(a, b) {
    const key = Math.floor((a + b) * (a + b + 1) / 2) + Math.min(a, b); // Cantor's pairing function
    let i = midCache.get(key);
    if (i !== undefined) { midCache.delete(key); return i; }
    midCache.set(key, v);
    for (let k = 0; k < 3; k++) vertices[3 * v + k] = (vertices[3 * a + k] + vertices[3 * b + k]) / 2;
    i = v++;
    return i;
  }

  let trianglesPrev = triangles;
  for (let i = 0; i < order; i++) {
    // subdivide each triangle into 4 triangles
    triangles = new Uint32Array(trianglesPrev.length * 4);
    for (let k = 0; k < trianglesPrev.length; k += 3) {
      const v1 = trianglesPrev[k + 0];
      const v2 = trianglesPrev[k + 1];
      const v3 = trianglesPrev[k + 2];
      const a = addMidPoint(v1, v2);
      const b = addMidPoint(v2, v3);
      const c = addMidPoint(v3, v1);
      let t = k * 4;
      triangles[t++] = v1; triangles[t++] = a; triangles[t++] = c;
      triangles[t++] = v2; triangles[t++] = b; triangles[t++] = a;
      triangles[t++] = v3; triangles[t++] = c; triangles[t++] = b;
      triangles[t++] = a;  triangles[t++] = b; triangles[t++] = c;
    }
    trianglesPrev = triangles;
  }

  // normalize vertices
  for (let i = 0; i < vertices.length; i += 3) {
    const h = Math.hypot(vertices[i + 0], vertices[i + 1], vertices[i + 2])
    const m = h === 0 ? 0 : 1/h;
    vertices[i + 0] *= m;
    vertices[i + 1] *= m;
    vertices[i + 2] *= m;
  }

  const points = [];
  const normals = [];
  for (let i = 0; i < vertices.length; i += 3) {

    const pos = new Vector3(vertices[i + 0], vertices[i + 1], vertices[i + 2]);
    const norm = pos.clone();

    points.push(pos.multiplyScalar(scale));
    normals.push(norm.normalize().negate());
  }

  return {points, normals};
}
