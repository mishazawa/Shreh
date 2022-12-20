import "./types.d";

import "./style/index.scss";

import { Core as App } from "core";
import { Physics } from './game/scenes/Physics';

const shreh = new App();

shreh.debug();

Promise.all([
  shreh.setScene(new Physics()),
]).then(async ([scene]) => {

  shreh.animate();
})


