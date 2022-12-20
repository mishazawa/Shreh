import path from 'path';

export const GENERATE_ACTION = 0;
export const SCENE_TYPE      = 1;
export const SHADER_TYPE     = 2;

export const PARAMS_MAP = {
  'g':        GENERATE_ACTION,
  'generate': GENERATE_ACTION,
  'gen':      GENERATE_ACTION,
  's':        SCENE_TYPE,
  'scene':    SCENE_TYPE,
  'shader':   SHADER_TYPE,
  'sh':       SHADER_TYPE,
  'vert':     SHADER_TYPE,
  'frag':     SHADER_TYPE,
  'pp':       SHADER_TYPE,
  'fx':       SHADER_TYPE,
}

export const SCENE_DIR = 'src/game/scenes';
export const SHADER_DIR = 'src/game/shaders';

// paths
export const SCENE_TEMPLATE = path.resolve('.', 'utils/props', 'scene_template.ts');

export const SHADER_TEMPLATE = path.resolve('.', 'utils/props', 'shader_template.ts');
export const SHADER_FRAG_TEMPLATE = path.resolve('.', 'utils/props', 'frag_template');
export const SHADER_VERT_TEMPLATE = path.resolve('.', 'utils/props', 'vert_template');

// patterns to replace
export const SCENE_TEMPLATE_REPLACE_PATTERN  = '%%%SCENE';
export const SHADER_TEMPLATE_REPLACE_PATTERN = '%%%SHADER_NAME';

export default {
  GENERATE_ACTION,
  SCENE_TYPE,
  PARAMS_MAP,
  SCENE_DIR,
  SHADER_DIR,
  SCENE_TEMPLATE,
  SCENE_TEMPLATE_REPLACE_PATTERN,
  SHADER_TEMPLATE,
  SHADER_FRAG_TEMPLATE,
  SHADER_VERT_TEMPLATE,
  SHADER_TEMPLATE_REPLACE_PATTERN,
}
