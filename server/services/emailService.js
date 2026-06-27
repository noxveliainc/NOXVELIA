import nodemailer from 'nodemailer';
import 'dotenv/config';

// Motor SMTP configurado exclusivamente para o Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

export const enviarEmailReset = async (emailDestino, nomeUtilizador, linkRecuperacao) => {
  const mailOptions = {
    from: '"NOXVELIA" <teste@NOXVELIA.com>', 
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
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ [MAILTRAP] E-mail intercetado com sucesso! Vai verificar o painel do Mailtrap.`);
  } catch (error) {
    console.error('❌ [MAILTRAP] Erro ao enviar e-mail:', error);
    throw error;
  }
};