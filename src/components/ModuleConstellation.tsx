import { useState } from 'react';
import { EVX_MODULES, EVX_MODULES_OUTER } from '../data/modules';

type Sel = { ring: 'inner' | 'outer'; i: number } | null;

export default function ModuleConstellation() {
  const [active, setActive] = useState<Sel>(null);
  const cx = 360, cy = 320;
  const R = 150, Ry = 140;       // inner ring
  const OR = 300, ORy = 250;     // outer ring
  const def = { n: 'One platform, every function', d: 'Hover or tap a module to see what it does. The outer ring is what most competitors don\u2019t bundle in \u2014 it\u2019s all included here.' };

  const info = active === null
    ? def
    : active.ring === 'inner' ? EVX_MODULES[active.i] : EVX_MODULES_OUTER[active.i];

  const innerPos = (i: number, n: number) => {
    const ang = (-90 + i * (360 / n)) * Math.PI / 180;
    return { x: cx + R * Math.cos(ang), y: cy + Ry * Math.sin(ang), ang };
  };
  const outerPos = (i: number, n: number) => {
    // offset so outer nodes sit *between* inner ones, not directly behind them
    const ang = (-90 + (360 / n) / 2 + i * (360 / n)) * Math.PI / 180;
    return { x: cx + OR * Math.cos(ang), y: cy + ORy * Math.sin(ang), ang };
  };

  return (
    <div className="evx-const">
      <svg viewBox="0 0 720 640" className="evx-const-svg" role="img" aria-label="Envoiso modules connected to a central core, with a second ring of standout modules">
        {/* outer ring lines (dashed) */}
        {EVX_MODULES_OUTER.map((_, i) => {
          const { x, y } = outerPos(i, EVX_MODULES_OUTER.length);
          const on = active?.ring === 'outer' && active.i === i;
          return <line key={'ol' + i} x1={cx} y1={cy} x2={x} y2={y} className={'evx-link evx-link-outer' + (on ? ' lit' : '')} />;
        })}
        {/* inner ring lines */}
        {EVX_MODULES.map((_, i) => {
          const { x, y } = innerPos(i, EVX_MODULES.length);
          const on = active?.ring === 'inner' && active.i === i;
          return <line key={'l' + i} x1={cx} y1={cy} x2={x} y2={y} className={'evx-link' + (on ? ' lit' : '')} />;
        })}

        {/* core */}
        <g>
          <circle cx={cx} cy={cy} r={44} fill="#0C2446" />
          <circle cx={cx} cy={cy} r={44} fill="none" stroke="#2E6DA4" strokeWidth={1.5} />
          <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="central"
            style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 30, fill: '#4A9BD2' }}>E</text>
          <text x={cx} y={cy + 24} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize: 9, fill: '#9fc4e2', letterSpacing: '.5px' }}>ENVOISO</text>
        </g>

        {/* inner ring nodes */}
        {EVX_MODULES.map((m, i) => {
          const { x, y } = innerPos(i, EVX_MODULES.length);
          const on = active?.ring === 'inner' && active.i === i;
          return (
            <g key={'n' + i} className="evx-node" tabIndex={0} role="button" aria-label={m.n + ': ' + m.d}
              onMouseEnter={() => setActive({ ring: 'inner', i })} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive({ ring: 'inner', i })} onBlur={() => setActive(null)} onClick={() => setActive({ ring: 'inner', i })}>
              <circle cx={x} cy={y} r={25} fill={on ? m.c + '1a' : '#ffffff'} stroke={m.c} strokeWidth={1.5} />
              <g transform={`translate(${x - 8.5}, ${y - 15.5})`}>
                <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={m.c} strokeWidth={1.8}
                  strokeLinecap="round" strokeLinejoin="round">
                  {m.icon.split(' M').map((seg, k) => <path key={k} d={(k === 0 ? seg : 'M' + seg)} />)}
                </svg>
              </g>
              <text x={x} y={y + 40} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 11, fontWeight: 500, fill: on ? m.c : '#5B7186' }}>{m.n}</text>
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
              <circle cx={x} cy={y} r={30} fill={on ? m.c + '1a' : '#ffffff'} stroke={m.c} strokeWidth={1.5} strokeDasharray="3 2.5" />
              <g transform={`translate(${x - 10}, ${y - 17})`}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={m.c} strokeWidth={1.7}
                  strokeLinecap="round" strokeLinejoin="round">
                  {m.icon.split(' M').map((seg, k) => <path key={k} d={(k === 0 ? seg : 'M' + seg)} />)}
                </svg>
              </g>
              <circle cx={x + 20} cy={y - 20} r={7} fill="#fff" stroke={m.c} strokeWidth={1.3} />
              <text x={x + 20} y={y - 19.5} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 9, fontWeight: 700, fill: m.c }}>+</text>
              <text x={x} y={y + 47} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 11.5, fontWeight: 600, fill: on ? m.c : '#33495d' }}>{m.n}</text>
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
