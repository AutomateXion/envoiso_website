import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="annbar">
      <span className="ann-dot">
        <span className="ann-pulse" />
        <strong>Seasonal offer:</strong>&nbsp;50% off your first 6 months on any annual plan.
      </span>
      <Link to="/pricing">See pricing &rarr;</Link>
    </div>
  );
}
