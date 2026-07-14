import {
  cleanText,
  contactAreaText,
  ensureHttpsUrl,
  escapeHtml,
  personalizeText,
  sanitizeSubject,
  signToken,
  stripHtml,
  textToEmailHtml,
} from './partnershipEmailUtils.js';

export const DEFAULT_PARTNERSHIP_SUBJECT = 'Publique gratuitamente os anuncios da sua empresa na Noxvelia';
export const DEFAULT_PARTNERSHIP_PREHEADER = 'Criamos a sua conta e publicamos os seus anuncios sem qualquer custo.';
export const DEFAULT_PARTNERSHIP_BUTTON_TEXT = 'Quero aderir gratuitamente';
export const DEFAULT_PARTNERSHIP_BUTTON_URL = 'https://www.noxvelia.com';
export const DEFAULT_PARTNERSHIP_BODY = `Ola {{nome}},

Estamos a lancar a Noxvelia, uma plataforma portuguesa dedicada a compra e venda de imoveis e automoveis.

Gostariamos de convidar a {{empresa}} a fazer parte dos nossos parceiros fundadores.

Nesta fase de lancamento, oferecemos a criacao da conta e a publicacao dos anuncios de forma totalmente gratuita.

O processo e muito simples: basta responder a este email ou enviar-nos o link do vosso website. A nossa equipa trata da criacao da conta e da publicacao dos anuncios na Noxvelia.

Ao aderir nesta fase, beneficia de:

* Criacao gratuita da conta;
* Publicacao dos anuncios pela nossa equipa;
* Novo canal de divulgacao para os seus imoveis ou automoveis;
* Sem custos de adesao;
* Sem trabalho adicional para a sua equipa.

O nosso objetivo e ajudar empresas como a sua a alcancar mais potenciais clientes atraves de uma plataforma simples e moderna.

Para avancar, basta responder a este email com o link do vosso website.

Com os melhores cumprimentos,

Equipa Noxvelia
geral@noxvelia.com`;

export const defaultCampaignPayload = (settings = {}) => ({
  nomeInterno: 'Convite parceiros fundadores',
  assunto: DEFAULT_PARTNERSHIP_SUBJECT,
  preheader: DEFAULT_PARTNERSHIP_PREHEADER,
  conteudoPrincipal: DEFAULT_PARTNERSHIP_BODY,
  textoBotao: DEFAULT_PARTNERSHIP_BUTTON_TEXT,
  urlBotao: DEFAULT_PARTNERSHIP_BUTTON_URL,
  remetente: settings.remetente || '"Noxvelia Parcerias" <geral@noxvelia.com>',
  replyTo: settings.replyTo || 'geral@noxvelia.com',
});

export const createUnsubscribeToken = ({ contact, send, secret }) => signToken({
  email: contact.email,
  contactId: String(contact._id || contact.id || ''),
  sendId: send?._id ? String(send._id) : '',
  purpose: 'partnership_unsubscribe',
}, secret);

const absoluteButtonUrl = (url) => ensureHttpsUrl(url, { allowEmpty: false }) || DEFAULT_PARTNERSHIP_BUTTON_URL;

const buildText = ({ campaign, contact, unsubscribeUrl, buttonUrl }) => {
  const body = personalizeText(campaign.conteudoPrincipal, contact, unsubscribeUrl);
  return [
    campaign.preheader,
    '',
    body,
    '',
    `${campaign.textoBotao || DEFAULT_PARTNERSHIP_BUTTON_TEXT}: ${buttonUrl}`,
    '',
    'Noxvelia - Compra e venda de imoveis e automoveis',
    'https://www.noxvelia.com',
    'Contacto: geral@noxvelia.com',
    `Recebeu esta mensagem porque encontramos a sua empresa como contacto profissional relevante para ${contactAreaText(contact.tipoEmpresa)}.`,
    `Deixar de receber estes emails: ${unsubscribeUrl}`,
  ].filter(Boolean).join('\n');
};

