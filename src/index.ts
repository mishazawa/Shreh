import "./types.d";

import "./style/index.scss";

import { Core as App } from "core";
import {Intro} from './game/scenes/chapter1/Intro';
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import GradientOverlayShader  from "./game/shaders/gradient";
import { Color } from "three";

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const shreh = new App(canvas as HTMLCanvasElement);

const effect1 = new ShaderPass( GradientOverlayShader );
effect1.uniforms[ 'color2' ].value = new Color (0xFF6A1A) ;
effect1.uniforms[ 'color1' ].value = new Color (0xF8421A);


shreh.addPostFx(effect1);

shreh.setScene(new Intro()).then(() => {
  shreh.animate();
})

