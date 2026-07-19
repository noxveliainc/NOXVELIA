import fs from 'node:fs/promises';
import { parseArgs, printDone, renderBrandPost, renderListingPost, resolveLocalPath } from './lib/postImageRenderer.mjs';

const args = parseArgs();
const inputPath = resolveLocalPath(args.input || 'examples/posts.json');
const items = JSON.parse(await fs.readFile(inputPath, 'utf8'));

if (!Array.isArray(items)) {
  throw new Error('O ficheiro JSON tem de ser uma lista de posts.');
}

for (const item of items) {
  const template = item.template || item.type || 'brand';
  let output;
  if (template === 'car') {
    output = await renderListingPost({ ...item, vertical: 'car', size: item.size || args.size || 'square' });
  } else if (template === 'property' || template === 'imovel') {
    output = await renderListingPost({ ...item, vertical: 'property', size: item.size || args.size || 'square' });
  } else if (template === 'brand') {
    output = await renderBrandPost({ ...item, size: item.size || args.size || 'square' });
  } else {
    throw new Error(`Template desconhecido: ${template}`);
  }
  printDone(output);
}
