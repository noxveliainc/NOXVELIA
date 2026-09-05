import { execSync } from 'node:child_process';
import path from 'node:path';
import { parseArgs, resolveLocalPath } from './lib/postImageRenderer.mjs';

const args = parseArgs();
const inputVideo = resolveLocalPath(args.input || 'examples/video-input.mp4');
const outputPath = resolveLocalPath(args.output || 'output/noxvelia-reels-post.mp4');
const ctaText = args.cta || 'Sem comissões • noxvelia.com';

console.log(`[noxvelia-video] A processar vídeo vertical profissional...`);

// Comando FFmpeg otimizado para transformar qualquer vídeo num Reel/TikTok perfeito com branding Noxvelia
// - Corta e redimensiona para 1080x1920 (9:16)
// - Adiciona um overlay translúcido elegante no fundo e texto institucional
const ffmpegCmd = `ffmpeg -y -i "${inputVideo}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,drawtext=text='NOXVELIA':fontcolor=white:fontsize=42:fontfile=Arial:x=(w-text_w)/2:y=80,drawtext=text='${ctaText}':fontcolor=d9c49c:fontsize=32:fontfile=Arial:x=(w-text_w)/2:y=h-120" -c:v libx264 -preset fast -crf 22 -c:a copy "${outputPath}"`;

try {
  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log(`[noxvelia-video] Vídeo perfeito gerado com sucesso em: ${outputPath}`);
} catch (error) {
  console.error('[noxvelia-video] Erro ao processar o vídeo. Certifica-te de que o FFmpeg está instalado no sistema.');
  process.exit(1);
}