import React from 'react';

export default function LoadingScreen({
  label = 'A preparar a NOXVELIA',
  detail = 'Só um momento.',
  minHeight = '60vh',
}) {

  return (
    <div className="nx-loading-screen light" style={{ minHeight }} role="status" aria-live="polite">
      <style>{`
        .nx-loading-screen,
        .nx-loading-screen * {
          box-sizing: border-box;
        }

        .nx-loading-screen {
          width: 100%;
          display: grid;
          place-items: center;
          padding: 32px 20px;
          font-family: var(--nx-font-body, Inter, ui-sans-serif, system-ui, sans-serif);
        }


        .nx-loading-screen.light {
          color: #102326;
          background: #f4f7f3;
        }

        .nx-loading-card {
          width: min(360px, 100%);
          display: grid;
          justify-items: center;
          gap: 14px;
          text-align: center;
        }

        .nx-loading-mark {
          position: relative;
          width: 82px;
          height: 82px;
          display: grid;
          place-items: center;
        }

        .nx-loading-mark::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid rgba(217, 196, 156, 0.24);
          border-top-color: #d9c49c;
          border-radius: 50%;
          animation: nx-loading-spin 1.1s linear infinite;
        }

        .nx-loading-mark::after {
          content: "";
          position: absolute;
          inset: 9px;
          border: 1px solid rgba(198, 168, 106, 0.22);
          border-bottom-color: #c6a86a;
          border-radius: 50%;
          animation: nx-loading-spin 1.7s linear infinite reverse;
        }

        .nx-loading-logo {
          position: relative;
          z-index: 1;
          width: 46px;
          height: 46px;
          display: block;
          object-fit: contain;
        }

        .nx-loading-title {
          margin: 4px 0 0;
          color: inherit;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .nx-loading-detail {
          margin: 0;
          color: currentColor;
          opacity: 0.72;
          font-size: 13px;
          line-height: 1.55;
        }

        @keyframes nx-loading-spin {
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .nx-loading-mark::before,
          .nx-loading-mark::after {
            animation: none;
          }
        }
      `}</style>
      <div className="nx-loading-card">
        <span className="nx-loading-mark" aria-hidden="true">
          <img className="nx-loading-logo" src="/logo-noxvelia.png" alt="" />
        </span>
        <div>
          <p className="nx-loading-title">{label}</p>
          {detail && <p className="nx-loading-detail">{detail}</p>}
        </div>
      </div>
    </div>
  );
}
