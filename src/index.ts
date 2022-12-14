import "./types.d";
import { Core as App } from "./core";
import { TestScene } from "./game/scenes/test";
import { TestSwapScene } from "./game/scenes/testswap";
import { BallExampleScene } from "./game/scenes/ballexample";

const canvas = document.querySelector("canvas.screen");

const shreh = new App(canvas as HTMLCanvasElement);

shreh.setScene(new BallExampleScene());

shreh.animate();

// setTimeout(() => {
//   shreh.setScene(new TestSwapScene());
// }, 5000)
