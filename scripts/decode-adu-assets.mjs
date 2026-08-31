import { readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dir = join(root, 'public', 'adu');
const assets = {
  'adu-hero': [400, 480, 'xMidYMid slice'],
  'adu-floor-plan': [600, 450, 'xMidYMid meet'],
  'adu-elevations': [440, 587, 'xMidYMid meet'],
  'adu-sections': [440, 587, 'xMidYMid meet'],
  'adu-living': [400, 300, 'xMidYMid slice'],
  'adu-garage-plan': [440, 330, 'xMidYMid meet'],
};

async function prepare(name, width, height, preserve) {
  const source = join(dir, `${name}.b64`);
  await access(source);
  const encoded = (await readFile(source, 'utf8')).trim();
  await writeFile(join(dir, `${name}.webp`), Buffer.from(encoded, 'base64'));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><image href="data:image/webp;base64,${encoded}" width="${width}" height="${height}" preserveAspectRatio="${preserve}"/></svg>`;
  await writeFile(join(dir, `${name}.svg`), svg, 'utf8');
}

for (const [name, [width, height, preserve]] of Object.entries(assets)) {
  try {
    await prepare(name, width, height, preserve);
  } catch (error) {
    console.error(`Unable to prepare ${name}`, error);
    process.exitCode = 1;
  }
}

// The cinematic section intentionally reuses the approved hero artwork.
const heroEncoded = (await readFile(join(dir, 'adu-hero.b64'), 'utf8')).trim();
const exteriorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480"><image href="data:image/webp;base64,${heroEncoded}" width="400" height="480" preserveAspectRatio="xMidYMid slice"/></svg>`;
await writeFile(join(dir, 'adu-exterior.svg'), exteriorSvg, 'utf8');

if (process.exitCode) process.exit(process.exitCode);
console.log('Prepared ADU web assets.');
