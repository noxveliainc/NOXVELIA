import { parseArgs, printDone, renderListingPost } from './lib/postImageRenderer.mjs';

const args = parseArgs();

const output = await renderListingPost({
  vertical: 'property',
  size: args.size || 'square',
  title: args.title || 'Imovel em destaque',
  price: args.price || 'Sob consulta',
  location: args.location || 'Portugal',
  type: args.type || '',
  rooms: args.rooms || '',
  area: args.area || '',
  extra: args.extra || '',
  badge: args.badge || 'NOXVELIA ESTATE',
  cta: args.cta || 'Ver imovel em noxvelia.com',
  image: args.image || '',
  output: args.output || 'output/property-post.png',
  svg: args.svg,
});

printDone(output);
