import { useState } from 'react';
import { EVX_MODULES } from '../data/modules';

export default function ModuleConstellation() {
  const [active, setActive] = useState<number | null>(null);
  const cx = 320, cy = 250, R = 190, Ry = 170;
  const def = { n: 'One platform, every function', d: 'Hover or tap a module to see what it does. They all share the same data, so your numbers, stock and customers stay in sync.' };
  const info = active === null ? def : EVX_MODULES[active];

  return (
    <div className="evx-const">
      <svg viewBox="0 0 640 520" className="evx-const-svg" role="img" aria-label="Envoiso modules connected to a central core">
        {EVX_MODULES.map((_, i) => {
          const ang = (-90 + i * (360 / EVX_MODULES.length)) * Math.PI / 180;
          const x = cx + R * Math.cos(ang), y = cy + Ry * Math.sin(ang);
          return <line key={'l' + i} x1={cx} y1={cy} x2={x} y2={y} className={'evx-link' + (active === i ? ' lit' : '')} />;
        })}
        <g style={{ cursor: 'default' }}>
          <circle cx={cx} cy={cy} r={44} fill="#0C2446" />
          <circle cx={cx} cy={cy} r={44} fill="none" stroke="#2E6DA4" strokeWidth={1.5} />
          <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="central"
            style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 30, fill: '#4A9BD2' }}>E</text>
          <text x={cx} y={cy + 24} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize: 9, fill: '#9fc4e2', letterSpacing: '.5px' }}>ENVOISO</text>
        </g>
        {EVX_MODULES.map((m, i) => {
          const ang = (-90 + i * (360 / EVX_MODULES.length)) * Math.PI / 180;
          const x = cx + R * Math.cos(ang), y = cy + Ry * Math.sin(ang);
          const on = active === i;
          return (
            <g key={'n' + i} className="evx-node" tabIndex={0} role="button" aria-label={m.n + ': ' + m.d}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)} onBlur={() => setActive(null)} onClick={() => setActive(i)}>
              <circle cx={x} cy={y} r={26} fill={on ? m.c + '1a' : '#ffffff'} stroke={m.c} strokeWidth={1.5} />
              <g transform={`translate(${x - 9}, ${y - 16})`}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={m.c} strokeWidth={1.8}
                  strokeLinecap="round" strokeLinejoin="round">
                  {m.icon.split(' M').map((seg, k) => <path key={k} d={(k === 0 ? seg : 'M' + seg)} />)}
                </svg>
              </g>
              <text x={x} y={y + 42} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 11.5, fontWeight: 500, fill: on ? m.c : '#5B7186' }}>{m.n}</text>
            </g>
          );
        })}
      </svg>
      <div className="evx-const-info">
        <h4>{info.n}</h4>
        <p>{info.d}</p>
      </div>
    </div>
  );
}
