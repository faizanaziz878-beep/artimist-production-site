import { readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dir = join(root, 'public', 'adu');
const assets = [
  'adu-hero',
  'adu-floor-plan',
  'adu-elevations',
  'adu-sections',
  'adu-living',
  'adu-garage-plan',
];

for (const name of assets) {
  const source = join(dir, `${name}.b64`);
  const target = join(dir, `${name}.webp`);
  try {
    await access(source);
    const encoded = (await readFile(source, 'utf8')).trim();
    await writeFile(target, Buffer.from(encoded, 'base64'));
  } catch (error) {
    console.error(`Unable to prepare ${name}.webp`, error);
    process.exitCode = 1;
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log('Prepared ADU web assets.');
