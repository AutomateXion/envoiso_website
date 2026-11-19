import { lazy, Suspense, useEffect } from 'react';
const Solution = lazy(() => import('./pages/Solution'));
import Seo from './components/Seo';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import Home from './pages/Home';
const Pricing = lazy(() => import('./pages/Pricing'));
const Compliance = lazy(() => import('./pages/Compliance'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const Partners = lazy(() => import('./pages/Partners'));
const PartnerDirectory = lazy(() => import('./pages/PartnerDirectory'));
const PartnerKit = lazy(() => import('./pages/PartnerKit'));
const Academy = lazy(() => import('./pages/Academy'));
const Legal = lazy(() => import('./pages/Legal'));
const AcademyCourse = lazy(() => import('./pages/AcademyCourse'));
const AcademyVerify = lazy(() => import('./pages/AcademyVerify'));
const NotFound = lazy(() => import('./pages/NotFound'));
import './styles/global.css';
import { initGA, trackPageview } from './lib/analytics';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    trackPageview(pathname);
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        // Wait a tick for the new page to render before scrolling.
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  // Load Fraunces + Inter once at the app level.
  useEffect(() => {
    const id = 'evx-fonts';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => {
    initGA();
  }, []);

  return (
    <div className="evx">
      <Seo />
      <ScrollManager />
      <AnnouncementBar />
      <Nav />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/directory" element={<PartnerDirectory />} />
        <Route path="/partners/kit" element={<PartnerKit />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/verify" element={<AcademyVerify />} />
        <Route path="/academy/verify/:code" element={<AcademyVerify />} />
        <Route path="/academy/:courseId" element={<AcademyCourse />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/solutions/:slug" element={<Solution />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
