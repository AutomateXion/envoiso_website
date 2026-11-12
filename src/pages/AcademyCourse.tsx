import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { COURSES, courseById, courseMinutes, PASS_MARK, type Block, type Course } from '../data/academy';
import { INTROS, UPDATED } from '../data/academy-intros';

const API = 'https://cloud.xionerp.com/api/v1/public/academy';
const inp: React.CSSProperties = { width: '100%', padding: '11px 12px', border: '1px solid var(--line)', borderRadius: 8, font: 'inherit', background: '#fff', color: 'var(--ink)' };

type Saved = { done: string[]; at: number };
const keyOf = (id: string) => `xion_academy_${id}`;
const read = (id: string): Saved => { try { const v = JSON.parse(localStorage.getItem(keyOf(id)) || ''); if (v && Array.isArray(v.done)) return v; } catch { /* none */ } return { done: [], at: 0 }; };
const write = (id: string, v: Saved) => { try { localStorage.setItem(keyOf(id), JSON.stringify(v)); } catch { /* the course still works until the tab closes */ } };

/* Signed in with Google or LinkedIn: the server's signed pass. The site only
   reads the name and email from it; the server checks the signature. */
type Learner = { token: string; email: string; name: string; p: 'google' | 'linkedin'; exp: number };
const LEARNER_KEY = 'xion_academy_learner';
const decode = (token: string): Learner | null => {
  try {
    const b = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
    const v = JSON.parse(decodeURIComponent(escape(atob(b))));
    if (!v?.email || !v?.exp || v.exp * 1000 < Date.now() + 3600_000) return null;   // an hour left at least, or sign in again
    return { token, email: v.email, name: v.name || '', p: v.p, exp: v.exp };
  } catch { return null; }
};
const readLearner = (): Learner | null => { try { const t = localStorage.getItem(LEARNER_KEY); return t ? decode(t) : null; } catch { return null; } };
const PROVIDER = { google: 'Google', linkedin: 'LinkedIn' } as const;

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>);
const LinkedInMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#fff"/><path fill="#0A66C2" d="M6.9 9.4H4.2V19h2.7V9.4zM5.6 5a1.6 1.6 0 1 0 0 3.1 1.6 1.6 0 0 0 0-3.1zM19.8 13.5c0-2.6-1.4-4.3-3.8-4.3-1.3 0-2.2.7-2.6 1.4V9.4h-2.6V19h2.7v-5c0-1.3.4-2.4 1.8-2.4s1.7 1.2 1.7 2.5V19h2.8v-5.5z"/></svg>);

