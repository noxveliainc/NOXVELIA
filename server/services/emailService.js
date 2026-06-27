import { Resend } from 'resend';
import 'dotenv/config';

// Inicializa o Resend com a chave de API guardada no teu ambiente (.env ou Render)
const resend = new Resend(process.env.RESEND_API_KEY);

// ── 1. EMAIL DE RECUPERAÇÃO DE PASSWORD ──────────────────────
export const enviarEmailReset = async (emailDestino, nomeUtilizador, linkRecuperacao) => {
  try {
    await resend.emails.send({
      from: '"NOXVELIA" <suporte@noxvelia.com>', 
      to: emailDestino,
      subject: 'Recuperação de Acesso - NOXVELIA',
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #040711; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #1e293b;">
          
          <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 24px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">
            NOXVELIA
          </h2>
          
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">Olá, ${nomeUtilizador}.</p>
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">Recebemos um pedido para repor a palavra-passe da tua conta na <strong>NOXVELIA</strong>.</p>
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">Para continuares, clica no botão abaixo. Este link expira em 1 hora.</p>
          
          <div style="margin: 32px 0;">
            <a href="${linkRecuperacao}" target="_blank" style="background-color: #ffffff; color: #040711; padding: 14px 28px; text-decoration: none; font-weight: 700; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; display: inline-block; border-radius: 8px;">
              Redefinir Palavra-passe
            </a>
          </div>
          
          <p style="font-size: 12px; color: #64748b; margin-top: 32px;">Se não fizeste este pedido, podes ignorar com segurança este e-mail.</p>
          <hr style="border: none; border-top: 1px solid #1e293b; margin: 32px 0;" />
          <p style="font-size: 10px; color: #475569; letter-spacing: 0.1em;">NOXVELIA · PORTUGAL · 2026</p>
        </div>
      `
    });
    console.log(`✅ [RESEND] E-mail de redefinição enviado para: ${emailDestino}`);
  } catch (error) {
    console.error('❌ [RESEND] Erro ao enviar e-mail de redefinição:', error);
    throw error;
  }
};

// ── 2. EMAIL DE VERIFICAÇÃO DE CONTA ─────────────────────────
export const enviarEmailVerificacao = async (emailDestino, nomeUtilizador, linkVerificacao) => {
  try {
    await resend.emails.send({
      from: '"NOXVELIA" <suporte@noxvelia.com>',
      to: emailDestino,
      subject: 'Confirma a tua conta - NOXVELIA',
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #040711; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #1e293b;">
          
          <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 24px; color: #2ac1b4; text-transform: uppercase; letter-spacing: 0.05em;">
            BEM-VINDO À NOXVELIA
          </h2>
          
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">Olá, ${nomeUtilizador}. Obrigado por te registares na nossa plataforma!</p>
          <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">Para ativares o teu perfil e poderes começar a publicar os teus anúncios de forma segura, clica no botão abaixo:</p>
          
          <div style="margin: 32px 0;">
            <a href="${linkVerificacao}" target="_blank" style="background-color: #2ac1b4; color: #040711; padding: 14px 28px; text-decoration: none; font-weight: 800; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; display: inline-block; border-radius: 8px;">
              Confirmar o meu E-mail
            </a>
          </div>
          
          <p style="font-size: 12px; color: #64748b; margin-top: 32px;">Este link de segurança é válido por 24 horas.</p>
          <hr style="border: none; border-top: 1px solid #1e293b; margin: 32px 0;" />
          <p style="font-size: 10px; color: #475569; letter-spacing: 0.1em;">NOXVELIA · PORTUGAL · 2026</p>
        </div>
      `
    });
    console.log(`✅ [RESEND] E-mail de verificação enviado para: ${emailDestino}`);
  } catch (error) {
    console.error('❌ [RESEND] Erro ao enviar e-mail de verificação:', error);
    throw error;
  }
};