import path from 'path';

export const GENERATE_ACTION = 0;
export const SCENE_TYPE      = 1;

export const PARAMS_MAP = {
  'g': GENERATE_ACTION,
  'generate': GENERATE_ACTION,
  'gen': GENERATE_ACTION,
  's': SCENE_TYPE,
  'scene': SCENE_TYPE,
}

export const SCENE_DIR = 'src/game/scenes';

export const SCENE_TEMPLATE = path.resolve('.', 'utils/props', 'scene_template.ts');
export const SCENE_TEMPLATE_REPLACE_PATTERN = '%%%SCENE';

export default {
  GENERATE_ACTION,
  SCENE_TYPE,
  PARAMS_MAP,
  SCENE_DIR,
  SCENE_TEMPLATE,
  SCENE_TEMPLATE_REPLACE_PATTERN,
}
