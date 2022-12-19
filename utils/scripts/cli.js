import fs from 'fs/promises';
import path from 'path';

import constants from './constants.js';

function cli (args) {
  const params = args.slice(2);

  const [a, t] = params;

  const action = constants.PARAMS_MAP[a];
  const type   = constants.PARAMS_MAP[t];

  if (action === undefined) return console.error(`Unknown action "${a}"`);
  if (type === undefined)   return console.error(`Unknown type "${t}"`);

  if (action === constants.GENERATE_ACTION) return generate(type, ...params.slice(2))
}

function generate (type, ...args) {
  if (type === constants.SCENE_TYPE) generateScene(...args);
}

function generateScene (dest) {
  const {dir, name} = path.parse(dest);

  const className = `${name.slice(0, 1)[0].toUpperCase()}${name.slice(1)}`
  const destination = path.resolve('.', constants.SCENE_DIR, dir);

  writeSceneTemplate(destination, className);
}

async function writeSceneTemplate (destination, name) {
  const dest = path.resolve(destination, `${name}.ts`);

  try {
    await fs.access(dest)
    console.log(`${name}.ts scene already exists. Aborting.`);
  } catch {
    try {
      await fs.mkdir(destination)
    } catch {}
    const content = await fs.readFile(constants.SCENE_TEMPLATE, { encoding: 'utf8' });
    const renamed = content.replace(constants.SCENE_TEMPLATE_REPLACE_PATTERN, name);
    await fs.writeFile(dest, renamed)
    console.log(`Done. Created scene ${name}.ts at ${destination}`);
  }
}

cli(process.argv);
