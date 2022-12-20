import "./types.d";

import "./style/index.scss";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Core as App } from "core";
import { Raymarching } from './game/scenes/chapter1/Raymarching';

import {init} from './game/shaders/raymarchingBalls';

const shreh = new App();

shreh.debug();

Promise.all([
  shreh.setScene(new Raymarching()),
]).then(async ([scene]) => {
  const sphere = (scene as Raymarching).isosphere;
  const shader = init(sphere);

  shreh.addPostFx(new ShaderPass(shader));
  shreh.animate();
})


