import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { courseById, courseMinutes, PASS_MARK, type Block } from '../data/academy';

const API = 'https://cloud.xionerp.com/api/v1/public/academy';
const inp: React.CSSProperties = { width: '100%', padding: '11px 12px', border: '1px solid var(--line)', borderRadius: 8, font: 'inherit', background: '#fff', color: 'var(--ink)' };

type Saved = { done: string[]; at: number };
const keyOf = (id: string) => `xion_academy_${id}`;
const read = (id: string): Saved => { try { const v = JSON.parse(localStorage.getItem(keyOf(id)) || ''); if (v && Array.isArray(v.done)) return v; } catch { /* none */ } return { done: [], at: 0 }; };
const write = (id: string, v: Saved) => { try { localStorage.setItem(keyOf(id), JSON.stringify(v)); } catch { /* the course still works until the tab closes */ } };

async function post(path: string, body: unknown) {
  const r = await fetch(`${API}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e: any = new Error(r.status === 429 ? 'Too many attempts. Please wait a few minutes.' : (Array.isArray(j.message) ? j.message.join(' · ') : j.message) || 'Something went wrong. Please try again.'); e.status = r.status; throw e; }
  return j;
}

function BlockView({ b }: { b: Block }) {
  if (b.t === 'p') return <p style={{ lineHeight: 1.75, margin: '0 0 14px' }}>{b.text}</p>;
  if (b.t === 'ul') return <ul style={{ lineHeight: 1.7, margin: '0 0 14px', paddingLeft: 20, display: 'grid', gap: 8 }}>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
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

  useEffect(() => { window.scrollTo(0, 0); }, [step]);
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
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr('Enter a valid email address.'); return; }
    setBusy(true);
    try {
      const c = await post('certificate', { courseId: course.id, answers, name: name.trim(), email: email.trim() });
      nav(`/academy/verify/${c.code}`, { state: { fresh: true } });
    } catch (e2: any) { setErr(e2.message); } finally { setBusy(false); }
  };
  const retake = () => { setAnswers({}); setResult(null); setErr(''); window.scrollTo(0, 0); };

  const nameOf = (i: number) => (i === quizIndex ? 'Quiz and certificate' : lessons[i].title);
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eb-pill eyebrow"><span className="dot" />XionERP Academy</span>
        <h1 className="page-h">{course.title}</h1>
        <p className="page-sub">{course.outcome} About {courseMinutes(course)} minutes.</p>
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
              <p style={{ lineHeight: 1.7 }}>Enter your name as you want it on the certificate, and the email address we should send it to. We use your email only to send the certificate.</p>
              <form onSubmit={getCertificate} className="fw-card" style={{ display: 'grid', gap: 14, maxWidth: 520 }} noValidate>
                <label style={{ display: 'grid', gap: 6, fontSize: 14, fontWeight: 600 }}>Full name
                  <input style={inp} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} required /></label>
                <label style={{ display: 'grid', gap: 6, fontSize: 14, fontWeight: 600 }}>Email
                  <input style={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={200} required /></label>
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
