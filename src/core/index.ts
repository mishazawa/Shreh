import { ACESFilmicToneMapping, Clock, PCFSoftShadowMap, WebGLRenderer } from "three";
import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { Globals } from "./globals";
import { IOnDestroy, IOnInit } from "./lifecycle";
import { Scene } from "./Scene";

// debug
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';


type SceneLifecycle = Scene & IOnInit & IOnDestroy;

export class Core {
  private renderer: WebGLRenderer;
  private currentScene: SceneLifecycle | undefined;
  private clock: Clock;
  private frameId: number;
  private composer;
  private scenePass;

  private stats;
  private controls;

  public async setScene (s: SceneLifecycle) {
    await this.currentScene?.onDestroy();
    this.updateScene(s)
    this.updateCompositeStack();
    await this.currentScene.onInit();
    return this.currentScene;
  }

  constructor() {
    this.clock = new Clock();
    this.init();
  }

  private init() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    this.renderer = new WebGLRenderer({
      canvas,
    });

    const [w, h] = Globals.dimensions;

    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.physicallyCorrectLights = true;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap

    Globals.renderer = this.renderer; // idk

    this.composer = new EffectComposer(this.renderer);
  }

  public animate() {
    this.frameId = window.requestAnimationFrame(() => this.animate());

    try {
      if (this.currentScene) {
        const delta = this.clock.getDelta();
        this.currentScene.animate(delta);
        this.composer.render();
        this.stats?.update();
        this.controls?.update();
      }
    } catch (e) {
      cancelAnimationFrame(this.frameId);
      console.error(e);
      return;
    }
  }

  public addPostFx (pass: Pass) {
    this.composer.addPass(pass);
  }

  public debug() {
    Globals.DEBUG = true;
    this.stats = Stats();

    const container = document.createElement('div');

    document.body.appendChild(container);
    container.appendChild( this.stats.dom );
  }

  private updateCompositeStack() {
    this.composer.removePass(this.scenePass);

    const {scene, camera} = this.currentScene;
    this.scenePass = new RenderPass(scene, camera);

    this.composer.insertPass(this.scenePass, 0)
  }

  private updateScene (s: SceneLifecycle) {
    this.currentScene = s;

    if (Globals.DEBUG) {
      this.controls = new OrbitControls( this.currentScene.camera, Globals.renderer.domElement );
    }

  }
}
