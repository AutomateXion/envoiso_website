export default function HeroMockup() {
  return (
    <div className="hero-shot-fallback">
      <svg viewBox="0 0 1080 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Envoiso dashboard showing revenue, invoices and stock in one view" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#0C2446" floodOpacity="0.18" />
          </filter>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A9BD2" />
            <stop offset="100%" stopColor="#2E6DA4" />
          </linearGradient>
        </defs>

        {/* window chrome */}
        <g filter="url(#soft-shadow)">
          <rect x="20" y="20" width="1040" height="580" rx="16" fill="#fff" stroke="#D8E2EC" />
          <rect x="20" y="20" width="1040" height="46" rx="16" fill="#F7F9FB" stroke="#D8E2EC" />
          <rect x="20" y="50" width="1040" height="16" fill="#F7F9FB" />
          <circle cx="46" cy="43" r="5.5" fill="#E3AFA6" />
          <circle cx="64" cy="43" r="5.5" fill="#E7CFA0" />
          <circle cx="82" cy="43" r="5.5" fill="#A9D3B5" />
          <rect x="440" y="33" width="200" height="20" rx="6" fill="#fff" stroke="#D8E2EC" />
          <text x="540" y="47" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#5B7186">app.envoiso.com</text>
        </g>

        {/* sidebar */}
        <rect x="20" y="66" width="76" height="534" fill="#0C2446" />
        {['M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z','M4 7l8-5 8 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z','M3 3v18h18 M7 14l4-4 3 3 5-6','M9 7h6 M9 11h6 M9 15h4 M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z','M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'].map((d, i) => (
          <g key={i} transform={`translate(46, ${104 + i * 56})`}>
            <rect x="-14" y="-14" width="28" height="28" rx="8" fill={i === 0 ? 'rgba(74,155,210,.22)' : 'transparent'} />
            <g transform="translate(-10,-10)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? '#4A9BD2' : '#5B7A99'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {d.split(' M').map((seg, k) => <path key={k} d={k === 0 ? seg : 'M' + seg} />)}
              </svg>
            </g>
          </g>
        ))}

        {/* top KPI row */}
        {[
          { label: 'Revenue (MTD)', value: 'OMR 48,210', delta: '+12.4%', x: 116 },
          { label: 'Open invoices', value: '37', delta: '−6', x: 116 + 300 },
          { label: 'Stock value', value: 'OMR 162,940', delta: '+3.1%', x: 116 + 600 },
        ].map((k, i) => (
          <g key={i}>
            <rect x={k.x} y="86" width="284" height="86" rx="12" fill="#F7F9FB" stroke="#EEF3F8" />
            <text x={k.x + 20} y="112" fontFamily="Inter, sans-serif" fontSize="11.5" fill="#5B7186">{k.label}</text>
            <text x={k.x + 20} y="142" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="22" fill="#0C2446">{k.value}</text>
            <text x={k.x + 20} y="160" fontFamily="Inter, sans-serif" fontSize="11" fill="#1E7D4F">{k.delta}</text>
          </g>
        ))}

        {/* bar chart */}
        <rect x="116" y="192" width="560" height="230" rx="14" fill="#fff" stroke="#EEF3F8" />
        <text x="140" y="222" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="15" fill="#0C2446">Sales vs. target</text>
        {[62, 88, 54, 96, 70, 110, 84, 130, 95, 74, 118, 100].map((h, i) => (
          <rect key={i} x={140 + i * 44} y={392 - h} width="24" rx="4" height={h} fill="url(#bar-grad)" opacity={i === 10 ? 1 : 0.55 + (i % 3) * 0.08} />
        ))}
        <line x1="140" y1="392" x2="656" y2="392" stroke="#D8E2EC" />

        {/* invoice list */}
        <rect x="696" y="192" width="324" height="230" rx="14" fill="#fff" stroke="#EEF3F8" />
        <text x="718" y="222" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="15" fill="#0C2446">Recent invoices</text>
        {[
          { n: 'INV-2026-0847', s: 'Paid', c: '#1E7D4F', bg: '#E8F3EC' },
          { n: 'INV-2026-0846', s: 'Fawtara sent', c: '#2E6DA4', bg: '#E9F1F8' },
          { n: 'INV-2026-0845', s: 'Overdue', c: '#B4590A', bg: '#FDEFE3' },
          { n: 'INV-2026-0844', s: 'Paid', c: '#1E7D4F', bg: '#E8F3EC' },
        ].map((row, i) => (
          <g key={i} transform={`translate(718, ${244 + i * 42})`}>
            <text x="0" y="0" fontFamily="Inter, sans-serif" fontSize="12.5" fill="#33495d">{row.n}</text>
            <rect x="188" y="-14" width="94" height="22" rx="100" fill={row.bg} />
            <text x="235" y="1" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="600" fill={row.c}>{row.s}</text>
          </g>
        ))}

        {/* bottom strip: module chips */}
        <rect x="116" y="440" width="904" height="1" fill="#EEF3F8" />
        {['Accounting', 'CRM', 'Inventory', 'Projects', 'Fawtara'].map((m, i) => (
          <g key={i} transform={`translate(${116 + i * 186}, 466)`}>
            <rect width="170" height="60" rx="12" fill="#F7F9FB" stroke="#EEF3F8" />
            <circle cx="26" cy="30" r="9" fill="#fff" stroke="#4A9BD2" />
            <text x="46" y="34" fontFamily="Inter, sans-serif" fontSize="12.5" fontWeight="600" fill="#0C2446">{m}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
