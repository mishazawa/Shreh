import { Clock, WebGLRenderer } from "three";
import { Globals } from "./globals";
import { IOnDestroy, IOnInit } from "./lifecycle";
import { Scene } from "./Scene";

type SceneLifecycle = Scene & IOnInit & IOnDestroy;

export class Core {
  private renderer: WebGLRenderer;
  private currentScene: SceneLifecycle | undefined;
  private clock: Clock;


  public async setScene (s: SceneLifecycle) {
    await this.currentScene?.onDestroy();

    this.currentScene = s;
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

    Globals.renderer = this.renderer; // idk
  }

  public animate() {
    window.requestAnimationFrame(() => this.animate());

    if (this.currentScene) {
      const delta = this.clock.getDelta();
      this.currentScene.animate(delta);
      const {scene, camera} = this.currentScene;
      this.renderer.render(scene, camera);
    }
  }

}
