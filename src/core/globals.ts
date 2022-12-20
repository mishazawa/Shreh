import { WebGLRenderer } from "three";

const DEFAULT_CAMERA_NEAR = 0.1;
const DEFAULT_CAMERA_FAR  = 1000;
const DEFAULT_CAMERA_FOV  = 50;

export class Globals {
  public static DEBUG: boolean = false;

  public static renderer: WebGLRenderer;

  public static get dimensions() {
    return [window.innerWidth, window.innerHeight];
  }

  public static get aspect() {
    return window.innerWidth / window.innerHeight;
  }

  public static get defaultCamera() {
    return {
      fov:  DEFAULT_CAMERA_FOV,
      near: DEFAULT_CAMERA_NEAR,
      far:  DEFAULT_CAMERA_FAR,
    }
  }

}
