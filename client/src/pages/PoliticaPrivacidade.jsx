import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function PoliticaPrivacidade() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        
        .legal-alert { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #ef4444; padding: 24px; border-radius: 8px; margin: 32px 0; font-size: 14.5px; color: #7f1d1d; text-align: justify; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.05); }
        .legal-alert strong { color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        
        .legal-info-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 24px 0; font-size: 14px; color: #475569; }
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
            <p className="legal-subtitle">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
          </div>

          <div className="legal-content">
            <div className="legal-info-box">
              <strong>Entidade Responsável:</strong> Diogo Moreira<br />
              <strong>Sede:</strong> Lousada, Porto, Portugal<br />
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
              O tratamento de dados pessoais é realizado em estrita conformidade com o <strong>Regulamento (UE) 2016/679 (RGPD)</strong> e com a Lei n.º 58/2019 de 8 de agosto. O titular dos dados e responsável pelo tratamento é Diogo Moreira.
            </p>
            <h3>3.1. Dados Recolhidos e Finalidade</h3>
            <ul>
              <li><strong>Dados de Registo:</strong> Nome, E-mail, Telemóvel, Password (com forte encriptação *hash*). Para profissionais: Nome da Empresa, NIF e Website. Estes dados servem para autenticação e gestão da conta.</li>
              <li><strong>Dados de Anúncio e Transacionais:</strong> Fotos, localizações (cidade/distrito), descrições, VIN (Número de Chassi). A finalidade é a publicação da oferta na plataforma.</li>
              <li><strong>Partilha de Contactos:</strong> Ao publicar um anúncio, o Utilizador consente de forma explícita que o seu número de telemóvel e endereço de e-mail sejam <strong>exibidos publicamente</strong> aos visitantes da plataforma que solicitem ver os contactos do vendedor.</li>
            </ul>

            <h3>3.2. Partilha de Dados com Terceiros</h3>
            <p>A NOXVELIA não vende, aluga ou cede os seus dados a empresas de marketing. No entanto, os dados poderão ser comunicados nas seguintes situações:</p>
            <ul>
              <li><strong>Autoridades Judiciais e Policiais:</strong> Em caso de suspeita de fraude informática, lavagem de dinheiro ou ordem judicial, a NOXVELIA cooperará integralmente, fornecendo os IPs e dados de registo às autoridades competentes (Polícia Judiciária, Ministério Público).</li>
              <li><strong>Prestadores de Serviços:</strong> Serviços de alojamento web e gateways de pagamento (ex: Stripe ou similares, caso aplicável a destaques premium), que estão igualmente vinculados ao RGPD.</li>
            </ul>

            <h2><Icon path={mdiCookieOutline} size={1.1} color="#2ac1b4" /> 4. Política de Cookies</h2>
            <p>A plataforma utiliza pequenos ficheiros de texto (cookies) armazenados no dispositivo do Utilizador para melhorar o desempenho e a usabilidade.</p>
            <ul>
              <li><strong>Cookies Estritamente Necessários:</strong> Permitem a navegação no site, gestão da sessão (login seguro) e a lembrança de escolhas estruturais (como a navegação entre a aba "Drive" e "Estate"). Não requerem consentimento por serem essenciais ao fornecimento do serviço.</li>
              <li><strong>Cookies Analíticos:</strong> Utilizados de forma agregada e anónima para analisar o volume de tráfego, interações nos anúncios e erros da página.</li>
            </ul>
            <p>O Utilizador pode, a qualquer momento, configurar o seu navegador de internet para bloquear cookies, tendo a consciência de que partes críticas da plataforma (como a submissão de anúncios) poderão não funcionar.</p>

            <h2><Icon path={mdiFileDocumentOutline} size={1.1} color="#2ac1b4" /> 5. Os Seus Direitos enquanto Titular de Dados</h2>
            <p>Ao abrigo do RGPD, a qualquer momento, o Utilizador possui o direito de:</p>
            <ul>
              <li><strong>Acesso e Retificação:</strong> Aceder aos seus dados e alterá-los diretamente no painel "O Meu Perfil".</li>
              <li><strong>Apagamento ("Direito ao Esquecimento"):</strong> Solicitar a eliminação imediata da sua conta. Ao eliminar a conta, todos os anúncios, imagens e dados pessoais associados serão apagados permanentemente das bases de dados ativas da NOXVELIA.</li>
              <li><strong>Oposição e Portabilidade:</strong> Opor-se a tratamentos específicos ou solicitar os seus dados em formato estruturado.</li>
            </ul>

            <h2><Icon path={mdiScaleBalance} size={1.1} color="#2ac1b4" /> 6. Faturação e Serviços Premium</h2>
            <p>
              Caso o Utilizador opte por adquirir serviços digitais (tais como "Destaques Premium" ou "Plano para Profissionais"), reconhece que se tratam de serviços de disponibilização imediata. Nos termos da legislação aplicável aos contratos celebrados à distância de conteúdos digitais (Decreto-Lei n.º 24/2014), o Utilizador consente que a prestação do serviço seja iniciada de imediato, <strong>perdendo assim o direito de livre resolução (direito de arrependimento) no prazo de 14 dias</strong>.
            </p>

            <h2><Icon path={mdiHandshakeOutline} size={1.1} color="#2ac1b4" /> 7. Foro Competente e Disposições Finais</h2>
            <p>
              A NOXVELIA reserva-se o direito de alterar os presentes Termos e Políticas a qualquer momento. Alterações substanciais serão notificadas na plataforma.
            </p>
            <p>
              Para a resolução de quaisquer litígios emergentes da interpretação ou aplicação do presente documento, é exclusivamente competente a lei portuguesa e o foro da <strong>Comarca do Porto</strong>, com expressa renúncia a qualquer outro. Em litígios de consumo, o Utilizador dispõe também do recurso à plataforma Europeia de Resolução de Litígios em Linha (RLL).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}