/*
 * The introduction page of each course (/academy/<id>): what the course is,
 * who it is for, what you need first and what you will be able to do after.
 * The lessons themselves are in academy.ts, academy-customer.ts and
 * academy-partner.ts; the course plan on the intro page is read from them.
 */
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type Intro = {
  level: Level;
  /** "You begin with ... then ... finally ..." */
  about: string[];
  /** What to know first. The previous stage of the track is added on its own. */
  before: string[];
  audience: string;
  /** "By the end of this course you can:" */
  objectives: string[];
  /** The XionERP menus the lessons walk through. */
  covers: string[];
};

/** When the lessons were last checked against the live screens. */
export const UPDATED = 'November 2026';

export const INTROS: Record<string, Intro> = {
  fundamentals: {
    level: 'Beginner',
    about: [
      'This is stage 1 of the customer track, and the place to start if you have never used XionERP.',
      'You begin with how XionERP is laid out: modules, menus, your company and its entities. Then you set a company up, add people and decide what each can see, and load products, customers and prices. Finally you follow one sale from quotation to receipt and one purchase from order to payment, and see how both land in stock, the bank and the books.',
    ],
    before: ['Nothing. You do not need a XionERP account or any accounting background.', 'A free trial at xionerp.com helps you try each step as you read, but it is not required.'],
    audience: 'Anyone starting on XionERP: owners, sales and purchase staff, storekeepers, accountants and new hires who will use it every day.',
    objectives: [
      'Explain how XionERP is organised into modules, menus, companies and entities.',
      'Set up a company with its currency, VAT, numbering and first users.',
      'Add products, customers and price lists that the rest of the system uses.',
      'Follow a sale from quotation to receipt and a purchase from order to payment.',
      'Describe how each document moves stock and posts to the books.',
    ],
    covers: ['Administration', 'Sales', 'Purchase', 'Inventory', 'Banking', 'Accounting'],
  },
  operations: {
    level: 'Intermediate',
    about: [
      'This is stage 2 of the customer track, for the people who run sales, purchasing and the warehouse every day.',
      'You begin with sales orders that are delivered in parts, and the delivery notes that take stock out. Then you handle what goes wrong: returns, credit notes, refunds, customer advances and cheques that are post-dated or bounce. Finally you buy with purchase orders, add freight and duty as landed cost, and keep stock right with transfers between warehouses and stock counts.',
    ],
    before: ['You can open a quotation, an invoice and a purchase order in XionERP and save them.', 'You know what a warehouse and a stock item are in your own company.'],
    audience: 'Sales coordinators, purchase officers, storekeepers, warehouse supervisors and operations managers.',
    objectives: [
      'Run order-to-cash with part deliveries, back orders and invoices from delivery notes.',
      'Record returns, credit notes and refunds so the customer balance and stock stay right.',
      'Take customer advances and cheques, and follow a cheque from received to cleared or bounced.',
      'Raise purchase orders, receive goods and spread freight and duty as landed cost.',
      'Move stock between warehouses and post a stock count with its differences.',
    ],
    covers: ['Sales', 'Purchase', 'Inventory', 'Banking'],
  },
  finance: {
    level: 'Advanced',
    about: [
      'This is stage 3 of the customer track, for the people who keep the books and sign off the numbers.',
      'You begin with the chart of accounts and how each sales, purchase and banking document posts on its own. Then you post journal vouchers and transfers between your own accounts, and reconcile the bank, card settlements and cheques against the statements. Finally you work with currencies and VAT, close the day and the year, and read the ledgers, Trial Balance, Profit & Loss and Balance Sheet.',
    ],
    before: ['You know debits and credits, and what a trial balance and a VAT return are.', 'You have finished stage 2, or you already raise invoices and receipts in XionERP.'],
    audience: 'Accountants, finance officers, auditors and finance managers using XionERP for a company.',
    objectives: [
      'Explain which accounts each document posts to, and find the entry behind any figure.',
      'Post and correct journal vouchers and transfers between bank, cash and card accounts.',
      'Reconcile bank, card and cheque lines against the statement until the difference is zero.',
      'Handle foreign currency, exchange differences and VAT, including e-invoicing.',
      'Close the day and the year, and read the Trial Balance, Profit & Loss and Balance Sheet.',
    ],
    covers: ['Accounting', 'Banking', 'Reports', 'Sales', 'Purchase'],
  },
  admin: {
    level: 'Advanced',
    about: [
      'This is stage 4 of the customer track, for the person who looks after XionERP for the whole company.',
      'You begin with users and seats, then user groups and permissions that decide who sees and does what. Then you set the company rules everyone follows: regional settings, stock rules, document layouts, numbering and approvals. Finally you keep master data tidy, load records in bulk with Import/Export, and set up entities when one company holds several businesses.',
    ],
    before: ['You know the company\'s own way of working: who sells, who buys, who approves.', 'You have finished stage 1, or you already use XionERP daily.'],
    audience: 'System administrators, IT officers, office managers and owners who set XionERP up and keep it running.',
    objectives: [
      'Add users, use seats well and turn people on and off without losing their history.',
      'Configure user groups and permissions so each person sees only their own work.',
      'Set company rules, document layouts, numbering and approval steps.',
      'Keep master data lists tidy and load products, customers and openings in bulk.',
      'Set up entities so each business inside the company has its own books and stores.',
    ],
    covers: ['Administration', 'Master Data', 'Import/Export', 'Document Configuration'],
  },
  partner: {
    level: 'Beginner',
    about: [
      'This is stage 1 of the partner track, and the place to start for every new XionERP partner.',
      'You begin with how the programme works for a reseller and a distributor, and what your partner portal gives you. Then you learn which customers XionERP fits and how to show it. Finally you set a customer up and support them through their first week.',
    ],
    before: ['Nothing. You do not need to be a partner yet to take the course.', 'Some experience selling or supporting business software helps.'],
    audience: 'New resellers and distributors, their sales staff and their support staff.',
    objectives: [
      'Explain the difference between a reseller and a distributor, and how each earns.',
      'Use the partner portal to register leads, follow customers and get help.',
      'Spot the customers XionERP fits, and the ones it does not.',
      'Give a short demo and set a new customer up for their first week.',
    ],
    covers: ['Partner portal', 'Sales', 'Administration'],
  },
  'partner-sales': {
    level: 'Intermediate',
    about: [
      'This is stage 2 of the partner track, for the partner staff who find and win customers.',
      'You begin with what XionERP covers and which businesses it fits, and the plans, seats and free trial. Then you run a discovery call and give a demo in the prospect\'s own terms, for trading, retail, manufacturing and field sales. Finally you answer the usual objections honestly and take the prospect from demo to trial to a signed plan.',
    ],
    before: ['You have finished Partner Essentials (stage 1).', 'You have a XionERP trial company to demo from.'],
    audience: 'Partner sales consultants, account managers and pre-sales staff.',
    objectives: [
      'Qualify a prospect against what XionERP covers, and say plainly when it does not fit.',
      'Explain the plans, seats, yearly billing and the 30-day free trial.',
      'Run a discovery call that finds the prospect\'s real pains.',
      'Give a demo for their kind of business and answer the usual objections.',
      'Move a prospect from demo to trial to a signed plan.',
    ],
    covers: ['Pricing', 'Sales', 'Purchase', 'Inventory', 'Reports'],
  },
  'partner-implementation': {
    level: 'Advanced',
    about: [
      'This is stage 3 of the partner track, for the partner staff who take a signed customer live.',
      'You begin with the onboarding plan and the company setup: accounts, tax, numbering and stores. Then you set up people and permissions and load the customer\'s products, customers and suppliers. Finally you agree the opening balances at a cut-off date with the customer\'s accountant, train the team and run go-live through a first clean month.',
    ],
    before: ['You have finished stages 1 and 2 of the partner track.', 'You know basic accounting: what an opening balance and a trial balance are.'],
    audience: 'Implementation consultants, functional consultants and project leads at partners.',
    objectives: [
      'Plan an implementation with dates, owners and a cut-off date the customer agrees.',
      'Set up the company, chart of accounts, users and permissions.',
      'Load master data and opening stock, receivables and payables with Import/Export.',
      'Prove the opening Trial Balance with the customer\'s accountant.',
      'Train each role and run go-live to a first clean month.',
    ],
    covers: ['Administration', 'Import/Export', 'Accounting', 'Inventory'],
  },
  'partner-support': {
    level: 'Intermediate',
    about: [
      'This is stage 4 of the partner track, for the partner staff who look after customers once they are live.',
      'You begin with where help comes from: the Help Center, Report a problem and the XionERP team behind you. Then you solve the questions customers ask most: sign-in and access, and documents that will not save, print or post. Finally you keep the books healthy with a few regular checks, and grow the account with more users and modules.',
    ],
    before: ['You have finished stages 1 and 3 of the partner track.', 'You have at least one live customer, or a trial company to practise on.'],
    audience: 'Partner support specialists, helpdesk staff and customer success managers.',
    objectives: [
      'Find the answer in the Help Center, and report a problem with what the XionERP team needs.',
      'Solve sign-in, password and permission questions.',
      'Solve the common document questions: saving, printing, posting and numbering.',
      'Run regular checks that keep a customer\'s books healthy.',
      'Spot when a customer is ready for more users or modules.',
    ],
    covers: ['Help Center', 'Administration', 'Sales', 'Accounting'],
  },
};
