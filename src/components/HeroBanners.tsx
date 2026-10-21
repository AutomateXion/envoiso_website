import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BANNERS } from '../data/banners';
import { trackClick } from '../lib/analytics';

const INTERVAL_MS = 6000;

export default function HeroBanners() {
  const n = BANNERS.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }, []);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  // auto-rotate; restarts whenever the slide changes so a manual click gets a full 6s
  useEffect(() => {
    if (paused || reduced.current || n < 2) return;
    const t = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(t);
  }, [i, paused, next, n]);

  // pause when the tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  if (n === 0) return null;

  return (
    <section
      className="hb"
      aria-roledescription="carousel"
      aria-label="Announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hb-viewport">
        <div className="hb-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {BANNERS.map((b, k) => {
            const cls = `hb-slide hb-${b.theme ?? 'navy'}${b.image ? ' hb-has-img' : ''}`;
            const ctaCls = 'btn btn-white hb-cta';
            const onCta = () => trackClick(`banner_${k + 1}_cta`, `Banner: ${b.title}`);
            return (
              <div
                className={cls}
                key={b.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${n}`}
                aria-hidden={k !== i}
                style={b.image ? { backgroundImage: `url(${b.image})` } : undefined}
              >
                <div className="hb-body">
                  <span className="hb-eyebrow">{b.eyebrow}</span>
                  <h2 className="hb-title">{b.title}</h2>
                  <p className="hb-text">{b.text}</p>
                  {b.cta.to ? (
                    <Link className={ctaCls} to={b.cta.to} onClick={onCta} tabIndex={k === i ? 0 : -1}>{b.cta.label}</Link>
                  ) : (
                    <a className={ctaCls} href={b.cta.href} target="_blank" rel="noopener noreferrer" onClick={onCta} tabIndex={k === i ? 0 : -1}>{b.cta.label}</a>
                  )}
                </div>
                {b.icon && !b.image && (
                  <div className="hb-art" aria-hidden="true">
                    <svg viewBox="0 0 48 48" dangerouslySetInnerHTML={{ __html: b.icon }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {n > 1 && (
        <>
          <button className="hb-arrow hb-prev" onClick={prev} aria-label="Previous announcement">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="hb-arrow hb-next" onClick={next} aria-label="Next announcement">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="hb-dots" role="tablist" aria-label="Choose announcement">
            {BANNERS.map((b, k) => (
              <button
                key={b.title}
                role="tab"
                aria-selected={k === i}
                aria-label={`Show announcement ${k + 1}: ${b.title}`}
                className={`hb-dot${k === i ? ' is-on' : ''}`}
                onClick={() => go(k)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
