import { Camera, Scene as TScene } from "three";

export abstract class Scene {
  public scene: TScene;
  public camera: Camera;

  public abstract animate (delta: number);
}
