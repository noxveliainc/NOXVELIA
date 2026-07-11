import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiChevronLeft, 
  mdiScaleBalance, 
  mdiShieldCheckOutline, 
  mdiHandshakeOutline, 
  mdiCookieOutline, 
  mdiFileDocumentOutline,
  mdiAlertCircleOutline
} from '@mdi/js';

const POLITICA_ATUALIZADA_EM = '11 de julho de 2026';
const OPEN_COOKIE_SETTINGS_EVENT = 'noxvelia:open-cookie-settings';

export default function PoliticaPrivacidade() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const destino = location.hash === '#cookies' ? document.getElementById('cookies') : null;
    if (destino) {
      requestAnimationFrame(() => destino.scrollIntoView({ block: 'start' }));
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const abrirPreferenciasCookies = () => {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
  };

  return (
    <>
      <style>{`
        .legal-root { background-color: #f8fafc; min-height: calc(100vh - 72px); font-family: 'Inter', sans-serif; color: #0f172a; padding: 64px 24px; line-height: 1.6; }
        .legal-container { max-width: 900px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 56px 64px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); }
        @media (max-width: 768px) { .legal-container { padding: 40px 24px; } }
        
        .legal-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 40px; transition: color 0.2s; }
        .legal-back:hover { color: #0f172a; }
        
        .legal-header { text-align: center; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid #e2e8f0; }
        .legal-icon-wrap { width: 64px; height: 64px; background: #f0fdfa; border: 1px solid #ccfbf1; color: #0d9488; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .legal-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(28px, 4vw, 36px); font-weight: 800; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 12px; }
        .legal-subtitle { font-size: 15px; color: #64748b; }
        
        .legal-content h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; margin: 48px 0 20px; display: flex; align-items: center; gap: 10px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }
        .legal-content h3 { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #334155; margin: 24px 0 12px; }
        .legal-content p { font-size: 15px; color: #475569; margin-bottom: 16px; text-align: justify; }
        .legal-content ul { margin: 16px 0 24px 24px; color: #475569; font-size: 15px; }
        .legal-content li { margin-bottom: 10px; text-align: justify; line-height: 1.6; }
        .legal-content strong { color: #0f172a; font-weight: 700; }
        .legal-content a { color: #0d7f77; font-weight: 700; text-underline-offset: 3px; }
        
        .legal-alert { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #ef4444; padding: 24px; border-radius: 8px; margin: 32px 0; font-size: 14.5px; color: #7f1d1d; text-align: justify; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.05); }
        .legal-alert strong { color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        
        .legal-info-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 24px 0; font-size: 14px; color: #475569; }
        #cookies { scroll-margin-top: 96px; }
        .legal-table-wrap { width: 100%; overflow-x: auto; margin: 22px 0 26px; border: 1px solid #dbe5e4; border-radius: 14px; }
        .legal-cookie-table { width: 100%; min-width: 760px; border-collapse: collapse; background: #ffffff; font-size: 13px; }
        .legal-cookie-table th { padding: 13px 14px; color: #17343a; background: #edf6f3; border-bottom: 1px solid #dbe5e4; text-align: left; font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
        .legal-cookie-table td { padding: 14px; color: #536970; border-bottom: 1px solid #e7eeed; vertical-align: top; line-height: 1.5; }
        .legal-cookie-table tr:last-child td { border-bottom: 0; }
        .legal-cookie-table code { color: #0a625c; background: #e8f6f3; border-radius: 5px; padding: 2px 5px; font-size: 11px; }
        .legal-cookie-badge { display: inline-flex; align-items: center; min-height: 24px; padding: 0 8px; border-radius: 999px; background: #e5f7f3; color: #126b63; font-size: 9px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; white-space: nowrap; }
        .legal-cookie-badge.optional { color: #7c5715; background: #fff3d5; }
        .legal-cookie-action { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; margin: 6px 0 24px; padding: 0 16px; color: #06282b; border: 0; border-radius: 10px; background: #2ac1b4; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform .18s ease, box-shadow .18s ease; }
        .legal-cookie-action:hover { transform: translateY(-1px); box-shadow: 0 12px 24px -18px rgba(13, 148, 136, .8); }
        .legal-source-note { padding: 16px; color: #52696f; border-left: 3px solid #2ac1b4; border-radius: 0 10px 10px 0; background: #f0f8f6; font-size: 13px; line-height: 1.6; }
      `}</style>

      <div className="legal-root">
        <div className="legal-container">
          <button onClick={() => navigate(-1)} className="legal-back">
            <Icon path={mdiChevronLeft} size={0.7} /> Voltar
          </button>

          <div className="legal-header">
            <div className="legal-icon-wrap">
              <Icon path={mdiScaleBalance} size={1.5} />
            </div>
            <h1 className="legal-title">Termos, Privacidade e Proteção de Dados</h1>
            <p className="legal-subtitle">Última atualização: {POLITICA_ATUALIZADA_EM}</p>
          </div>

          <div className="legal-content">
            <div className="legal-info-box">
              <strong>Entidade Responsável:</strong> Diogo Moreira<br />
              <strong>Sede:</strong> Lousada, Porto, Portugal<br />
              <strong>Contacto de privacidade:</strong> <a href="mailto:suporte@noxvelia.com">suporte@noxvelia.com</a><br />
              <strong>Plataforma:</strong> NOXVELIA (Noxvelia Drive & Noxvelia Estate)<br />
              <span style={{ fontSize: '13px', marginTop: '8px', display: 'block' }}>Este documento constitui um acordo legal e vinculativo entre a NOXVELIA e qualquer pessoa que utilize a plataforma (doravante "Utilizador").</span>
            </div>

            <p>
              A leitura e aceitação deste documento são obrigatórias para a utilização da plataforma NOXVELIA. Ao aceder, registar-se ou publicar anúncios, o Utilizador declara ter lido, compreendido e aceite integralmente e sem reservas as presentes condições.
            </p>

            <h2><Icon path={mdiHandshakeOutline} size={1.1} color="#2ac1b4" /> 1. Natureza do Serviço e Isenção de Responsabilidade</h2>
            <p>
              A NOXVELIA é um portal de classificados focado no segmento premium, atuando <strong>exclusivamente como prestador intermediário de serviços em rede</strong>, ao abrigo da Lei n.º 7/2004 de 6 de janeiro (Lei do Comércio Eletrónico).
            </p>
            <ul>
              <li><strong>Inexistência de Vínculo Contratual:</strong> A NOXVELIA não atua como compradora, vendedora, mediadora imobiliária ou concessionária automóvel. A plataforma limita-se a fornecer a infraestrutura tecnológica para que Vendedores e Compradores se encontrem.</li>
              <li><strong>Exatidão das Informações:</strong> Todo o conteúdo dos anúncios (descrições, quilometragem, características de imóveis, titularidade, preços e imagens) é da <strong>única, inteira e exclusiva responsabilidade do Vendedor</strong> que o publica.</li>
              <li><strong>Verificação Independente:</strong> É estritamente recomendado aos Compradores que efetuem todas as devidas inspeções físicas, mecânicas e documentais aos ativos antes de realizarem qualquer transação financeira. Ferramentas externas (como relatórios carVertical) são fornecidas por terceiros, sujeitas aos termos dessas mesmas entidades, não garantindo a NOXVELIA a infalibilidade desses relatórios.</li>
            </ul>

            <div className="legal-alert">
              <strong><Icon path={mdiAlertCircleOutline} size={0.8} /> Isenção Total de Responsabilidade (Pós-Venda)</strong>
              A NOXVELIA declina de forma expressa, categórica e irrevogável qualquer responsabilidade por vícios ocultos, defeitos de fabrico, anomalias mecânicas, litígios documentais, fraudes financeiras, incumprimento de garantias legais ou comerciais, bem como por quaisquer danos diretos ou indiretos resultantes de negócios iniciados através da plataforma. Qualquer reclamação, litígio ou exigência de devolução tem de ser endereçada exclusivamente ao Vendedor do bem.
            </div>

            <h2><Icon path={mdiScaleBalance} size={1.1} color="#2ac1b4" /> 2. Regras de Utilização e Conduta</h2>
            <p>A NOXVELIA reserva-se o direito de manter a integridade do seu mercado premium. O Utilizador compromete-se a:</p>
            <ul>
              <li>Criar apenas uma conta por pessoa/entidade, com informações verídicas e atualizadas.</li>
              <li>Não publicar anúncios de bens que não possua, que se encontrem penhorados, apreendidos, alvo de litígio judicial ou cuja origem seja ilícita.</li>
              <li>Não utilizar a plataforma para disseminar spam, links maliciosos, burla, extorsão ou publicidade a serviços concorrentes.</li>
              <li>Garantir que as imagens carregadas não violam direitos de autor de terceiros e correspondem ao estado real do ativo à data de submissão do anúncio.</li>
            </ul>
            <p>A NOXVELIA reserva-se o direito absoluto de editar, suspender ou eliminar permanentemente, sem aviso prévio ou direito a compensação, anúncios ou contas que violem os presentes Termos ou que afetem negativamente a reputação da plataforma.</p>

            <h2><Icon path={mdiShieldCheckOutline} size={1.1} color="#2ac1b4" /> 3. Política de Privacidade e Proteção de Dados (RGPD)</h2>
            <p>
              O tratamento de dados pessoais é realizado de acordo com o <strong>Regulamento (UE) 2016/679 (RGPD)</strong> e com a Lei n.º 58/2019 de 8 de agosto. O responsável pelo tratamento é Diogo Moreira, identificado no início deste documento.
            </p>
            <h3>3.1. Dados Recolhidos e Finalidade</h3>
            <ul>
              <li><strong>Dados de Registo:</strong> Nome, E-mail, Telemóvel e palavra-passe protegida por <em>hash</em>. Para profissionais: Nome da Empresa, NIF e Website. Estes dados servem para autenticação e gestão da conta.</li>
              <li><strong>Dados de Anúncio e Transacionais:</strong> Fotos, localizações (cidade/distrito), descrições, VIN (Número de Chassi). A finalidade é a publicação da oferta na plataforma.</li>
              <li><strong>Partilha de Contactos:</strong> Ao publicar um anúncio, o Utilizador consente de forma explícita que o seu número de telemóvel e endereço de e-mail sejam <strong>exibidos publicamente</strong> aos visitantes da plataforma que solicitem ver os contactos do vendedor.</li>
              <li><strong>Dados Técnicos e de Segurança:</strong> Endereço IP, data e hora, agente do navegador, pedidos efetuados e registos de erro ou segurança, quando disponíveis. Servem para proteger a plataforma, diagnosticar falhas e prevenir abuso ou fraude.</li>
              <li><strong>Mensagens e Suporte:</strong> Nome, e-mail e conteúdo enviado através dos formulários ou canais de suporte, necessários para responder ao pedido.</li>
              <li><strong>Pagamentos e Serviços Premium:</strong> Plano, referência da transação, estado do pagamento e identificadores técnicos Stripe. Os dados completos do cartão são tratados diretamente pelo prestador de pagamentos e não pela NOXVELIA.</li>
              <li><strong>Funcionalidades de Inteligência Artificial:</strong> Pesquisa, matrícula, descrições, características e restante conteúdo submetido quando o Utilizador decide usar uma função de IA, com a finalidade exclusiva de produzir o resultado solicitado.</li>
            </ul>

            <h3>3.2. Partilha de Dados com Terceiros</h3>
            <p>A NOXVELIA não vende nem aluga dados pessoais. A comunicação a prestadores ocorre apenas na medida necessária para disponibilizar a função pedida, executar um contrato, proteger a plataforma ou cumprir uma obrigação legal:</p>
            <ul>
              <li><strong>Autoridades Judiciais e Policiais:</strong> Em caso de suspeita de fraude informática, lavagem de dinheiro ou ordem judicial, a NOXVELIA cooperará integralmente, fornecendo os IPs e dados de registo às autoridades competentes (Polícia Judiciária, Ministério Público).</li>
              <li><strong>Stripe:</strong> Pagamentos, subscrições, portal de faturação e prevenção de fraude. Recebe os dados necessários para criar e reconciliar a operação.</li>
              <li><strong>Cloudinary:</strong> Armazenamento, transformação e entrega das fotografias carregadas nos anúncios e perfis.</li>
              <li><strong>Resend:</strong> Envio de mensagens de verificação de e-mail e recuperação de palavra-passe, incluindo endereço do destinatário e conteúdo técnico da mensagem.</li>
              <li><strong>Formspree:</strong> Receção dos dados enviados voluntariamente através do formulário de suporte no rodapé.</li>
              <li><strong>Google Gemini:</strong> Processamento do conteúdo enviado às funcionalidades de inteligência artificial, apenas quando essas funções são utilizadas.</li>
              <li><strong>CARTO e OpenStreetMap/Nominatim:</strong> Apresentação dos mapas e geocodificação das localizações pesquisadas ou associadas a anúncios. Os pedidos de mosaicos podem incluir IP e informação técnica do navegador.</li>
              <li><strong>carVertical:</strong> Serviço externo acedido por ligação de afiliação. Quando existe VIN no anúncio, esse identificador pode ser incluído na ligação aberta pelo Utilizador.</li>
              <li><strong>Buy Me a Coffee:</strong> Widget de apoio carregado apenas após consentimento para serviços externos.</li>
              <li><strong>Google Fonts:</strong> Entrega remota de tipos de letra em algumas áreas da plataforma, podendo o pedido técnico revelar IP e dados do navegador ao fornecedor.</li>
            </ul>

            <h3>3.3. Fundamentos Jurídicos</h3>
            <ul>
              <li><strong>Execução de contrato e diligências pré-contratuais:</strong> criação e gestão da conta, publicação e gestão de anúncios, mensagens entre Utilizadores e prestação de serviços premium solicitados.</li>
              <li><strong>Consentimento:</strong> utilização de serviços externos opcionais e outros tratamentos em que seja apresentada uma escolha específica. O consentimento pode ser retirado a qualquer momento, sem afetar a licitude do tratamento anterior.</li>
              <li><strong>Interesse legítimo:</strong> segurança da plataforma, prevenção de fraude e abuso, diagnóstico de erros, defesa de direitos e medição interna do funcionamento do serviço, após ponderação com os direitos do Utilizador.</li>
              <li><strong>Obrigação legal:</strong> faturação, contabilidade, resposta a autoridades competentes e conservação de elementos exigidos por lei.</li>
            </ul>

            <h3>3.4. Conservação e Transferências Internacionais</h3>
            <p>Os dados são conservados apenas durante o período necessário à finalidade correspondente, segundo os seguintes critérios:</p>
            <ul>
              <li>Dados de conta, anúncios e mensagens são mantidos enquanto a conta ou o conteúdo estiver ativo e durante o período adicional necessário para responder a pedidos, prevenir abuso ou exercer e defender direitos.</li>
              <li>A credencial de autenticação tem validade máxima de sete dias no servidor; a cópia local é removida quando o Utilizador termina sessão ou apaga os dados do navegador.</li>
              <li>Registos de pagamento e faturação são conservados durante os prazos impostos pela legislação fiscal e contabilística aplicável.</li>
              <li>Pedidos de suporte são conservados até à resolução do assunto e, quando necessário, durante o prazo aplicável à defesa de direitos.</li>
              <li>Registos técnicos, de erro e segurança são mantidos pelo período operacional necessário, podendo ser conservados por mais tempo quando associados a um incidente, fraude ou obrigação legal.</li>
              <li>Cópias de segurança seguem ciclos de rotação técnica e deixam de ser utilizadas para fins correntes, sem prejuízo de obrigações legais de conservação.</li>
            </ul>
            <p>
              Alguns prestadores podem tratar dados fora do Espaço Económico Europeu. Quando isso ocorre, a transferência deve apoiar-se num mecanismo legal adequado, como uma decisão de adequação ou cláusulas contratuais-tipo aprovadas pela Comissão Europeia, juntamente com as medidas adicionais aplicáveis. O Utilizador pode pedir informação sobre o mecanismo usado através do contacto de privacidade.
            </p>

            <h3>3.5. Dados Obrigatórios e Decisões Automatizadas</h3>
            <p>
              Os campos assinalados como obrigatórios são necessários para criar a conta, publicar o anúncio, responder a um pedido ou executar um pagamento. A falta desses dados pode impedir a prestação da função correspondente. Dados opcionais, como certas características adicionais, integrações ou funções de IA, podem ser omitidos sem impedir o acesso às funções principais.
            </p>
            <p>
              A NOXVELIA não toma decisões exclusivamente automatizadas que produzam efeitos jurídicos ou afetem significativamente o Utilizador. As funções de inteligência artificial fornecem sugestões ou resultados auxiliares, cabendo ao Utilizador confirmar a informação antes de a utilizar ou publicar.
            </p>

            <h2 id="cookies"><Icon path={mdiCookieOutline} size={1.1} color="#2ac1b4" /> 4. Política de Cookies e Armazenamento Local</h2>
            <p>
              A NOXVELIA utiliza <strong>cookies e tecnologias com função semelhante</strong>, incluindo armazenamento local do navegador (<em>localStorage</em>), para disponibilizar funções essenciais e guardar escolhas feitas pelo Utilizador. O widget externo Buy Me a Coffee só é carregado mediante autorização. A expressão “cookies” nesta secção abrange estas tecnologias sempre que armazenem ou consultem informação no dispositivo.
            </p>

            <h3>4.1. Objetivos destas tecnologias</h3>
            <ul>
              <li><strong>Autenticação e segurança:</strong> manter a sessão iniciada, associar os pedidos autenticados à conta correta e proteger áreas reservadas.</li>
              <li><strong>Funcionamento e preferências solicitadas:</strong> recordar se o Utilizador está a navegar em Drive ou Estate e conservar o tema visual escolhido.</li>
              <li><strong>Prova e gestão do consentimento:</strong> guardar a versão, data, validade e categorias aceites ou rejeitadas, permitindo demonstrar e respeitar a escolha.</li>
              <li><strong>Serviços externos opcionais:</strong> carregar o widget Buy Me a Coffee apenas quando o Utilizador autoriza expressamente essa categoria.</li>
            </ul>

            <h3>4.2. Tecnologias utilizadas atualmente</h3>
            <div className="legal-table-wrap">
              <table className="legal-cookie-table">
                <thead>
                  <tr>
                    <th>Tecnologia / identificador</th>
                    <th>Finalidade</th>
                    <th>Conservação</th>
                    <th>Natureza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><em>localStorage</em><br /><code>@App:token</code></td>
                    <td>Autenticar pedidos à API e permitir o acesso seguro à conta.</td>
                    <td>Até terminar sessão, limpar os dados do navegador ou deixar de ser válido no servidor.</td>
                    <td><span className="legal-cookie-badge">Necessário</span></td>
                  </tr>
                  <tr>
                    <td><em>localStorage</em><br /><code>@App:user</code></td>
                    <td>Manter localmente os dados básicos necessários para apresentar e gerir a sessão do Utilizador.</td>
                    <td>Até terminar sessão, atualizar a conta ou limpar os dados do navegador.</td>
                    <td><span className="legal-cookie-badge">Necessário</span></td>
                  </tr>
                  <tr>
                    <td><em>localStorage</em><br /><code>@App:contexto_visual</code><br /><code>@App:tema</code></td>
                    <td>Recordar a área Drive/Estate e a preferência visual expressamente escolhida.</td>
                    <td>Até a escolha ser alterada ou os dados do navegador serem eliminados.</td>
                    <td><span className="legal-cookie-badge">Funcional</span></td>
                  </tr>
                  <tr>
                    <td><em>localStorage</em><br /><code>@Noxvelia:cookie-consent</code></td>
                    <td>Registar e aplicar a escolha de consentimento, incluindo versão e data de validade.</td>
                    <td>Até 6 meses, salvo retirada da escolha, alteração da política ou limpeza do navegador.</td>
                    <td><span className="legal-cookie-badge">Necessário</span></td>
                  </tr>
                  <tr>
                    <td>Buy Me a Coffee<br /><small>Serviço externo</small></td>
                    <td>Apresentar o botão de apoio à NOXVELIA. O fornecedor pode utilizar cookies ou identificadores próprios quando o widget é carregado.</td>
                    <td>Definida pelo fornecedor externo e respetiva política; o carregamento na NOXVELIA cessa quando a autorização é retirada.</td>
                    <td><span className="legal-cookie-badge optional">Opcional</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4.3. Consentimento, rejeição e retirada</h3>
            <p>
              O armazenamento estritamente necessário é utilizado para prestar as funções pedidas pelo Utilizador. Qualquer serviço externo opcional permanece bloqueado até existir uma escolha positiva. <strong>Rejeitar é tão simples como aceitar</strong> e não impede a navegação, a pesquisa ou a utilização das funções essenciais da plataforma.
            </p>
            <p>
              O banner é apresentado quando o site é aberto para que a escolha possa ser confirmada ou alterada. A autorização guardada tem uma validade máxima de 6 meses e é novamente solicitada quando a versão desta política muda. A escolha pode ser retirada a qualquer momento no botão “Cookies” disponível na plataforma.
            </p>
            <button type="button" className="legal-cookie-action" onClick={abrirPreferenciasCookies}>Gerir preferências de cookies</button>

            <h3>4.4. Analítica, ligações externas e controlo no navegador</h3>
            <p>
              A NOXVELIA <strong>não instala atualmente cookies próprios de analítica nem de publicidade comportamental</strong>. A contagem interna de visitas aos anúncios não depende da ativação de um cookie analítico no navegador. Se esta realidade mudar, as categorias e o mecanismo de consentimento serão atualizados antes de qualquer tecnologia opcional ser utilizada.
            </p>
            <p>
              Ao iniciar um pagamento Stripe ou seguir ligações para carVertical, redes sociais ou outros sites, o Utilizador abandona o contexto direto da NOXVELIA e passa a estar sujeito às políticas desses terceiros. A retirada de consentimento na NOXVELIA impede carregamentos opcionais futuros, mas cookies já criados diretamente por um terceiro poderão ter de ser eliminados nas definições do navegador ou junto desse fornecedor.
            </p>
            <p>
              O navegador permite consultar, bloquear e apagar cookies e armazenamento local. O bloqueio dos elementos estritamente necessários pode impedir o login, a publicação de anúncios e outras funções reservadas.
            </p>
            <div className="legal-source-note">
              Este mecanismo segue o princípio de que o consentimento deve ser livre, específico, informado, inequívoco e tão fácil de retirar como de dar. A NOXVELIA conserva apenas o registo necessário para aplicar e demonstrar essa escolha.
            </div>

            <h2><Icon path={mdiFileDocumentOutline} size={1.1} color="#2ac1b4" /> 5. Os Seus Direitos enquanto Titular de Dados</h2>
            <p>Ao abrigo do RGPD, a qualquer momento, o Utilizador possui o direito de:</p>
            <ul>
              <li><strong>Acesso e Retificação:</strong> Aceder aos seus dados e alterá-los diretamente no painel "O Meu Perfil".</li>
              <li><strong>Apagamento ("Direito ao Esquecimento"):</strong> Solicitar a eliminação da conta e dos dados associados, sem prejuízo de dados cuja conservação seja exigida por lei ou necessária à defesa de direitos.</li>
              <li><strong>Limitação e Oposição:</strong> Pedir a limitação do tratamento ou opor-se a tratamentos baseados em interesse legítimo, nos termos legalmente aplicáveis.</li>
              <li><strong>Portabilidade:</strong> Solicitar os dados fornecidos em formato estruturado, de uso corrente e leitura automática, quando este direito seja aplicável.</li>
              <li><strong>Retirada do Consentimento:</strong> Retirar uma autorização a qualquer momento e com a mesma facilidade com que foi dada.</li>
              <li><strong>Reclamação:</strong> Apresentar reclamação à <a href="https://www.cnpd.pt/" target="_blank" rel="noopener noreferrer">Comissão Nacional de Proteção de Dados (CNPD)</a>, sem prejuízo de outros meios administrativos ou judiciais.</li>
            </ul>
            <p>Para exercer estes direitos, o Utilizador pode contactar <a href="mailto:suporte@noxvelia.com">suporte@noxvelia.com</a>. A NOXVELIA poderá solicitar informação estritamente necessária para confirmar a identidade e proteger a conta.</p>

            <h2><Icon path={mdiScaleBalance} size={1.1} color="#2ac1b4" /> 6. Faturação e Serviços Premium</h2>
            <p>
              Caso o Utilizador opte por adquirir serviços digitais (tais como "Destaques Premium" ou "Plano para Profissionais"), reconhece que se tratam de serviços de disponibilização imediata. Nos termos da legislação aplicável aos contratos celebrados à distância de conteúdos digitais (Decreto-Lei n.º 24/2014), o Utilizador consente que a prestação do serviço seja iniciada de imediato, <strong>perdendo assim o direito de livre resolução (direito de arrependimento) no prazo de 14 dias</strong>.
            </p>

            <h2><Icon path={mdiHandshakeOutline} size={1.1} color="#2ac1b4" /> 7. Foro Competente e Disposições Finais</h2>
            <p>
              A NOXVELIA reserva-se o direito de alterar os presentes Termos e Políticas a qualquer momento. Alterações substanciais serão notificadas na plataforma.
            </p>
            <p>
              Para a resolução de quaisquer litígios emergentes da interpretação ou aplicação do presente documento, é aplicável a lei portuguesa, sem prejuízo das normas imperativas de proteção do consumidor e das regras legais de competência territorial. Em litígios de consumo, o Utilizador pode recorrer a uma <a href="https://www.consumidor.gov.pt/consumidor_4/direitos-dos-consumidores1/conflitos-de-consumo" target="_blank" rel="noopener noreferrer">entidade de Resolução Alternativa de Litígios de Consumo oficialmente reconhecida</a> adequada ao caso concreto.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
