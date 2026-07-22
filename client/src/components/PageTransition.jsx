import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { gsap } from 'gsap';

export default function PageTransition() {
  const location = useLocation();
  const barRef = useRef(null);
  const veilRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const main = document.querySelector('main');
    const ctx = gsap.context(() => {
      if (main) {
        gsap.fromTo(main, {
          opacity: 0.975,
          y: 10,
          filter: 'blur(4px)',
        }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.42,
          ease: 'power2.out',
          clearProps: 'opacity,transform,filter',
        });
      }

      gsap.fromTo(
        '[data-nx-page-reveal], .pesquisa-command, .pesquisa-sidebar, .pesquisa-topbar, .nxc-wrap, .auth-card, .pub-form, .pl-card, .pro-card, .perfil-moldura, .legal-container, .pp-user-section, .title-block, .gallery-wrap, .price-panel',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.48, stagger: 0.026, ease: 'power2.out', clearProps: 'opacity,transform' },
      );
    });

    const barAnimation = barRef.current ? animate(barRef.current, {
      scaleX: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      duration: 760,
      ease: 'outCubic',
    }) : null;

    const veilAnimation = veilRef.current ? animate(veilRef.current, {
      opacity: [0, 0.18, 0],
      duration: 620,
      ease: 'outQuad',
    }) : null;

    return () => {
      ctx.revert();
      barAnimation?.pause?.();
      veilAnimation?.pause?.();
    };
  }, [location.pathname, location.search]);

  return (
    <div className="nx-page-transition" aria-hidden="true">
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
          box-shadow: 0 0 24px rgba(217, 196, 156, 0.34);
        }

        .nx-route-veil {
          position: fixed;
          inset: 0;
          opacity: 0;
          background: radial-gradient(circle at 18% 0%, rgba(217, 196, 156, 0.42), transparent 34%), rgba(7, 19, 38, 0.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .nx-route-bar,
          .nx-route-veil {
            display: none;
          }
        }
      `}</style>
      <span ref={veilRef} className="nx-route-veil" />
      <span ref={barRef} className="nx-route-bar" />
    </div>
  );
}