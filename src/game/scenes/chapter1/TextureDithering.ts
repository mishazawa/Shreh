import { PerspectiveCamera, Scene, TorusKnotGeometry, Mesh, MeshStandardMaterial, HemisphereLight} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Globals } from "core/globals";
import { IOnDestroy, IOnInit } from "core/lifecycle";
import { Scene as ShrehScene } from "core/Scene";

export class TextureDithering extends ShrehScene implements IOnInit, IOnDestroy {
 private controls;
 constructor () {
    super();

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      Globals.defaultCamera.fov,
      Globals.aspect,
      Globals.defaultCamera.near,
      Globals.defaultCamera.far
    );

    this.controls = new OrbitControls( this.camera, Globals.renderer.domElement );

    this.camera.position.z = 50;
  }

  public override animate(delta: number) {

  }


  public onInit () {

const geometry = new TorusKnotGeometry( 10, 3, 100, 16 );
const material = new MeshStandardMaterial( { color: 0xffff00 } );
const torusKnot = new Mesh( geometry, material );
this.scene.add( torusKnot );
const light = new HemisphereLight( 0xffffbb, 0x080820, 10 );
this.scene.add( light );


    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
