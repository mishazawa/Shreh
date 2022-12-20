import "./types.d";

import "./style/index.scss";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Core as App } from "core";
import { Raymarching } from './game/scenes/chapter1/Raymarching';

import RaymarchingShader from './game/shaders/raymarchingBalls';

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const shreh = new App(canvas as HTMLCanvasElement);

Promise.all([
  shreh.setScene(new Raymarching()),
]).then(async ([scene]) => {
  shreh.addPostFx(new ShaderPass(RaymarchingShader));
  shreh.animate();
})


