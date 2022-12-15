const fs   = require('fs/promises');
const path = require('path');

const GENERATE_ACTION = 0;
const SCENE_TYPE      = 1;

const PARAMS_MAP = {
  'g': GENERATE_ACTION,
  'generate': GENERATE_ACTION,
  'gen': GENERATE_ACTION,
  's': SCENE_TYPE,
  'scene': SCENE_TYPE,
}

const SCENE_DIR = 'src/game/scenes';

const SCENE_TEMPLATE = path.resolve('.', 'utils/props', 'scene_template.ts');
const SCENE_TEMPLATE_REPLACE_PATTERN = '%%%SCENE';


function cli (args) {
  const params = args.slice(2);

  const [a, t] = params;

  const action = PARAMS_MAP[a];
  const type   = PARAMS_MAP[t];

  if (action === undefined) return console.error(`Unknown action "${a}"`);
  if (type === undefined)   return console.error(`Unknown type "${t}"`);

  if (action === GENERATE_ACTION) return generate(type, ...params.slice(2))
}

function generate (type, ...args) {
  if (type === SCENE_TYPE) generateScene(...args);
}

function generateScene (dest) {
  const {dir, name} = path.parse(dest);

  const className = `${name.slice(0, 1)[0].toUpperCase()}${name.slice(1)}`
  const destination = path.resolve('.', SCENE_DIR, dir);

  writeSceneTemplate(destination, className);
}

async function writeSceneTemplate (destination, name) {
  const dest = path.resolve(destination, `${name}.ts`);
  // check is file exists
  try {
    await fs.access(dest)
    console.log(`${name}.ts scene already exists. Aborting.`);
  } catch {
    await fs.mkdir(destination)
    const content = await fs.readFile(SCENE_TEMPLATE, { encoding: 'utf8' });
    const renamed = content.replace(SCENE_TEMPLATE_REPLACE_PATTERN, name);
    await fs.writeFile(dest, renamed)
    console.log(`Done. Created scene ${name}.ts at ${destination}`);
  }
}

cli(process.argv);
