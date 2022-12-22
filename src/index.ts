import "./types.d";

import "./style/index.scss";

import { Core as App } from "core";
import { Uvdistortion } from "game/scenes/Uvdistortion";

const shreh = new App();

// shreh.debug();

Promise.all([
  shreh.setScene(new Uvdistortion()),
]).then(async ([scene]) => {
  shreh.animate();
})


