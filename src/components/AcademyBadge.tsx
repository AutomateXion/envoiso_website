import { Link } from 'react-router-dom';

// The Academy's own mark and name, linked to the Academy page.
export default function AcademyBadge({ suffix }: { suffix?: string }) {
  return (
    <span className="eb-pill eyebrow academy-badge">
      <Link to="/academy" aria-label="XionERP Academy">
        <img src="/mark-academy.png" alt="" width={22} height={22} />
        <span>XionERP Academy</span>
      </Link>
      {suffix && <span className="academy-badge-suffix">{suffix}</span>}
    </span>
  );
}
