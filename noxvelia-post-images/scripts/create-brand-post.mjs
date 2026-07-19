import { parseArgs, printDone, renderBrandPost } from './lib/postImageRenderer.mjs';

const args = parseArgs();

const output = await renderBrandPost({
  size: args.size || 'square',
  headline: args.headline || 'Carros e imoveis no mesmo sitio',
  subtitle: args.subtitle || 'Pesquisa simples, contacto direto e anuncios bem apresentados.',
  badge: args.badge || 'NOXVELIA',
  cta: args.cta || 'noxvelia.com',
  output: args.output || 'output/brand-post.png',
  svg: args.svg,
});

printDone(output);
