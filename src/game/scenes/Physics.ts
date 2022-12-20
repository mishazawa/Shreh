import { DoubleSide, Mesh, MeshBasicMaterial, MeshNormalMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry } from "three";
import { Globals } from "core/globals";
import { IOnDestroy, IOnInit } from "core/lifecycle";
import { Scene as ShrehScene } from "core/Scene";

import { Body, Plane, Sphere, Vec3, World } from 'cannon-es';

interface IComponent {
  id: string;
  update(): void;
  init(parent): void;
}

class GameObject {
  public components = {};

  constructor(private scene, private world) {}

  init() {
    Object.values(this.components).forEach((c: IComponent) => c.init(this));
  }

  update() {
    Object.values(this.components).forEach((c: IComponent) => c.update());
  }

  addComponent(c) {
    this.components[c.id] = c;
    return this;
  }

  getComponent(name) {
    return this.components[name];
  }
}

class Rigidbody implements IComponent {
  public id = 'Rigidbody';
  public body;
  public parent;

  constructor(params?) {
    this.body = new Body(params);
  }

  init (parent) {
    this.parent = parent;
    this.parent.world.addBody(this.body);
  }

  // update mesh
  update() {
    this.parent.components['MeshRenderer'].mesh.position.copy(this.body.position);
    this.parent.components['MeshRenderer'].mesh.quaternion.copy(this.body.quaternion);
  }

  position(...pos) {
    this.body.position.set(...pos);
  }

  rotationEuler(...angles) {
    this.body.quaternion.setFromEuler(...angles);
  }
}

class MeshRenderer implements IComponent {
  public id = 'MeshRenderer';
  public parent;
  public mesh;

  constructor(...args) {
    this.mesh = new Mesh(...args);
  }

  init (parent) {
    this.parent = parent;
    this.parent.scene.add(this.mesh);
  }

  update() {
  }
}


const RADIUS = .1;

let ball
export class Physics extends ShrehScene implements IOnInit, IOnDestroy {
  private world;
  private objects = [];
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
    this.camera.position.y = 5;

    this.world = new World({
      gravity: new Vec3(0, -9.82, 0), // m/s²
    })

    const mat = new MeshNormalMaterial({side: DoubleSide});

    const ground = new GameObject(this.scene, this.world);

    ground.addComponent(new MeshRenderer(new PlaneGeometry(10, 10), mat))
    .addComponent(new Rigidbody({type: Body.STATIC, shape: new Plane()}))
    .init();

    ground.getComponent('Rigidbody').rotationEuler(-Math.PI / 2, 0, 0);

    ball = new GameObject(this.scene, this.world);

    ball.addComponent(new MeshRenderer(new SphereGeometry(RADIUS), mat))
    .addComponent(new Rigidbody({mass: 5, shape: new Sphere(RADIUS)}))
    .init();

    ball.getComponent('Rigidbody').position(0, 10, 0);

    ground.update();

    this.objects.push(ground);
    this.objects.push(ball);
  }

  public override animate(delta: number) {
    this.world.fixedStep();
    ball.update();
  }


  public onInit () {
    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
