import { AmbientLight, BoxGeometry, DirectionalLight, Event, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { Globals }                  from "core/globals";
import { IOnDestroy, IOnInit }      from "core/lifecycle";
import { Scene as ShrehScene }      from "core/Scene";


import TEST_MODEL_URL from "assets/models/test_attrib.glb";
import { loadGltf } from "core/loaders";

let cube: Object3D<Event> | Mesh<BoxGeometry, MeshBasicMaterial>;
let light: DirectionalLight;
export class Intro extends ShrehScene implements IOnInit, IOnDestroy {

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
    cube.rotation.x += delta * .1;
    cube.rotation.y += delta * .5;
  }


  public async onInit () {

    const light = new HemisphereLight( 0xffffFF, 0x080820, 1 );;
    const alight = new AmbientLight(0xffffff, .25);
    cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({color: 0xffffff}));

    light.position.add(new Vector3(0, 5, 0))

    // light.target = new Object3D();

    // light.target.position.add(new Vector3(-5, 0, -5));

    this.scene.add(light);
    this.scene.add(alight);
    // this.scene.add(light.target);
    this.scene.add(cube);

    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}

    // try {

    //   const model = await loadGltf(TEST_MODEL_URL);
    //   const mesh = model['scene'].children[0];
    //   const fooExtension = mesh.userData;
    //   console.log(model['parser'])


    //   // model['parser'].getDependency('bufferView', 1 ).then(console.log);
    // } catch (e) {
    //   console.log(e)

    // }
