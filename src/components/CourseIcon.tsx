// One accent colour and one icon per Academy course, so each card is recognisable at a glance.
const P: Record<string, { c: string; d: string; tag: string }> = {
  fundamentals: { c: '#2563eb', tag: 'Everyone', d: 'M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z' },
  operations: { c: '#d97706', tag: 'Sales, purchasing, stock', d: 'M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8' },
  finance: { c: '#059669', tag: 'Accounts and finance', d: 'M5 3h14v18H5zM8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0' },
  admin: { c: '#7c3aed', tag: 'Administrators', d: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4' },
  partner: { c: '#0d9488', tag: 'New partners', d: 'M16 11a4 4 0 1 0-8 0M4 21a8 8 0 0 1 16 0M12 3v0' },
  'partner-sales': { c: '#ea580c', tag: 'Partner sales', d: 'M3 17l6-6 4 4 8-8M15 7h6v6' },
  'partner-implementation': { c: '#4f46e5', tag: 'Partner implementation', d: 'M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z' },
  'partner-support': { c: '#0284c7', tag: 'Partner support', d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5.6 5.6l3.2 3.2M15.2 15.2l3.2 3.2M18.4 5.6l-3.2 3.2M8.8 15.2l-3.2 3.2' },
};
export const courseAccent = (id: string) => P[id]?.c ?? '#2563eb';
export const courseTag = (id: string) => P[id]?.tag ?? '';
export default function CourseIcon({ id }: { id: string }) {
  const p = P[id]; if (!p) return null;
  return (
    <span className="course-icon" style={{ background: p.c + '1a', color: p.c }}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.d} /></svg>
    </span>
  );
}
