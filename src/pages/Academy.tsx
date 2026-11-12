import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COURSES, courseMinutes, PASS_MARK } from '../data/academy';

export default function Academy() {
  const nav = useNavigate();
  const [code, setCode] = useState('');
  const go = (e: React.FormEvent) => { e.preventDefault(); const c = code.trim().toUpperCase(); if (c) nav(`/academy/verify/${encodeURIComponent(c)}`); };
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eb-pill eyebrow"><span className="dot" />XionERP Academy</span>
        <h1 className="page-h">Learn XionERP. Get certified. Free.</h1>
        <p className="page-sub">Short courses for customers and partners. Read the lessons in your own time, pass a ten-question quiz, and download your certificate.</p>
      </div></section>

      <section className="sol-sec"><div className="wrap">
        <div className="sec-eyebrow">Courses</div>
        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', marginTop: 14 }}>
          {COURSES.map((c) => (
            <div key={c.id} className="fw-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="sec-eyebrow">{c.audience}</div>
              <h2 style={{ margin: 0 }}>{c.title}</h2>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>{c.blurb}</p>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)' }}>{c.lessons.length} lessons · about {courseMinutes(c)} minutes · quiz and certificate</p>
              <div style={{ marginTop: 'auto', paddingTop: 8 }}><Link className="btn btn-primary" to={`/academy/${c.id}`}>Start the course</Link></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ maxWidth: 820 }}>
        <div className="sec-eyebrow">How it works</div>
        <ol style={{ lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Read the lessons. Your place is kept in this browser, so you can stop and come back.</li>
          <li>Take the quiz at the end. Ten questions; you need {PASS_MARK}% to pass, and you can retake it as often as you like.</li>
          <li>Enter your name and email. We send your certificate and show it on screen to download as a PDF or an image.</li>
          <li>Anyone can check your certificate with its code.</li>
        </ol>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>We use your email only to send your certificate. The courses are free and open to everyone. Partners can also <Link to="/partners">find out how to become one</Link>.</p>
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ maxWidth: 820 }}>
        <div className="sec-eyebrow">Check a certificate</div>
        <form onSubmit={go} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          <input aria-label="Certificate code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="XC-XXXXXXXXXX"
            style={{ flex: '1 1 240px', padding: '11px 12px', border: '1px solid var(--line)', borderRadius: 8, font: 'inherit' }} />
          <button className="btn btn-ghost" type="submit">Check</button>
        </form>
      </div></section>
    </>
  );
}
