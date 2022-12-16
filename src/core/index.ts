import { Clock, WebGLRenderer } from "three";
import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { Globals } from "./globals";
import { IOnDestroy, IOnInit } from "./lifecycle";
import { Scene } from "./Scene";



type SceneLifecycle = Scene & IOnInit & IOnDestroy;

export class Core {
  private renderer: WebGLRenderer;
  private currentScene: SceneLifecycle | undefined;
  private clock: Clock;
  private frameId: number;
  private composer;
  private scenePass;

  public async setScene (s: SceneLifecycle) {
    await this.currentScene?.onDestroy();
    this.updateScene(s)
    this.updateCompositeStack();
    await this.currentScene.onInit();
  }

  constructor(domElement: HTMLCanvasElement | null) {
    if (domElement === null) {
      throw "no canvas provided";
    }

    this.clock = new Clock();
    this.init(domElement);
  }

  private init(canvas) {
    this.renderer = new WebGLRenderer({
      canvas,
    });

    const [w, h] = Globals.dimensions;

    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

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

  private updateCompositeStack() {
    this.composer.removePass(this.scenePass);

    const {scene, camera} = this.currentScene;
    this.scenePass = new RenderPass(scene, camera);

    this.composer.insertPass(this.scenePass, 0)
  }

  private updateScene (s: SceneLifecycle) {
    this.currentScene = s;
  }
}
