import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTransitionKey((current) => current + 1);
  }, [location.pathname, location.search]);

  return (
    <div className="nx-page-transition" aria-hidden="true" key={transitionKey}>
      <style>{`
        .nx-page-transition {
          position: fixed;
          inset: 0;
          z-index: 100000;
          pointer-events: none;
        }

        .nx-route-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left center;
          opacity: 0;
          background: linear-gradient(90deg, #d9c49c, #f0dfbb 45%, #102f50);
          box-shadow: 0 0 18px rgba(217, 196, 156, 0.26);
          animation: nx-route-bar 480ms ease-out forwards;
        }

        .nx-route-veil {
          position: fixed;
          inset: 0;
          opacity: 0;
          background: rgba(7, 19, 38, 0.08);
          animation: nx-route-veil 360ms ease-out forwards;
        }

        @keyframes nx-route-bar {
          0% { transform: scaleX(0); opacity: 0; }
          18% { opacity: 1; }
          78% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }

        @keyframes nx-route-veil {
          0% { opacity: 0; }
          32% { opacity: .08; }
          100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nx-route-bar,
          .nx-route-veil {
            display: none;
          }
        }
      `}</style>
      <span className="nx-route-veil" />
      <span className="nx-route-bar" />
    </div>
  );
}