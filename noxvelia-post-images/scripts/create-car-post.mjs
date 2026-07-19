import { parseArgs, printDone, renderListingPost } from './lib/postImageRenderer.mjs';

const args = parseArgs();

const output = await renderListingPost({
  vertical: 'car',
  size: args.size || 'square',
  title: args.title || 'Carro em destaque',
  price: args.price || 'Sob consulta',
  location: args.location || 'Portugal',
  year: args.year || '',
  km: args.km || '',
  fuel: args.fuel || '',
  extra: args.extra || '',
  badge: args.badge || 'NOXVELIA DRIVE',
  cta: args.cta || 'Ver carro em noxvelia.com',
  image: args.image || '',
  output: args.output || 'output/car-post.png',
  svg: args.svg,
});

printDone(output);
