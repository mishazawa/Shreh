import { AnimationMixer } from "three";

export const createAnimations = (model) => {

  const mixer= new AnimationMixer(model);

  const actions = {};

  model.animations.forEach((a) => {
    actions[a.name] = mixer.clipAction(a);
  });

  return {model, mixer, actions};
}
