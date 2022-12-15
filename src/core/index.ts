import { Clock, WebGLRenderer } from "three";
import { Globals } from "./globals";
import { IOnDestroy, IOnInit } from "./lifecycle";
import { Scene } from "./Scene";

type SceneLifecycle = Scene & IOnInit & IOnDestroy;

export class Core {
  private renderer: WebGLRenderer;
  private currentScene: SceneLifecycle | undefined;
  private clock: Clock;
  private frameId: number;

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
    this.renderer.setPixelRatio(window.devicePixelRatio);

    Globals.renderer = this.renderer; // idk
  }

  public animate() {
    this.frameId = window.requestAnimationFrame(() => this.animate());

    try {
      if (this.currentScene) {
        const delta = this.clock.getDelta();
        this.currentScene.animate(delta);
        const {scene, camera} = this.currentScene;
        this.renderer.render(scene, camera);
      }
    } catch (e) {
      cancelAnimationFrame(this.frameId);
      console.error(e);
      return;
    }
  }

}
