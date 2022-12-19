import "./types.d";

import "./style/index.scss";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Core as App } from "core";
import { loadTexture } from 'core/loaders';
import { TextureDithering } from './game/scenes/chapter1/TextureDithering';
import GradientShader  from "./game/shaders/textureGradient";

import texture1 from 'assets/textures/1.png';
import texture2 from 'assets/textures/2.png';
import texture3 from 'assets/textures/3.png';

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const shreh = new App(canvas as HTMLCanvasElement);


shreh.setScene(new TextureDithering()).then(async (scene) => {
  const shader = Object.assign({}, GradientShader);

  const textures = await Promise.all([
    loadTexture(texture1),
    loadTexture(texture2),
    loadTexture(texture3),
  ]);
  shader.uniforms.gradations.value = textures;
  shader.defines.DIM = textures.length;
  shader.fragmentShader = GradientShader.fragmentShader.replace("???REPLACE", genShaderCode(textures))

  const effect1 = new ShaderPass( shader );



  shreh.addPostFx(effect1);
  shreh.animate();
})

function genShaderCode(txt) {
  return txt.map((_, i) => {
    return `
      if (index == ${i}) {
        return texture2D(gradations[${i}], uv);
      }
    `;
  }).join("\n")

}
