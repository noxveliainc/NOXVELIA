import { trackFunnelEvent } from '../utils/funnelAnalytics';

const CONTACT_EMAIL = 'geral@noxvelia.com';

const createContactUrl = (zoneName) => {
  const subject = encodeURIComponent(`Patrocínio Noxvelia | ${zoneName}`);
  const body = encodeURIComponent(
    `Olá,\n\nTenho interesse em conhecer as zonas de patrocínio da Noxvelia.\n\nMarca/empresa:\nZona pretendida:\nPeríodo:\n\nObrigado.`
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

export default function SponsorOpportunity({
  placement,
  zoneName = 'Landing',
  title = 'A tua marca pode aparecer aqui.',
  description = 'Alcança pessoas que procuram carros e imóveis em Portugal. Fala connosco sobre uma campanha patrocinada.',
  className = '',
}) {
  return (
    <aside
      className={`nx-sponsor-opportunity ${className}`.trim()}
      data-sponsor-placement={placement}
      aria-label={`Espaço de patrocínio ${zoneName}`}
    >
      <style>{`
        .nx-sponsor-opportunity {
          width: min(1260px, calc(100% - 48px));
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 24px;
          margin: 24px auto;
          padding: 18px 22px;
          border: 1px solid #cfdad6;
          border-left: 3px solid #24b8ab;
          border-radius: 8px;
          background: #ffffff;
          color: #102326;
        }

        .nx-sponsor-opportunity-label {
          display: block;
          margin-bottom: 6px;
          color: #16776f;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .nx-sponsor-opportunity-title {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.2;
        }

        .nx-sponsor-opportunity-description {
          max-width: 720px;
          margin: 6px 0 0;
          color: #617277;
          font-size: 13px;
          line-height: 1.5;
        }

        .nx-sponsor-opportunity-link {
          color: #102326;
          font-size: 13px;
          font-weight: 800;
          text-underline-offset: 4px;
          white-space: nowrap;
        }

        .nx-sponsor-opportunity-link:hover {
          color: #16776f;
        }

        @media (max-width: 700px) {
          .nx-sponsor-opportunity {
            width: calc(100% - 32px);
            grid-template-columns: 1fr;
            gap: 12px;
            margin: 18px auto;
            padding: 16px 18px;
          }

          .nx-sponsor-opportunity-link {
            width: fit-content;
          }
        }
      `}</style>

      <div>
        <span className="nx-sponsor-opportunity-label">Espaço de patrocínio · {zoneName}</span>
        <h2 className="nx-sponsor-opportunity-title">{title}</h2>
        <p className="nx-sponsor-opportunity-description">{description}</p>
      </div>
      <a
        className="nx-sponsor-opportunity-link"
        href={createContactUrl(zoneName)}
        onClick={() => trackFunnelEvent('sponsor_contact_click')}
      >
        Falar sobre patrocínio <span aria-hidden="true">&rarr;</span>
      </a>
    </aside>
  );
}
