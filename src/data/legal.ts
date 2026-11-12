// Same wording as the privacy policy and terms inside the XionERP app (cloud.xionerp.com/privacy, /terms).
// Keep the two in step: change both when either changes.
export const COMPANY = 'AutomateXion';
export const PRODUCT = 'XionERP';
export const CONTACT = 'info@automatexion.com';
export const UPDATED = '12 November 2026';

export type Section = { h: string; p: (string | string[])[]; id?: string };

export const PRIVACY: Section[] = [
  {
    h: 'Who we are',
    p: [
      `${PRODUCT} is business software made by ${COMPANY}. Companies use it to run their sales, stock, accounts and customer communication. The same policy covers ${PRODUCT}'s WhatsApp messaging service, which businesses can also connect to other software they use. In this policy "we" means ${COMPANY}, "the company" means a business that subscribes to ${PRODUCT}, and "you" means anybody whose information is held in it.`,
    ],
  },
  {
    h: 'What information we hold',
    p: [
      'We hold only what the company and its staff enter or connect:',
      [
        'Staff accounts: name, email, phone number, role, and a record of what each person did in the system.',
        "The company's records: customers, suppliers, contacts, items, invoices, payments and similar business documents.",
        'WhatsApp messages, where the company connects its WhatsApp Business numbers: the phone numbers messages are sent to and from, the message text and attachments, delivery and read status, and replies customers send.',
        "Google Search Console data, where the company connects it: the search performance of the company's own website and the access token Google gives us for it.",
        'Technical records: sign-in times, IP addresses and error logs, kept to keep the service working and secure.',
      ],
    ],
  },
  {
    h: 'How we use it',
    p: [
      "Only to provide the service the company subscribed to: to show, store and send its records, including sending WhatsApp messages the company asks the system to send. We do not sell information, we do not use a company's data to advertise, and we do not share one company's data with another.",
    ],
  },
  {
    h: 'WhatsApp',
    p: [
      `When a company connects WhatsApp, ${PRODUCT} sends and receives messages through the WhatsApp Business Platform run by Meta Platforms. Messages pass through Meta's systems under Meta's own terms and privacy policy. The company decides who is messaged and what is sent, and is responsible for having its customers' agreement to receive messages, especially promotions.`,
      `A customer who no longer wants WhatsApp messages from a company can block the number or ask the company directly; the company can switch messages off for that customer in ${PRODUCT}.`,
    ],
  },
  {
    id: 'google',
    h: 'Google Search Console',
    p: [
      `Where a company chooses to connect Google Search Console, ${PRODUCT} asks Google for permission to read the search performance of the company's own website (clicks, impressions, average position, and the search queries and pages behind them) and the list of sites the company's Google account can see. The company gives this permission by signing in with Google, and can take it back at any time.`,
      `We use this information only to show it to that company inside ${PRODUCT}, in its SEO reports. We only read it; we never change anything in the company's Search Console. It is kept for that company alone, is not shown to any other company, and we do not sell it, use it for advertising, or use it to build profiles of people.`,
      `${PRODUCT}'s use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy, including the Limited Use requirements.`,
      `A company can disconnect Google in ${PRODUCT} at any time, or remove ${PRODUCT}'s access in its Google account settings (myaccount.google.com/permissions). When it disconnects, or closes its account, we delete the access token and the Search Console data we stored for it.`,
    ],
  },
  {
    h: 'Who can see it',
    p: [
      "Each company's data is kept separate. Inside a company, staff see what their permissions allow. Our own support staff look at a company's data only to fix a problem the company has reported or to keep the service running.",
      'We use hosting and service providers (servers, email delivery, Meta for WhatsApp, and Google for Search Console) only to run the service.',
    ],
  },
  {
    h: 'How long we keep it',
    p: [
      'For as long as the company keeps its subscription, and then for up to 90 days so it can be exported, unless the law requires business and tax records to be kept longer.',
    ],
  },
  {
    id: 'data-deletion',
    h: 'Deleting your information',
    p: [
      `The company that holds your information decides what it keeps, so ask that company first. You can also write to ${CONTACT} with your name, phone number and the company's name; we pass the request to the company and, where the company has closed its account or does not answer within 30 days, we delete or anonymise the information ourselves, except records the law requires to be kept.`,
      `A company that disconnects WhatsApp from ${PRODUCT} stops all sending at once; its message history is deleted when it asks, or with the rest of its data when its subscription ends.`,
    ],
  },
  {
    h: 'Security',
    p: [
      'Connections are encrypted, passwords are stored hashed, access keys for WhatsApp are kept on the server and never shown in the browser.',
    ],
  },
  {
    h: 'Changes and contact',
    p: [
      `We will post any change here with a new date. Questions: ${CONTACT}.`,
    ],
  },
];

export const TERMS: Section[] = [
  {
    h: 'The service',
    p: [
      `${COMPANY} provides ${PRODUCT} as an online service to companies that subscribe to it. These terms apply to every company and person that uses it, alongside any signed agreement, which wins where the two differ.`,
    ],
  },
  {
    h: 'Accounts',
    p: [
      'The company is responsible for who it gives access to, for keeping passwords private, and for what its staff do in the system.',
    ],
  },
  {
    h: 'Fair use',
    p: [
      'Do not use the service to break the law, to send messages people did not agree to receive, to send misleading or harmful content, or to try to reach another company\'s data.',
    ],
  },
  {
    h: 'WhatsApp',
    p: [
      `A company that connects WhatsApp also agrees to Meta's WhatsApp Business terms and Commerce and Business policies. Meta charges for messages directly to the company's own payment method; those charges are separate from ${PRODUCT} fees. Meta may limit or block a number for spam or low quality, which ${COMPANY} cannot override. The company must have its customers' agreement before sending promotions.`,
    ],
  },
  {
    h: 'Google',
    p: [
      `A company that connects Google Search Console does so with its own Google account and stays bound by Google's terms. ${PRODUCT} only reads the company's Search Console data to show it in SEO reports; the company can disconnect at any time.`,
    ],
  },
  {
    h: 'Your data',
    p: [
      `The company owns its data. ${COMPANY} uses it only to provide the service, as set out in the privacy policy, and lets the company export it.`,
    ],
  },
  {
    h: 'Fees',
    p: [
      'Fees are as agreed when subscribing. Unpaid accounts may be made read-only, then closed after notice.',
    ],
  },
  {
    h: 'Availability and liability',
    p: [
      `We work to keep the service running and backed up but cannot promise it will never be interrupted. ${COMPANY}'s total liability is limited to the fees the company paid in the 12 months before the claim, and we are not liable for indirect losses such as lost profit.`,
    ],
  },
  {
    h: 'Ending',
    p: [
      'Either side may end the subscription as agreed. We may suspend an account that breaks these terms. After the end the company has 90 days to export its data.',
    ],
  },
  {
    h: 'Contact',
    p: [`${CONTACT}`],
  },
];

