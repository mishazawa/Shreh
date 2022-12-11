import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } from "three";
import { Globals } from "../../core/globals";
import { IOnDestroy, IOnInit } from "../../core/lifecycle";
import { Scene as ShrehScene } from "../../core/Scene";

export class TestScene extends ShrehScene implements IOnInit, IOnDestroy {

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
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    this.scene.add(cube);
  }

  public override animate(delta: number) {

  }


  public onInit () {
    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
