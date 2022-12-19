import "./types.d";

import "./style/index.scss";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Core as App } from "core";
import { loadTexture } from 'core/loaders';
import { TextureDithering } from './game/scenes/chapter1/TextureDithering';
import {init}  from "./game/shaders/textureGradient";

import texture1 from 'assets/textures/1.png';
import texture2 from 'assets/textures/2.png';
import texture3 from 'assets/textures/3.png';

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const shreh = new App(canvas as HTMLCanvasElement);


shreh.setScene(new TextureDithering()).then(async (scene) => {

  const textures = await Promise.all([
    loadTexture(texture1),
    loadTexture(texture2),
    loadTexture(texture3),
  ]);
  const shader = init(textures);

  const effect1 = new ShaderPass(shader);

  shreh.addPostFx(effect1);
  shreh.animate();
})


