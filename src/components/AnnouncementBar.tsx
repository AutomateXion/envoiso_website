import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="annbar">
      <span className="ann-dot">
        <span className="ann-pulse" />
        <strong>Seasonal offer:</strong>&nbsp;50% off your first year on any annual plan.
      </span>
      <Link to="/pricing">See pricing &rarr;</Link>
      <a href="https://www.automatexion.com/xionconnect.html" className="ann-connect" aria-label="XionConnect" title="Also from Xion: XionConnect">
        <img src="/logo-connect-horizontal.png" alt="XionConnect" />
      </a>
      <a href="https://www.automatexion.com/xionwebstore.html" className="ann-connect" aria-label="Xion Webstore" title="Also from Xion: Xion Webstore">
        <img src="/logo-webstore-horizontal.png" alt="Xion Webstore" />
      </a>
    </div>
  );
}
