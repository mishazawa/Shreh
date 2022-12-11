import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } from "three";
import { Globals } from "../../core/globals";
import { IOnDestroy, IOnInit } from "../../core/lifecycle";
import { Scene as ShrehScene } from "../../core/Scene";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class TestSwapScene extends ShrehScene implements IOnInit, IOnDestroy {
  private controls;

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

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xff00ff });
    const cube = new Mesh(geometry, material);
    this.controls = new OrbitControls(this.camera, Globals.renderer.domElement);
    this.scene.add(cube);
  }

  public override animate(delta: number) {
    this.controls.update();
  }


  public onInit () {
    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