async function post(path: string, body: unknown) {
  const r = await fetch(`${API}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e: any = new Error(r.status === 429 ? 'Too many attempts. Please wait a few minutes.' : (Array.isArray(j.message) ? j.message.join(' · ') : j.message) || 'Something went wrong. Please try again.'); e.status = r.status; throw e; }
  return j;
}

function BlockView({ b }: { b: Block }) {
  if (b.t === 'p') return <p style={{ lineHeight: 1.75, margin: '0 0 14px' }}>{b.text}</p>;
  if (b.t === 'ul') return <ul style={{ lineHeight: 1.7, margin: '0 0 14px', paddingLeft: 20, display: 'grid', gap: 8 }}>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  /* Pictures of the real screen (sample data). Clicking one opens it full size. */
  if (b.t === 'img') return (
    <figure style={{ margin: '4px 0 18px' }}>
      <a href={b.src} target="_blank" rel="noreferrer" title="Open full size">
        <img src={b.src} alt={b.alt} loading="lazy" decoding="async"
          style={{ display: 'block', width: '100%', height: 'auto', border: '1px solid var(--line)', borderRadius: 10, boxShadow: '0 6px 20px rgba(16,48,128,.08)' }} />
      </a>
      {b.caption && <figcaption style={{ fontSize: 13, color: 'var(--muted, #5b6b82)', marginTop: 8 }}>{b.caption}</figcaption>}
    </figure>
  );
  /* A short silent clip of the clicks: plays when pressed, loops, never starts with sound. */
  if (b.t === 'video') return (
    <figure style={{ margin: '4px 0 18px' }}>
      <video src={b.src} poster={b.poster} controls muted playsInline loop preload="none"
        aria-label={b.caption}
        style={{ display: 'block', width: '100%', height: 'auto', border: '1px solid var(--line)', borderRadius: 10, background: '#0b1b3f', boxShadow: '0 6px 20px rgba(16,48,128,.08)' }} />
      <figcaption style={{ fontSize: 13, color: 'var(--muted, #5b6b82)', marginTop: 8 }}><strong>Watch. </strong>{b.caption}</figcaption>
    </figure>
  );
  if (b.t === 'path') return <p style={{ margin: '0 0 14px', padding: '9px 12px', background: '#EEF3FB', borderRadius: 8, fontWeight: 600, color: 'var(--navy, #103080)', fontSize: 15 }}>{b.text}</p>;
  return <p style={{ margin: '0 0 14px', padding: '12px 14px', borderLeft: '4px solid #5090F1', background: '#F5F9FF', borderRadius: 6, lineHeight: 1.65 }}><strong>Tip. </strong>{b.text}</p>;
}

export default function AcademyCourse() {
  const { courseId = '' } = useParams();
  const nav = useNavigate();
  const course = courseById(courseId);
  const [saved, setSaved] = useState<Saved>(() => read(courseId));
  const [step, setStep] = useState<number>(() => Math.min(read(courseId).at, (course?.lessons.length || 0)));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean; missed: string[] } | null>(null);
  const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const [learner, setLearner] = useState<Learner | null>(() => readLearner());
  const [signinErr, setSigninErr] = useState('');
  /* The introduction first; the lessons once the learner starts (or comes back from signing in). */
  const [view, setView] = useState<'intro' | 'learn'>('intro');
  const [tab, setTab] = useState<'overview' | 'plan'>('overview');
  const [copied, setCopied] = useState(false);

  /* Back from Google or LinkedIn: the pass, or the reason it failed, is in the address fragment. */
  useEffect(() => {
    const h = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const t = h.get('learner'); const e = h.get('signin_error');
    if (!t && !e) return;
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    if (t) {
      const l = decode(t);
      if (!l) { setSigninErr('The sign-in could not be read. Please sign in again.'); return; }
      try { localStorage.setItem(LEARNER_KEY, t); } catch { /* still signed in until the tab closes */ }
      setLearner(l); setName((n) => n || l.name); setView('learn');
    } else setSigninErr(e || 'Sign-in did not finish. Please try again.');
  }, []);
  useEffect(() => { if (learner && !name) setName(learner.name); }, [learner]);   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { window.scrollTo(0, 0); }, [step, view]);
  useEffect(() => { if (course) document.title = `${course.title} | XionERP Academy`; }, [course]);
  const lessons = course?.lessons || [];
  const quizIndex = lessons.length;
  const allRead = useMemo(() => lessons.every((l) => saved.done.includes(l.id)), [lessons, saved]);
  if (!course) return <section className="sol-sec"><div className="wrap"><h1 className="page-h">We could not find that course</h1><p><Link to="/academy">Back to the Academy</Link></p></div></section>;

  const go = (i: number) => { setStep(i); setErr(''); write(course.id, { ...saved, at: i }); };
  const next = () => {
    const l = lessons[step]; const done = saved.done.includes(l.id) ? saved.done : [...saved.done, l.id];
    const s = { done, at: step + 1 }; setSaved(s); write(course.id, s); setStep(step + 1); setErr('');
  };

  const submitQuiz = async () => {
    setErr('');
    if (course.quiz.some((q) => answers[q.id] === undefined)) { setErr('Answer every question before you submit.'); return; }
    setBusy(true);
    try { setResult(await post('grade', { courseId: course.id, answers })); window.scrollTo(0, 0); } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  };
  const getCertificate = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('');
    if (name.trim().length < 2) { setErr('Enter your full name as you want it on the certificate.'); return; }
    if (!learner && !/^\S+@\S+\.\S+$/.test(email.trim())) { setErr('Enter a valid email address.'); return; }
    setBusy(true);
    try {
      const c = await post('certificate', learner
        ? { courseId: course.id, answers, name: name.trim(), learner: learner.token }
        : { courseId: course.id, answers, name: name.trim(), email: email.trim() });
      nav(`/academy/verify/${c.code}`, { state: { fresh: true } });
    } catch (e2: any) { setErr(e2.message); } finally { setBusy(false); }
  };
  const retake = () => { setAnswers({}); setResult(null); setErr(''); window.scrollTo(0, 0); };

  const nameOf = (i: number) => (i === quizIndex ? 'Quiz and certificate' : lessons[i].title);
  const signOut = () => { try { localStorage.removeItem(LEARNER_KEY); } catch { /* none */ } setLearner(null); };
  const start = () => { setView('learn'); };

  if (view === 'intro') return (
    <CourseIntro course={course} saved={saved} learner={learner} signinErr={signinErr} tab={tab} setTab={setTab}
      copied={copied} onCopy={async () => {
        try { await navigator.clipboard.writeText(window.location.origin + window.location.pathname); setCopied(true); setTimeout(() => setCopied(false), 2500); }
        catch { window.prompt('Copy this link', window.location.origin + window.location.pathname); }
      }}
      onStart={start} onSignOut={signOut} />
  );

  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eb-pill eyebrow"><span className="dot" />XionERP Academy</span>
        <h1 className="page-h">{course.title}</h1>
        <p className="page-sub">{course.outcome} About {courseMinutes(course)} minutes.</p>
        <p style={{ margin: '10px 0 0', fontSize: 14 }}>
          <button type="button" onClick={() => setView('intro')} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>Course introduction</button>
          {learner && <span style={{ opacity: 0.85 }}> · Signed in as {learner.name || learner.email}</span>}
        </p>
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', alignItems: 'start' }}>
        <nav aria-label="Lessons" style={{ display: 'grid', gap: 6, gridColumn: 'span 1' }}>
          {Array.from({ length: quizIndex + 1 }, (_, i) => {
            const done = i < quizIndex ? saved.done.includes(lessons[i].id) : false; const on = i === step; const locked = i === quizIndex && !allRead;
            return (
              <button key={i} type="button" disabled={locked} onClick={() => go(i)} aria-current={on ? 'step' : undefined}
                style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: '1px solid ' + (on ? '#5090F1' : 'var(--line)'), background: on ? '#EEF3FB' : '#fff', font: 'inherit', cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.55 : 1, color: 'var(--ink)' }}>
                <span style={{ display: 'inline-block', width: 22, fontWeight: 700, color: done ? '#12805C' : 'var(--muted)' }}>{done ? '✓' : i + 1}</span>{nameOf(i)}
              </button>);
          })}
          {!allRead && <p style={{ fontSize: 13, color: 'var(--muted)', margin: '6px 2px' }}>The quiz opens once you have read every lesson.</p>}
        </nav>

        <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
          {step < quizIndex ? (
            <article>
              <div className="sec-eyebrow">Lesson {step + 1} of {quizIndex} · {lessons[step].minutes} min</div>
              <h2 style={{ margin: '6px 0 16px' }}>{lessons[step].title}</h2>
              {lessons[step].blocks.map((b, i) => <BlockView key={i} b={b} />)}
              <div className="fw-card" style={{ marginTop: 22 }}>
                <strong>Remember</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.65 }}>{lessons[step].remember.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>Previous</button>}
                <button type="button" className="btn btn-primary" onClick={next}>{step === quizIndex - 1 ? 'Finish lessons' : 'Next lesson'}</button>
              </div>
            </article>
          ) : !allRead ? (
            <p>Please read every lesson first. <button type="button" className="btn btn-ghost" onClick={() => go(0)}>Start from lesson 1</button></p>
          ) : result?.passed ? (
            <div>
              <div className="sec-eyebrow">Quiz passed</div>
              <h2 style={{ margin: '6px 0 10px' }}>You scored {result.score}%. Well done.</h2>
              <p style={{ lineHeight: 1.7 }}>{learner ? 'Check your name as you want it on the certificate.' : 'Enter your name as you want it on the certificate, and the email address we should send it to. We use your email only to send the certificate.'}</p>
              <form onSubmit={getCertificate} className="fw-card" style={{ display: 'grid', gap: 14, maxWidth: 520 }} noValidate>
                <label style={{ display: 'grid', gap: 6, fontSize: 14, fontWeight: 600 }}>Full name
                  <input style={inp} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} required /></label>
                {learner ? (
                  <div style={{ fontSize: 14, lineHeight: 1.6 }}>The certificate goes to <strong>{learner.email}</strong>, the email on your {PROVIDER[learner.p]} account.</div>
                ) : (
                <label style={{ display: 'grid', gap: 6, fontSize: 14, fontWeight: 600 }}>Email
                  <input style={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={200} required /></label>)}
                {err && <div role="alert" style={{ color: '#b42318', fontWeight: 600, fontSize: 14 }}>{err}</div>}
                <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'One moment…' : 'Get my certificate'}</button>
              </form>
            </div>
          ) : (
            <div>
              <div className="sec-eyebrow">Quiz</div>
              <h2 style={{ margin: '6px 0 10px' }}>{course.quiz.length} questions. Pass mark {PASS_MARK}%.</h2>
              {result && !result.passed && (
                <div role="alert" className="fw-card" style={{ borderColor: '#b42318', marginBottom: 18 }}>
                  <strong>You scored {result.score}%. You need {PASS_MARK}% to pass.</strong>
                  <p style={{ margin: '6px 0 0' }}>The questions to look at again are marked below. Read the lessons, change your answers and submit again.</p>
                </div>)}
              <div style={{ display: 'grid', gap: 18 }}>
                {course.quiz.map((q, n) => {
                  const missed = !!result && !result.passed && result.missed.includes(q.id);
                  return (
                    <fieldset key={q.id} style={{ border: '1px solid ' + (missed ? '#b42318' : 'var(--line)'), borderRadius: 10, padding: '14px 16px', margin: 0 }}>
                      <legend style={{ fontWeight: 700, padding: '0 6px' }}>{n + 1}. {q.q}{missed ? '  (look again)' : ''}</legend>
                      <div style={{ display: 'grid', gap: 8, marginTop: 6 }}>
                        {q.options.map((o, i) => (
                          <label key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', lineHeight: 1.5, cursor: 'pointer' }}>
                            <input type="radio" name={q.id} checked={answers[q.id] === i} onChange={() => { setAnswers({ ...answers, [q.id]: i }); setErr(''); }} style={{ marginTop: 5 }} />
                            <span>{o}</span>
                          </label>))}
                      </div>
                    </fieldset>);
                })}
              </div>
              {err && <div role="alert" style={{ color: '#b42318', fontWeight: 600, fontSize: 14, marginTop: 14 }}>{err}</div>}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primary" onClick={submitQuiz} disabled={busy}>{busy ? 'Marking…' : 'Submit answers'}</button>
                {result && <button type="button" className="btn btn-ghost" onClick={retake}>Clear my answers</button>}
              </div>
            </div>
          )}
        </div>
      </div></section>
    </>
  );
}

const fact: React.CSSProperties = { padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 10, background: '#fff', display: 'grid', gap: 4, alignContent: 'start' };
const factK: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--muted, #5b6b82)' };
const h3: React.CSSProperties = { margin: '0 0 10px', fontSize: 20 };
const enrollBtn = (bg: string, fg: string, line: string): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 8, background: bg, color: fg,
  border: `1px solid ${line}`, fontWeight: 600, textDecoration: 'none', fontSize: 15, lineHeight: 1.2,
});

/* The page a learner lands on: what the course is, who it is for and what
   they will be able to do, with Enroll on top. Same address as the course. */
function CourseIntro({ course, saved, learner, signinErr, tab, setTab, copied, onCopy, onStart, onSignOut }: {
  course: Course; saved: Saved; learner: Learner | null; signinErr: string;
  tab: 'overview' | 'plan'; setTab: (t: 'overview' | 'plan') => void; copied: boolean;
  onCopy: () => void; onStart: () => void; onSignOut: () => void;
}) {
  const intro = INTROS[course.id];
  const mins = courseMinutes(course);
  const prev = COURSES.find((c) => c.track === course.track && c.stage === course.stage - 1);
  const doneCount = course.lessons.filter((l) => saved.done.includes(l.id)).length;
  const begun = doneCount > 0 || saved.at > 0;
  const signin = (p: 'google' | 'linkedin') => `${API}/signin/${p}?course=${encodeURIComponent(course.id)}`;
  const track = course.track === 'customer' ? 'Customer track' : 'Partner track';
  const startLabel = !begun ? 'Start the course' : doneCount >= course.lessons.length ? 'Go to the quiz' : `Continue at lesson ${Math.min(saved.at, course.lessons.length - 1) + 1}`;
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eb-pill eyebrow"><span className="dot" />XionERP Academy · {track} · Stage {course.stage}</span>
        <h1 className="page-h">{course.title}</h1>
        <p className="page-sub">{course.blurb}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 22 }}>
          {learner ? (
            <>
              <button type="button" className="btn btn-primary" onClick={onStart}>{startLabel}</button>
              <span style={{ fontSize: 14 }}>Enrolled as <strong>{learner.name || learner.email}</strong> with {PROVIDER[learner.p]}.{' '}
                <button type="button" onClick={onSignOut} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>Not you?</button></span>
            </>
          ) : (
            <>
              <a href={signin('google')} style={enrollBtn('#fff', '#1f1f1f', '#dadce0')}><GoogleMark />Enroll with Google</a>
              <a href={signin('linkedin')} style={enrollBtn('#0A66C2', '#fff', '#0A66C2')}><LinkedInMark />Enroll with LinkedIn</a>
            </>
          )}
          <button type="button" onClick={onCopy} className="btn btn-ghost" style={{ background: 'transparent' }}>{copied ? 'Link copied' : 'Copy link to share'}</button>
        </div>
        {!learner && (
          <p style={{ margin: '12px 0 0', fontSize: 14, opacity: 0.9 }}>
            Free. We use your name and email only for your certificate and course news.{' '}
            <button type="button" onClick={onStart} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>{begun ? 'Continue without signing in' : 'Start without signing in'}</button>
          </p>)}
        {signinErr && <div role="alert" style={{ marginTop: 14, padding: '10px 14px', borderRadius: 8, background: '#FEF3F2', color: '#b42318', fontWeight: 600, fontSize: 14, maxWidth: 720, marginInline: 'auto' }}>{signinErr}</div>}
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ display: 'grid', gap: 26 }}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))' }}>
          <div style={fact}><span style={factK}>Level</span><strong>{intro?.level || 'Beginner'}</strong></div>
          <div style={fact}><span style={factK}>Time</span><strong>About {mins >= 60 ? `${Math.floor(mins / 60)} h ${mins % 60} min` : `${mins} min`}</strong></div>
          <div style={fact}><span style={factK}>Lessons</span><strong>{course.lessons.length} lessons and a {course.quiz.length}-question quiz</strong></div>
          <div style={fact}><span style={factK}>Language</span><strong>English</strong></div>
          <div style={fact}><span style={factK}>Updated</span><strong>{UPDATED}</strong></div>
          <div style={fact}><span style={factK}>Certificate</span><strong>{course.title}</strong></div>
        </div>

        <div role="tablist" aria-label="Course introduction" style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--line)' }}>
          {([['overview', 'Overview'], ['plan', 'Course plan']] as const).map(([k, label]) => (
            <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)}
              style={{ padding: '10px 16px', border: 0, borderBottom: `3px solid ${tab === k ? '#5090F1' : 'transparent'}`, background: 'none', font: 'inherit', fontWeight: tab === k ? 700 : 500, color: 'var(--ink)', cursor: 'pointer', marginBottom: -1 }}>{label}</button>))}
        </div>

        {tab === 'overview' ? (
          <div style={{ display: 'grid', gap: 26, maxWidth: 820 }}>
            <section>
              <h2 style={h3}>About this course</h2>
              {(intro?.about || [course.blurb]).map((t) => <p key={t} style={{ lineHeight: 1.75, margin: '0 0 12px' }}>{t}</p>)}
              <p style={{ lineHeight: 1.75, margin: 0 }}>It takes about {mins} minutes. Read every lesson, then pass the quiz with {PASS_MARK}% to get the <strong>{course.title}</strong> certificate, with a code anyone can check, ready to add to LinkedIn.</p>
            </section>
            <section>
              <h2 style={h3}>Before you start</h2>
              <ul style={{ lineHeight: 1.7, margin: 0, paddingLeft: 20, display: 'grid', gap: 6 }}>
                {prev && <li>Take <Link to={`/academy/${prev.id}`}>stage {prev.stage}: {prev.title}</Link> first. Nothing is locked, but the stages build on each other.</li>}
                {(intro?.before || []).map((t) => <li key={t}>{t}</li>)}
              </ul>
            </section>
            {intro && <section><h2 style={h3}>Who it is for</h2><p style={{ lineHeight: 1.75, margin: 0 }}>{intro.audience}</p></section>}
            {intro && (
              <section>
                <h2 style={h3}>What you will be able to do</h2>
                <p style={{ margin: '0 0 8px' }}>By the end of this course you can:</p>
                <ul style={{ lineHeight: 1.7, margin: 0, paddingLeft: 20, display: 'grid', gap: 6 }}>{intro.objectives.map((t) => <li key={t}>{t}</li>)}</ul>
              </section>)}
            {intro && (
              <section>
                <h2 style={h3}>Parts of XionERP covered</h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{intro.covers.map((t) => <span key={t} style={{ padding: '6px 12px', borderRadius: 999, background: '#EEF3FB', color: 'var(--navy, #103080)', fontWeight: 600, fontSize: 14 }}>{t}</span>)}</div>
              </section>)}
          </div>
        ) : (
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10, maxWidth: 820 }}>
            {course.lessons.map((l, i) => {
              const done = saved.done.includes(l.id);
              return (
                <li key={l.id} className="fw-card" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px' }}>
                  <span style={{ width: 30, height: 30, flex: '0 0 30px', borderRadius: 999, display: 'grid', placeItems: 'center', fontWeight: 700, background: done ? '#E7F6EF' : '#EEF3FB', color: done ? '#12805C' : 'var(--navy, #103080)' }}>{done ? '✓' : i + 1}</span>
                  <span style={{ flex: 1, minWidth: 0 }}><strong>{l.title}</strong><br /><span style={{ fontSize: 13, color: 'var(--muted, #5b6b82)' }}>Lesson · {l.minutes} min</span></span>
                </li>);
            })}
            <li className="fw-card" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px' }}>
              <span style={{ width: 30, height: 30, flex: '0 0 30px', borderRadius: 999, display: 'grid', placeItems: 'center', fontWeight: 700, background: '#EEF3FB', color: 'var(--navy, #103080)' }}>?</span>
              <span style={{ flex: 1 }}><strong>Quiz</strong><br /><span style={{ fontSize: 13, color: 'var(--muted, #5b6b82)' }}>{course.quiz.length} questions · pass mark {PASS_MARK}% · take it again as often as you need</span></span>
            </li>
            <li style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px', borderRadius: 10, background: 'linear-gradient(135deg, #103080, #2456c8)', color: '#fff' }}>
              <span style={{ fontSize: 22 }} aria-hidden="true">🎓</span>
              <span><strong>Complete the course to unlock your certificate</strong><br /><span style={{ fontSize: 13, opacity: 0.9 }}>{course.title} · a verify code · Add to LinkedIn in one click</span></span>
            </li>
          </ol>
        )}
      </div></section>
    </>
  );
}
