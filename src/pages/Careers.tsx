import { useEffect, useState } from 'react';
import { trackClick } from '../lib/analytics';

/*
 * Careers (9 Nov 2026).
 *
 * The list is read live from XionERP: every requisition posted in the
 * AutomateXion company (HR > Job Requisitions) appears here, and goes when it
 * is closed. "Apply now" opens that vacancy's own application page, which
 * sends the CV straight into Recruitment > Candidates. Nothing here is edited
 * by hand. automatexion.com/careers.html reads the same list.
 */
const API = 'https://cloud.xionerp.com/api/v1';
const COMPANY_CODE = 'XION';
const APPLY_URL = 'https://cloud.xionerp.com/apply/';
const CONTACT = 'info@automatexion.com';

type Job = {
  reference: string | null;
  jobTitle: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  headcount: number;
  jobDescription: string | null;
  requirements: string | null;
  token: string;
};

const TYPES: Record<string, string> = {
  FULL_TIME: 'Full time', PART_TIME: 'Part time', CONTRACT: 'Contract', INTERNSHIP: 'Internship', TEMPORARY: 'Temporary',
};
const typeLabel = (t: string) => TYPES[t] || t.replace(/_/g, ' ').toLowerCase().replace(/^./, c => c.toUpperCase());

export default function Careers() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/hr/public/careers/${COMPANY_CODE}`, { headers: { Accept: 'application/json' } })
      .then(async r => {
        const body = await r.json().catch(() => ({}));
        // The server's own message, so a broken list never passes for "no vacancies".
        if (!r.ok) throw new Error(body?.message || `The server answered ${r.status}.`);
        setJobs(body.jobs || []);
      })
      .catch(e => setError(e?.message || 'The open positions could not be loaded.'));
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Careers</span>
          <h1 className="page-h">Help growing businesses run on one flow</h1>
          <p className="page-sub">Xion ERP is built by AutomateXion in Muscat and Sri Lanka. We're hiring people who like solving real problems for real customers. See the open positions below and apply online.</p>
        </div>
      </section>

      <section className="careers">
        <div className="wrap">
          {!jobs && !error && (
            <div className="job-list" aria-busy="true"><div className="job-skel" /><div className="job-skel" /></div>
          )}

          {error && (
            <div className="job-state is-error">
              <strong>We could not load the open positions</strong>
              <p>{error} Please refresh the page in a minute.</p>
              <p>You can also email your CV to <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>
            </div>
          )}

          {jobs && jobs.length === 0 && (
            <div className="job-state">
              <strong>No open positions right now</strong>
              <p>We post every vacancy here as soon as it opens, so please check back soon.</p>
              <p>You can also email your CV to <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>
            </div>
          )}

          {jobs && jobs.length > 0 && (
            <>
              <p className="job-count">{jobs.length === 1 ? '1 open position' : `${jobs.length} open positions`}</p>
              <div className="job-list">
                {jobs.map(j => (
                  <article className="job-card" key={j.token}>
                    <div>
                      <h2>{j.jobTitle}</h2>
                      <div className="job-meta">
                        {j.department && <span>{j.department}</span>}
                        {j.location && <span>{j.location}</span>}
                        {j.employmentType && <span>{typeLabel(j.employmentType)}</span>}
                        {j.headcount > 1 && <span>{j.headcount} openings</span>}
                        {j.reference && <span className="ref">{j.reference}</span>}
                      </div>
                    </div>
                    <a className="btn btn-primary" href={APPLY_URL + encodeURIComponent(j.token)} target="_blank" rel="noopener"
                       aria-label={`Apply for ${j.jobTitle}`}
                       onClick={() => trackClick('careers_apply', j.jobTitle)}>Apply now</a>
                    {(j.jobDescription || j.requirements) && (
                      <details>
                        <summary>Job details</summary>
                        <div className="job-desc">
                          {j.jobDescription && (<><h3>The role</h3><div>{j.jobDescription}</div></>)}
                          {j.requirements && (<><h3>What we look for</h3><div>{j.requirements}</div></>)}
                        </div>
                      </details>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}

          <div className="job-how">
            <div><b>1. Pick a role</b><p>Open a position to read what the job involves and what we look for.</p></div>
            <div><b>2. Apply online</b><p>Press Apply now, fill in a short form and attach your CV (PDF, Word or a photo).</p></div>
            <div><b>3. Hear from us</b><p>Our team reviews every application and contacts shortlisted candidates for an interview.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
