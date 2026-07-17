import { useState } from 'react';
import { Mail, Phone, Pin, Clock, Check } from '../components/Icons';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Static site: no backend wired up yet. Replace this with a POST to
    // your form endpoint (e.g. Formspree, a serverless function, or your
    // CRM's public lead-capture API) once one is available.
    setSent(true);
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Contact</span>
          <h1 className="page-h">Let's talk about your business</h1>
          <p className="page-sub">Questions about pricing, a custom plan for a larger team, or your Fawtara timeline? Reach out and we'll get back to you within one business day.</p>
        </div>
      </section>

      <section className="contact-wrap">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="contact-info-card">
              <h3>Get in touch</h3>
              <div className="contact-row">
                <Mail />
                <div><div className="clbl">Email</div><div className="cval">hello@envoiso.com</div></div>
              </div>
              <div className="contact-row">
                <Phone />
                <div><div className="clbl">Phone</div><div className="cval">+968 XXXX XXXX</div></div>
              </div>
              <div className="contact-row">
                <Pin />
                <div><div className="clbl">Headquarters</div><div className="cval">Muscat, Sultanate of Oman</div></div>
              </div>
              <div className="contact-row">
                <Clock />
                <div><div className="clbl">Response time</div><div className="cval">Within 1 business day, Sun&ndash;Thu</div></div>
              </div>
            </div>
            <div className="contact-info-card">
              <h3>Looking for sales?</h3>
              <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.6 }}>
                For teams of 15 or more, or multi-entity groups needing custom onboarding, mention <strong>"Custom plan"</strong> in your message and we'll set up time to walk through your requirements.
              </p>
            </div>
          </div>

          <div className="form-card">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E8F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: '#1E7D4F' }}>
                  <Check />
                </div>
                <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: 'var(--navy)', marginBottom: 8 }}>Message sent</h3>
                <p style={{ fontSize: 14.5, color: 'var(--muted)' }}>Thanks for reaching out — we'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input id="name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" placeholder="Company name" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="email">Work email</label>
                    <input id="email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="team">Team size</label>
                    <select id="team" name="team" defaultValue="">
                      <option value="" disabled>Select team size</option>
                      <option>1 user</option>
                      <option>2&ndash;5 users</option>
                      <option>6&ndash;10 users</option>
                      <option>11&ndash;15 users</option>
                      <option>15+ users</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="field full">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Tell us a bit about your business and what you're looking for" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary form-submit">Send message</button>
                <p className="form-note">By submitting, you agree to be contacted by Envoiso about your enquiry.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
