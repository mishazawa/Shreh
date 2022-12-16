import "./types.d";

import "./style/index.scss";

import { Core as App } from "core";


const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const shreh = new App(canvas as HTMLCanvasElement);

// shreh.setScene(new Intro()).then(() => {
//   shreh.animate();
// })

