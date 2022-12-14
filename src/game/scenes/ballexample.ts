import { AnimationClip, AnimationMixer, Color, DirectionalLight, Mesh, MeshPhongMaterial, Object3D, PerspectiveCamera, Scene } from "three";
import { Globals } from "../../core/globals";
import { IOnDestroy, IOnInit } from "../../core/lifecycle";
import { Scene as ShrehScene } from "../../core/Scene";

import { loadGltf } from "../../core/loaders";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import URL_MODEL from "../../assets/models/ball.glb";

export class BallExampleScene extends ShrehScene implements IOnInit, IOnDestroy {
  private controls;

  private action;
  private mixer;

  constructor () {
    super();

    this.scene = new Scene();
    this.scene.background = new Color(0xAAAAAA);

    this.camera = new PerspectiveCamera(
      Globals.defaultCamera.fov,
      Globals.aspect,
      Globals.defaultCamera.near,
      Globals.defaultCamera.far
    );
    this.camera.position.z = 5;

    const light = new DirectionalLight(0xFFFFFF, 1);
    this.scene.add(light);

    this.controls = new OrbitControls(this.camera, Globals.renderer.domElement);

  }

  public override animate(delta: number) {
    this.controls.update();
    this.mixer?.update(delta);
  }


  public async onInit () {
    // load model
    const model = await loadGltf(URL_MODEL) as Object3D;

    // extract mesh from glb (it can be array of meshes or tree)
    const mesh = model['scene'] as Mesh;

    mesh.material = new MeshPhongMaterial({color: 0xAABBCC});

    // f.e. extract clip by name
    // model.animations -> Array<THREE.AnimationClip>
    // https://threejs.org/docs/#api/en/animation/AnimationClip
    const currentClip = AnimationClip.findByName(model.animations, "ExampleAnimation");

    // attach mesh to animation
    // https://threejs.org/docs/#api/en/animation/AnimationMixer
    this.mixer = new AnimationMixer(mesh);

    // get reference for clip to use his methods
    // https://threejs.org/docs/#api/en/animation/AnimationMixer.clipAction
    this.action = this.mixer.clipAction(currentClip);

    // add mesh to scene
    this.scene.add(mesh);

    this.action.reset().play();

    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
