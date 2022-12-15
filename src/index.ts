import "./types.d";
import { Core as App } from "core";

import { Intro } from './game/scenes/chapter1/Intro';


const canvas = document.querySelector("canvas.screen");

const shreh = new App(canvas as HTMLCanvasElement);

shreh.setScene(new Intro()).then(() => {
  shreh.animate();
})

