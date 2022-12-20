import fs from 'fs/promises';
import path from 'path';

import {
  PARAMS_MAP,
  GENERATE_ACTION,
  SCENE_TYPE,
  SHADER_TYPE,
  SCENE_DIR,
  SHADER_DIR,
  SHADER_TEMPLATE,
  SHADER_FRAG_TEMPLATE,
  SHADER_VERT_TEMPLATE,
  SHADER_TEMPLATE_REPLACE_PATTERN,
  SCENE_TEMPLATE,
  SCENE_TEMPLATE_REPLACE_PATTERN,
} from './constants.js';

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
  if (type === SHADER_TYPE) generateShader(...args);
}

function generateScene (dest) {
  const {dir, name} = path.parse(dest);

  const className = `${name.slice(0, 1)[0].toUpperCase()}${name.slice(1)}`
  const destination = path.resolve('.', SCENE_DIR, dir);

  writeSceneTemplate(destination, className);
}

function generateShader (dest) {
  const {name} = path.parse(dest);

  const className = `${name.slice(0, 1)[0].toLowerCase()}${name.slice(1)}`
  const destination = path.resolve('.', SHADER_DIR, className);

  writeShaderTemplate(destination, className);
}

async function writeShaderTemplate (destination, name) {
  const destIndex = path.resolve(destination, 'index.ts');
  const destVert  = path.resolve(destination, `${name}.vert`);
  const destFrag  = path.resolve(destination, `${name}.frag`);

  try {
    await fs.access(destIndex)
    console.log(`${name} already exists. Aborting.`);
  } catch {
    try {
      await fs.mkdir(destination)
    } catch {}

    const [replIndex, replVert, replFrag] = await Promise.all([
      fs.readFile(SHADER_TEMPLATE,      { encoding: 'utf8' }),
      fs.readFile(SHADER_VERT_TEMPLATE, { encoding: 'utf8' }),
      fs.readFile(SHADER_FRAG_TEMPLATE, { encoding: 'utf8' }),
    ]);

    await Promise.all([
      fs.writeFile(destIndex, replIndex.replaceAll(SHADER_TEMPLATE_REPLACE_PATTERN, name)),
      fs.writeFile(destVert,  replVert),
      fs.writeFile(destFrag,  replFrag),
    ])
    console.log(`Done. Created shader at ${destination}`);
  }
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
    const content = await fs.readFile(SCENE_TEMPLATE, { encoding: 'utf8' });
    const renamed = content.replace(SCENE_TEMPLATE_REPLACE_PATTERN, name);
    await fs.writeFile(dest, renamed)
    console.log(`Done. Created scene ${name}.ts at ${destination}`);
  }
}

cli(process.argv);
