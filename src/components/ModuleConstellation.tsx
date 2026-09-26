import { useState } from 'react';
import { EVX_MODULES, EVX_MODULES_OUTER } from '../data/modules';

type Sel = { ring: 'inner' | 'outer'; i: number } | null;

export default function ModuleConstellation() {
  const [active, setActive] = useState<Sel>(null);
  const cx = 360, cy = 340;
  const R = 150;   // inner ring radius (true circle, so the visible ring lines up exactly)
  const OR = 280;  // outer ring radius
  const def = { n: 'One platform, every function', d: 'Hover or tap a module to see what it does. The outer ring is what most competitors don\u2019t bundle in \u2014 it\u2019s all included here.' };

  const info = active === null
    ? def
    : active.ring === 'inner' ? EVX_MODULES[active.i] : EVX_MODULES_OUTER[active.i];

  const innerPos = (i: number, n: number) => {
    const ang = (-90 + i * (360 / n)) * Math.PI / 180;
    return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) };
  };
  const outerPos = (i: number, n: number) => {
    // offset so outer nodes sit *between* inner ones, not directly behind them
    const ang = (-90 + (360 / n) / 2 + i * (360 / n)) * Math.PI / 180;
    return { x: cx + OR * Math.cos(ang), y: cy + OR * Math.sin(ang) };
  };

  return (
    <div className="evx-const">
      <svg viewBox="0 0 720 700" className="evx-const-svg" role="img" aria-label="Xion ERP modules connected to a central core, with a second ring of standout modules">
        {/* visible, slowly-rotating orbit rings (decorative — nodes themselves stay fixed in place) */}
        <circle cx={cx} cy={cy} r={R} className="evx-ring evx-ring-inner" />
        <circle cx={cx} cy={cy} r={OR} className="evx-ring evx-ring-outer" />

        {/* outer ring connector lines */}
        {EVX_MODULES_OUTER.map((_, i) => {
          const { x, y } = outerPos(i, EVX_MODULES_OUTER.length);
          const on = active?.ring === 'outer' && active.i === i;
          return <line key={'ol' + i} x1={cx} y1={cy} x2={x} y2={y} className={'evx-link evx-link-outer' + (on ? ' lit' : '')} />;
        })}
        {/* inner ring connector lines */}
        {EVX_MODULES.map((_, i) => {
          const { x, y } = innerPos(i, EVX_MODULES.length);
          const on = active?.ring === 'inner' && active.i === i;
          return <line key={'l' + i} x1={cx} y1={cy} x2={x} y2={y} className={'evx-link' + (on ? ' lit' : '')} />;
        })}

        {/* core */}
        <g>
          <defs>
            <clipPath id="evx-core-clip">
              <circle cx={cx} cy={cy} r={44} />
            </clipPath>
          </defs>
          <image href="/mark-reversed.jpg" x={cx - 44} y={cy - 44} width={88} height={88}
            clipPath="url(#evx-core-clip)" preserveAspectRatio="xMidYMid slice" />
          <circle cx={cx} cy={cy} r={44} fill="none" stroke="#5090F1" strokeWidth={1.5} />
        </g>

        {/* inner ring nodes */}
        {EVX_MODULES.map((m, i) => {
          const { x, y } = innerPos(i, EVX_MODULES.length);
          const on = active?.ring === 'inner' && active.i === i;
          return (
            <g key={'n' + i} className="evx-node" tabIndex={0} role="button" aria-label={m.n + ': ' + m.d}
              onMouseEnter={() => setActive({ ring: 'inner', i })} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive({ ring: 'inner', i })} onBlur={() => setActive(null)} onClick={() => setActive({ ring: 'inner', i })}>
              <circle cx={x} cy={y} r={27} fill="#ffffff" stroke={on ? '#5090F1' : '#D8E2EC'} strokeWidth={on ? 2 : 1.5}
                style={{ filter: 'drop-shadow(0 2px 6px rgba(16,48,128,0.12))' }} />
              <g transform={`translate(${x - 17}, ${y - 17}) scale(${34 / 48})`}
                dangerouslySetInnerHTML={{ __html: m.svg }} />
              <text x={x} y={y + 43} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 11, fontWeight: on ? 700 : 500, fill: on ? '#103080' : '#5B7186' }}>{m.n}</text>
            </g>
          );
        })}

        {/* outer ring nodes */}
        {EVX_MODULES_OUTER.map((m, i) => {
          const { x, y } = outerPos(i, EVX_MODULES_OUTER.length);
          const on = active?.ring === 'outer' && active.i === i;
          return (
            <g key={'on' + i} className="evx-node" tabIndex={0} role="button" aria-label={m.n + ' (differentiator): ' + m.d}
              onMouseEnter={() => setActive({ ring: 'outer', i })} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive({ ring: 'outer', i })} onBlur={() => setActive(null)} onClick={() => setActive({ ring: 'outer', i })}>
              <circle cx={x} cy={y} r={32} fill="#ffffff" stroke={on ? '#E4572E' : '#F4CBB5'} strokeWidth={on ? 2 : 1.5} strokeDasharray="3 2.5"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(16,48,128,0.12))' }} />
              <g transform={`translate(${x - 19}, ${y - 19}) scale(${38 / 48})`}
                dangerouslySetInnerHTML={{ __html: m.svg }} />
              <circle cx={x + 22} cy={y - 22} r={7.5} fill="#fff" stroke="#E4572E" strokeWidth={1.3} />
              <text x={x + 22} y={y - 21.5} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 9, fontWeight: 700, fill: '#E4572E' }}>+</text>
              <text x={x} y={y + 49} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 11.5, fontWeight: 700, fill: on ? '#B8390F' : '#33495d' }}>{m.n}</text>
            </g>
          );
        })}
      </svg>
      <div className="evx-const-info">
        {active?.ring === 'outer' && <span className="evx-const-badge">Not typically bundled elsewhere</span>}
        <h4>{info.n}</h4>
        <p>{info.d}</p>
      </div>
    </div>
  );
}
