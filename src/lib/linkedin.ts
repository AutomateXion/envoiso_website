/* LinkedIn links for a certificate. The same links go in the certificate email
   (crm-core academy.service.ts linkedInLinks): change one, change both. */

/* XionERP's LinkedIn company page id. Empty: LinkedIn shows the name "XionERP"
   without the logo on the learner's profile. */
const LINKEDIN_ORG_ID = '';
const SHARE_BASE = 'https://cloud.xionerp.com/api/v1/public/academy/share';

export function linkedInLinks(c: { code: string; course: string; issuedAt: string }) {
  const d = new Date(c.issuedAt);
  const add = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME', name: c.course,
    ...(LINKEDIN_ORG_ID ? { organizationId: LINKEDIN_ORG_ID } : { organizationName: 'XionERP' }),
    issueYear: String(d.getUTCFullYear()), issueMonth: String(d.getUTCMonth() + 1),
    certUrl: `https://xionerp.com/academy/verify/${c.code}`, certId: c.code,
  });
  /* The share link is a page LinkedIn reads for the preview (name, course, picture);
     a person who clicks it lands on the certificate here. */
  const text = `I have earned the ${c.course} certificate from XionERP Academy. ${SHARE_BASE}/${c.code}`;
  return {
    addToProfile: `https://www.linkedin.com/profile/add?${add.toString()}`,
    shareOnFeed: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`,
  };
}
