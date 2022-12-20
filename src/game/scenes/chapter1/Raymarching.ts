import { BoxGeometry, IcosahedronGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } from "three";
import { Globals } from "core/globals";
import { IOnDestroy, IOnInit } from "core/lifecycle";
import { Scene as ShrehScene } from "core/Scene";


export class Raymarching extends ShrehScene implements IOnInit, IOnDestroy {
  public isosphere;
  constructor () {
    super();

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      Globals.defaultCamera.fov,
      Globals.aspect,
      Globals.defaultCamera.near,
      Globals.defaultCamera.far
    );

    this.camera.position.z = 5;
  }

  public override animate(delta: number) {
  }


  public onInit () {
    this.isosphere = new BoxGeometry();
    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
