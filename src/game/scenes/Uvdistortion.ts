import { AnimationClip, AnimationMixer, Color, Group, Mesh, MeshBasicMaterial, Object3D, PerspectiveCamera, Scene, ShaderMaterial } from "three";
import { Globals } from "core/globals";
import { IOnDestroy, IOnInit } from "core/lifecycle";
import { Scene as ShrehScene } from "core/Scene";
import { loadGltf, loadTexture } from "core/loaders";

import FRACTURE from 'assets/models/uv_dist.glb';
import TEXTURE from 'assets/textures/4.png';
import shaderprops from 'game/shaders/uvdistortion';
import { createAnimations } from "core/utils";

let mesh;
let mixer;

export class Uvdistortion extends ShrehScene implements IOnInit, IOnDestroy {
  constructor () {
    super();

    this.scene = new Scene();
    this.scene.background = new Color(0xFFFFFF);
    this.camera = new PerspectiveCamera(
      Globals.defaultCamera.fov,
      Globals.aspect,
      Globals.defaultCamera.near,
      Globals.defaultCamera.far
    );

    this.camera.position.y = .25;
    this.camera.position.z = 3;
  }

  public override animate(delta: number) {
    if (mesh) {
      mesh.material.uniforms.iTime.value += delta;
    }
    mixer?.update(delta);
  }


  public onInit () {
    Promise.all([
      loadGltf(FRACTURE),
      loadTexture(TEXTURE),
    ]).then(([model, texture]) => {
      shaderprops.uniforms.tDiffuse.value = texture;
      const material = new ShaderMaterial(shaderprops);
      material.onBeforeCompile = (shader, renderer) => {
        shader.vertexShader = `varying vec2 vUv; ${shader.vertexShader.replace('}', 'vUv = uv;}')}`;
      }

      const {animations, scene} = model as any;

      mesh = scene['children'][0];

      mesh.material = material;

      // scene.rotateX(Math.PI/2);

      this.scene.add(scene);

      const currentClip = AnimationClip.findByName(animations, "rotate");
      mixer = new AnimationMixer(scene);

      mixer.clipAction(currentClip).timeScale = .05;
      mixer.clipAction(currentClip).reset().play();
    })
    return Promise.resolve()
  }

  public onDestroy () {
    return Promise.resolve()
  }
}