export const renderPartnershipEmail = ({
  campaign,
  contact,
  send = null,
  settings = {},
  appUrl,
  apiUrl,
  logoUrl,
  secret,
}) => {
  const unsubscribeToken = createUnsubscribeToken({ contact, send, secret });
  const webBase = String(appUrl || 'https://www.noxvelia.com').replace(/\/$/, '');
  const publicApi = String(apiUrl || '').replace(/\/$/, '');
  const unsubscribeBase = publicApi || `${webBase}/api`;
  const unsubscribeUrl = `${unsubscribeBase}/partnerships/unsubscribe/${unsubscribeToken}`;
  const finalButtonUrl = absoluteButtonUrl(personalizeText(campaign.urlBotao || DEFAULT_PARTNERSHIP_BUTTON_URL, contact, unsubscribeUrl));
  const clickUrl = settings.trackingCliques && publicApi
    ? `${publicApi}/partnerships/click/${unsubscribeToken}?u=${encodeURIComponent(finalButtonUrl)}`
    : finalButtonUrl;
  const openPixel = settings.trackingAberturas && publicApi
    ? `<img src="${publicApi}/partnerships/open/${unsubscribeToken}" width="1" height="1" alt="" style="display:none;border:0;width:1px;height:1px;" />`
    : '';

  const subject = sanitizeSubject(personalizeText(campaign.assunto || DEFAULT_PARTNERSHIP_SUBJECT, contact, unsubscribeUrl));
  const preheader = cleanText(personalizeText(campaign.preheader || DEFAULT_PARTNERSHIP_PREHEADER, contact, unsubscribeUrl), 220);
  const bodyHtml = textToEmailHtml(personalizeText(campaign.conteudoPrincipal || DEFAULT_PARTNERSHIP_BODY, contact, unsubscribeUrl));
  const buttonText = cleanText(personalizeText(campaign.textoBotao || DEFAULT_PARTNERSHIP_BUTTON_TEXT, contact, unsubscribeUrl), 90);
  const logo = ensureHttpsUrl(logoUrl) || `${webBase}/logo-noxvelia.png`;

  const html = `<!doctype html>
<html lang="pt">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;margin:0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:28px 30px 8px;text-align:left;">
                <img src="${escapeHtml(logo)}" width="148" alt="Noxvelia" style="display:block;width:148px;max-width:160px;height:auto;border:0;outline:none;text-decoration:none;">
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px 8px;">
                <h1 style="margin:0 0 14px;font-size:24px;line-height:1.25;color:#0f172a;font-weight:800;">${escapeHtml(subject)}</h1>
                ${bodyHtml}
                <div style="margin:30px 0 26px;">
                  <a href="${escapeHtml(clickUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:10px;padding:14px 20px;font-weight:800;font-size:14px;">${escapeHtml(buttonText)}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 30px;background:#f8fafc;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px;line-height:1.6;">
                <img src="${escapeHtml(logo)}" width="128" alt="Noxvelia" style="display:block;width:128px;max-width:150px;height:auto;margin:0 0 14px;border:0;">
                <strong style="color:#0f172a;">Noxvelia - Compra e venda de imoveis e automoveis</strong><br>
                <a href="https://www.noxvelia.com" style="color:#0f766e;text-decoration:underline;">https://www.noxvelia.com</a><br>
                Contacto: <a href="mailto:geral@noxvelia.com" style="color:#0f766e;text-decoration:underline;">geral@noxvelia.com</a>
                <p style="margin:14px 0 0;">Recebeu esta mensagem porque encontramos a sua empresa como contacto profissional relevante para ${escapeHtml(contactAreaText(contact.tipoEmpresa))}. Respeitamos pedidos de remocao imediatamente.</p>
                <p style="margin:10px 0 0;"><a href="${escapeHtml(unsubscribeUrl)}" style="color:#475569;text-decoration:underline;">Deixar de receber estes emails</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${openPixel}
  </body>
</html>`;

  const text = buildText({ campaign: { ...campaign, preheader, textoBotao: buttonText }, contact, unsubscribeUrl, buttonUrl: finalButtonUrl });

  return {
    subject,
    html,
    text,
    unsubscribeUrl,
    headers: {
      'List-Unsubscribe': `<mailto:geral@noxvelia.com?subject=Remover>, <${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'X-Noxvelia-Partnership-Send': send?._id ? String(send._id) : 'test',
    },
    previewText: stripHtml(html).slice(0, 500),
  };
};
