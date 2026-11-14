/*
 * Partner track, stages 2 to 4. Written from the Help Center articles in the
 * platform repo and the xionerp.com pricing page; prices are not repeated here
 * because they change, so the lessons point to xionerp.com/pricing.
 * The answers to the quizzes are on the server (crm-core/src/academy/academy.keys.ts).
 */
import type { Course } from './academy';

export const PARTNER_STAGES: Course[] = [
  {
    id: 'partner-sales',
    track: 'partner', stage: 2,
    title: 'XionERP Certified Sales Consultant',
    audience: 'Partners · Stage 2',
    blurb: 'Selling XionERP well: what it covers and for whom, plans and the free trial, the discovery call, a demo for each kind of business, objections, and the first proposal.',
    outcome: 'You can qualify a prospect, show XionERP in their own terms, answer the usual objections honestly, and get them onto a trial and a plan.',
    lessons: [
      {
        id: 'fit', title: 'What XionERP covers and who it fits', minutes: 5,
        blocks: [
          { t: 'p', text: 'XionERP runs a growing business in one system: sales, purchasing, inventory and warehouses, accounting and banking, CRM, HR and payroll, manufacturing, point of sale and field sales. Social media (WhatsApp, Facebook, Instagram) and an online store sit beside it, on the same customers, items and stock.' },
          { t: 'ul', items: [
            'Trading and distribution: quotations to invoices, stock in several warehouses, cheques, credit limits, landed cost on imports.',
            'Retail: the till, with offline selling, returns, loyalty and the day\'s count.',
            'Manufacturing: bills of materials, production orders, work in progress at real cost, quality checks.',
            'Field sales: salesmen taking orders on the phone, and vans that bill on the spot and settle at the end of the day.',
            'Services: projects, contracts, service calls and HR.',
          ] },
          { t: 'p', text: 'The strongest sign of fit is work done twice: invoices in one tool, stock in a spreadsheet, the accounts in a third. Every figure typed twice is one XionERP types once.' },
          { t: 'tip', text: 'Say plainly what is not built yet. For example, the Support Tickets screen is not ready, and e-invoice files for Oman are made but not yet sent to the provider automatically. An honest answer keeps the deal.' },
        ],
        remember: ['One system on the same customers, items and stock.', 'Look for work done twice; say plainly what is not built yet.'],
      },
      {
        id: 'plans', title: 'Plans, seats and the free trial', minutes: 5,
        blocks: [
          { t: 'p', text: 'Plans differ by the number of users, not by what the customer may use. There are five: Solo (1 user), Team (3), Business (5), Growth (10) and Enterprise (15). Each is billed monthly or annually; annual saves about 20% compared with paying monthly. Current prices, in US dollars, Omani rials, Sri Lankan rupees and Qatari riyals, are on xionerp.com/pricing.' },
          { t: 'path', text: 'xionerp.com/pricing' },
          { t: 'p', text: 'Every company starts with a 30-day free trial, with no credit card. Reminders go out as the end comes near. When the trial ends without a plan, the workspace pauses and the data is kept until they subscribe.' },
          { t: 'ul', items: [
            'A seat is a person who signs in. Salesmen who are only picked on documents can be added without sign-in, and take no seat.',
            'A person who has left is switched off, which frees their seat for someone else.',
          ] },
          { t: 'tip', text: 'Never quote a price from memory. Open the pricing page with the customer, in their currency, so the figure is today\'s.' },
        ],
        remember: ['Five plans by number of users; annual saves about 20%.', '30-day trial, no card; the workspace pauses, data kept, if no plan follows.'],
      },
      {
        id: 'discovery', title: 'The discovery call', minutes: 5,
        blocks: [
          { t: 'p', text: 'Before any demo, find out how the business works today. Twenty minutes of questions make the demo theirs instead of a tour.' },
          { t: 'ul', items: [
            'What do you sell, and how does a sale run from enquiry to money in the bank?',
            'How many warehouses, branches or companies? Do you sell in more than one currency?',
            'Who chases late payments, and how do they know who owes what?',
            'How long does it take to know what is in stock, and what is running out?',
            'How does the accountant get the figures at month end? Who files VAT?',
            'How many people would sign in? Who only needs to be named on documents?',
          ] },
          { t: 'p', text: 'Write down their words for things: their product names, their document names, their pains. Use those words in the demo.' },
          { t: 'tip', text: 'Qualify early. A business with one person and no stock may be happy with a spreadsheet. A business typing the same figures in three places is the one to spend time on.' },
        ],
        remember: ['Ask how a sale runs today, from enquiry to money in the bank.', 'Use their words and their products in the demo.'],
      },
      {
        id: 'demos', title: 'A demo for each kind of business', minutes: 6,
        blocks: [
          { t: 'p', text: 'Every demo tells one story and finishes on the books. Pick the story that matches the business.' },
          { t: 'ul', items: [
            'Trading: quotation, convert to delivery note or invoice, receipt, Customer Statement; then a purchase order and goods receipt with the stock arriving.',
            'Retail: open a till, sell with card and cash, take a return, close the till with the count.',
            'Manufacturing: a bill of materials, a production order released, materials issued, finished goods received at their real cost.',
            'Field sales: a Quick Order on the phone, or a bill from the van, then the van settled at the end of the day.',
          ] },
          { t: 'path', text: 'Sales > Quotations  ·  Point of Sale > Sell  ·  Manufacturing > Production Orders  ·  Field Sales > Quick Order' },
          { t: 'video', src: '/academy/clip-quotation.mp4', poster: '/academy/clip-quotation.webp', caption: 'The trading story starts here: a quotation for a product the customer really sells.' },
          { t: 'p', text: 'Finish with the Trial Balance and the Profit & Loss: everything the demo did is already in the books, and nobody typed a journal.' },
          { t: 'path', text: 'Accounting > Trial Balance' },
        ],
        remember: ['One story per business type, in their words.', 'Always finish on the books.'],
      },
      {
        id: 'objections', title: 'Answering the usual objections', minutes: 5,
        blocks: [
          { t: 'ul', items: [
            '"We already use a spreadsheet or another package." Their customers, suppliers, products, opening stock and balances load from Excel, each file checked before anything is saved, as at one cut-off date they choose.',
            '"It will be too expensive." Plans are by users, with the modules included, and salesmen who only appear on documents take no seat. Show the plan for their real number of users.',
            '"Is it compliant?" Show VAT on every document and the VAT return report. For Oman\'s Fawtara, the standard e-invoice file is made for each invoice; automatic sending to the provider is not built yet.',
            '"Our people will not use it." Every screen has a Help Center article, and permissions show each person only what they need.',
            '"What if we stop?" The trial needs no card, and their data can be exported to Excel from each list.',
          ] },
          { t: 'tip', text: 'Answer the objection, then show it on the screen. A thing seen is believed more than a thing said.' },
        ],
        remember: ['Answer, then show it on the screen.', 'Be exact about compliance: what is made today, and what is not built yet.'],
      },
      {
        id: 'close', title: 'From demo to signed customer', minutes: 4,
        blocks: [
          { t: 'p', text: 'Close the demo with a clear next step: a trial started that day, a date for the onboarding plan, and who on their side owns it.' },
          { t: 'ul', items: [
            'Start the trial with them at xionerp.com, on the call.',
            'Agree the plan by the number of people who will sign in.',
            'Agree the cut-off date for opening balances, often the first day of a month.',
            'Send your proposal on your own letterhead, with the brochure and data sheets from your partner portal.',
          ] },
          { t: 'path', text: 'xionerp.com/partners/kit' },
          { t: 'tip', text: 'Keep each prospect as a lead in your own XionERP, with the next follow-up date. A lead with no next action is a name nobody is working.' },
        ],
        remember: ['End every demo with a trial started and a date for onboarding.', 'Every prospect has a next action and a date.'],
      },
    ],
    quiz: [
      { id: 's1', q: 'What is the strongest sign that a business fits XionERP?', options: ['It has a website', 'The same figures are typed in several separate tools', 'It has more than 100 staff', 'It uses only cash'] },
      { id: 's2', q: 'How do XionERP plans differ from each other?', options: ['By the modules included', 'By the country', 'By the number of users', 'By the number of invoices'] },
      { id: 's3', q: 'What does annual billing give?', options: ['Two free users', 'A free online store', 'Nothing extra', 'About 20% off the monthly price'] },
      { id: 's4', q: 'What happens when a trial ends with no plan chosen?', options: ['The workspace pauses and the data is kept', 'All data is deleted at once', 'The card on file is charged', 'It becomes a free plan forever'] },
      { id: 's5', q: 'A salesman only needs to be named on invoices and never signs in. Does he take a seat?', options: ['Yes, always', 'No: he can be added without sign-in and takes no seat', 'Only on annual plans', 'He cannot be added at all'] },
      { id: 's6', q: 'What should come before any demo?', options: ['A price list', 'A contract', 'A discovery call about how the business works today', 'Installing software on their computers'] },
      { id: 's7', q: 'How should every demo finish?', options: ['On the books: the Trial Balance and Profit & Loss', 'On the login screen', 'With a long list of features', 'With the price'] },
      { id: 's8', q: 'A prospect in Oman asks if XionERP sends e-invoices to the provider automatically. What is accurate?', options: ['Yes, fully automatic', 'XionERP has no e-invoicing', 'Only for retail', 'The standard e-invoice file is made for each invoice; automatic sending is not built yet'] },
      { id: 's9', q: 'Where do you check a price before quoting it?', options: ['From memory', 'xionerp.com/pricing, in the customer\'s currency', 'An old brochure', 'The customer\'s last invoice'] },
      { id: 's10', q: 'What is a good next step at the end of a demo?', options: ['Wait for the customer to call', 'Send a long email of features', 'Start the trial with them and agree a date for onboarding', 'Offer a discount at once'] },
    ],
  },
  {
    id: 'partner-implementation',
    track: 'partner', stage: 3,
    title: 'XionERP Certified Implementation Consultant',
    audience: 'Partners · Stage 3',
    blurb: 'Taking a customer live: the onboarding plan, company setup, accounts and roles, data import, opening balances at a cut-off date, training, and go-live.',
    outcome: 'You can plan and run a XionERP implementation from signed customer to a first clean month, with opening balances agreed by the customer\'s accountant.',
    lessons: [
      {
        id: 'plan', title: 'The onboarding plan', minutes: 5,
        blocks: [
          { t: 'p', text: 'An implementation is a short project with a date. Write the plan down and agree it with one owner on the customer\'s side.' },
          { t: 'ul', items: [
            'Week 1: company settings, users and permissions, master data lists.',
            'Week 2: customers, suppliers, warehouses and products loaded from Excel.',
            'Cut-off date: opening stock, unpaid invoices and bills, cheques and balances loaded as at that date.',
            'Training by role, then go-live, then a review after the first month.',
          ] },
          { t: 'tip', text: 'Choose a cut-off date the accountant can produce figures for, usually the last day of a month. Every opening balance must be as at that same date.' },
        ],
        remember: ['One plan, one owner, one cut-off date.', 'Setup, data, openings, training, go-live, first-month review.'],
      },
      {
        id: 'setup', title: 'Company setup and accounts', minutes: 6,
        blocks: [
          { t: 'p', text: 'Start with Company Settings: the details every document prints and the rules the system follows, such as VAT registration, selling below zero stock, delivery note first or invoice first, and serial numbers.' },
          { t: 'path', text: 'Administration (gear) > Company > Company Settings' },
          { t: 'img', src: '/academy/company-settings.webp', alt: 'Company Settings' },
          { t: 'p', text: 'A new company starts with a chart of accounts and the account roles that tell each document where to post. Add the customer\'s own accounts under the right headers, and check the roles in Accounting Setup before any document is posted.' },
          { t: 'path', text: 'Accounting > Chart of Accounts  ·  Administration > Accounting > Accounting Setup' },
          { t: 'p', text: 'Then Document Configuration: the layout of each printed document, the number series, and approvals for the documents that need a second pair of eyes.' },
          { t: 'path', text: 'Administration (gear) > Company > Document Configuration' },
          { t: 'tip', text: 'Agree the document order (delivery note first or invoice first) before training. It changes what Convert creates, and it is hard to explain twice.' },
        ],
        remember: ['Settings, accounts and roles, then document layouts and numbering.', 'Check Accounting Setup before the first posting.'],
      },
      {
        id: 'people', title: 'People, roles and permissions', minutes: 5,
        blocks: [
          { t: 'p', text: 'Build one user group per role the customer really has, such as Sales, Store, Accounts and Management. Set each group\'s permissions, then add the users and their Reports To, so managers see their team.' },
          { t: 'path', text: 'Administration (gear) > People & Access > User Groups  ·  Permissions  ·  Users' },
          { t: 'img', src: '/academy/user-groups.webp', alt: 'User Groups & Roles' },
          { t: 'video', src: '/academy/clip-permissions.mp4', poster: '/academy/clip-permissions.webp', caption: 'Switch on what a group may do, and press Save Permissions.' },
          { t: 'ul', items: [
            'Start each group narrow and widen it when someone needs more. Delete stays off until switched on page by page.',
            'Hide cost from sales groups.',
            'Salesmen who never sign in are added without sign-in and take no seat.',
          ] },
        ],
        remember: ['One group per real role; start narrow.', 'Reports To decides whose records a manager sees.'],
      },
      {
        id: 'import', title: 'Loading the data', minutes: 6,
        blocks: [
          { t: 'p', text: 'Master Data holds the lists behind every dropdown: payment terms, payment methods, VAT rates, categories, units. Fill them first, because the import files refer to them. Give every payment method its own ledger account so its takings can be reconciled.' },
          { t: 'path', text: 'Administration (gear) > Data > Master Data' },
          { t: 'p', text: 'Import / Export loads records in bulk. Each card gives an Excel template; an upload checks every row and shows the result before anything is saved.' },
          { t: 'path', text: 'Administration (gear) > Data > Import / Export' },
          { t: 'img', src: '/academy/import-export.webp', alt: 'Import / Export: a card per kind of record, with a template to download' },
          { t: 'ul', items: [
            'Order: users and master data, customers and suppliers, warehouses, products.',
            'A few rows failed? Download failed rows, fix them and upload just those.',
            'Clean the customer\'s data before loading: one customer once, consistent product codes and units.',
          ] },
          { t: 'tip', text: 'Load a small sample first and look at it on screen with the customer. Mistakes found in ten rows are cheaper than mistakes found in ten thousand.' },
        ],
        remember: ['Master data first; the files refer to it.', 'Sample, check with the customer, then load the rest.'],
      },
      {
        id: 'openings', title: 'Opening balances at the cut-off', minutes: 6,
        blocks: [
          { t: 'p', text: 'Customer Onboarding moves the company\'s position onto XionERP as at one cut-off date: opening stock, unpaid invoices and bills, cheques, gift vouchers, loyalty points, fixed assets and bank and other balances. Each step is an Excel file checked first and loaded only when nothing is wrong. Every step is optional, and a file sent again does not post twice.' },
          { t: 'path', text: 'Administration (gear) > Data > Customer Onboarding' },
          { t: 'img', src: '/academy/customer-onboarding.webp', alt: 'Customer Onboarding: the steps across the top and the cut-off date' },
          { t: 'ul', items: [
            'Each step posts against Opening Balance Equity. What is left there is the net opening equity; move it to Retained Earnings or Capital with a journal voucher when the figures are agreed.',
            'Enter the bank as the statement shows it, and load unpaid cheques in their own step.',
            'Trial balance out? Check the Direct GL file first: it often repeats receivables, stock or cheques another step already posted.',
          ] },
          { t: 'tip', text: 'Sit with the customer\'s accountant and agree the opening trial balance line by line before anyone starts working.' },
        ],
        remember: ['Everything as at one cut-off date; each step is checked before it loads.', 'The accountant signs off the opening trial balance before go-live.'],
      },
      {
        id: 'golive', title: 'Training and go-live', minutes: 5,
        blocks: [
          { t: 'p', text: 'Train by role, on the customer\'s own data, not on a sample company. A salesman needs quotations, orders and his customers; the store needs receipts, deliveries and counts; accounts need receipts, payments, bank and the reports.' },
          { t: 'ul', items: [
            'Point every user to the Help Center for their screens (profile menu > Help Center).',
            'Ask staff to take the free XionERP Academy courses for their role. Stage 1 is a good start for everyone.',
            'On go-live day, sit with the first invoices and receipts. Check the day with the Daily Closing Report.',
            'After the first month: Accounting Health empty, bank reconciled, the Trial Balance reviewed with the accountant.',
          ] },
          { t: 'path', text: 'Accounting > Accounting Health  ·  Banking & Cash > Bank Reconciliation' },
          { t: 'tip', text: 'An empty Accounting Health list is the correct state. Every row is something to fix while it is still small.' },
        ],
        remember: ['Train by role on the customer\'s own data.', 'First-month review: Accounting Health empty, bank reconciled, Trial Balance agreed.'],
      },
    ],
    quiz: [
      { id: 'i1', q: 'What must every opening balance have in common?', options: ['The same cut-off date', 'The same currency', 'The same customer', 'Nothing'] },
      { id: 'i2', q: 'What should you check before the first document is posted?', options: ['The website', 'The account roles in Accounting Setup', 'The colour scheme', 'The trial reminders'] },
      { id: 'i3', q: 'Why agree the document order (delivery note first or invoice first) early?', options: ['It sets the price', 'It changes the logo', 'It decides what Convert creates and what training covers', 'It is needed for VAT'] },
      { id: 'i4', q: 'How should you build user groups?', options: ['One group for everyone with full access', 'One per real role, starting narrow', 'One per user', 'Only built-in groups'] },
      { id: 'i5', q: 'Why fill Master Data before importing?', options: ['The import files refer to its lists', 'It speeds up the internet', 'It is required for the trial', 'It sets the prices'] },
      { id: 'i6', q: 'A few rows of an import file failed. What do you do?', options: ['Load the whole file again', 'Type those rows by hand on every screen', 'Download failed rows, fix them and upload just those', 'Ignore them'] },
      { id: 'i7', q: 'The opening trial balance is out of balance. What do you check first?', options: ['The users list', 'The Direct GL file, for balances another step already posted', 'The exchange rates', 'The logo'] },
      { id: 'i8', q: 'What is left in Opening Balance Equity after the openings?', options: ['An error to delete', 'The VAT owed', 'The net opening equity, moved to Retained Earnings or Capital by journal', 'Unpaid invoices'] },
      { id: 'i9', q: 'How should staff be trained?', options: ['All together on a sample company', 'By role, on the customer\'s own data', 'Only the owner', 'By email only'] },
      { id: 'i10', q: 'Which is part of a good first-month review?', options: ['Deleting old users', 'Changing the number series', 'Turning off permissions', 'Accounting Health empty, bank reconciled, Trial Balance agreed'] },
    ],
  },
  {
    id: 'partner-support',
    track: 'partner', stage: 4,
    title: 'XionERP Certified Support Specialist',
    audience: 'Partners · Stage 4',
    blurb: 'Supporting customers after go-live: the Help Center, reporting a problem, the most common questions and their fixes, keeping the books healthy, and growing the account.',
    outcome: 'You can resolve the everyday questions a XionERP customer asks, escalate the rest with what the XionERP team needs, and keep a customer healthy and growing.',
    lessons: [
      {
        id: 'channels', title: 'Where help comes from', minutes: 4,
        blocks: [
          { t: 'p', text: 'You give first-line support to the customers you bring; the XionERP team is behind you for anything deeper.' },
          { t: 'ul', items: [
            'The Help Center (profile menu > Help Center) has an article for every screen: what each field means, what it posts, and the common questions.',
            'Report a problem, the question-mark button at the top of every page, goes to the XionERP support team, and their replies come back there.',
            'Customer issues you are handling are recorded as Activities on the customer in CRM. The Support Tickets screen is not ready yet.',
          ] },
          { t: 'img', src: '/academy/help-center.webp', alt: 'The Help Center, with a search box and a card for each module' },
          { t: 'tip', text: 'When you escalate, send the screen, what the customer did, what they expected and what happened, with the document number. A good report is answered in one round instead of three.' },
        ],
        remember: ['Help Center first; Report a problem for the XionERP team.', 'Escalate with screen, steps, expected, actual and the document number.'],
      },
      {
        id: 'access', title: 'Access questions', minutes: 5,
        blocks: [
          { t: 'p', text: 'Many calls are about access. Most have a two-minute answer.' },
          { t: 'ul', items: [
            '"My account is locked." Five wrong passwords lock it for 30 minutes. Unlock Account or Reset Password on Users.',
            '"I lost my phone with the authenticator." Reset Two-Step Sign-In on their row.',
            '"I cannot see a page." Their group lacks View on Permissions. After Save Permissions, they sign out and in again.',
            '"My manager cannot see my quotations." Check Reports To on the salesman.',
            '"A menu item is missing." Some modules are switched on per company, such as Day Book, Sales Orders or the online store. Check before promising it.',
            '"We have run out of seats." Switch off people who have left, or add salesmen without sign-in.',
          ] },
          { t: 'path', text: 'Administration (gear) > People & Access > Users  ·  Permissions' },
        ],
        remember: ['Locked: unlock or reset. Missing page: permission, then sign in again.', 'A missing menu may be a module switched off for that company.'],
      },
      {
        id: 'documents', title: 'Document questions', minutes: 6,
        blocks: [
          { t: 'p', text: 'The most common document questions come from drafts and from the order of steps.' },
          { t: 'ul', items: [
            '"I saved it but nothing changed." It is a draft. Drafts move no stock and post nothing; confirm, approve or post it.',
            '"There is no Convert button." A quotation converts only when Sent or Accepted, not while approval is pending, and only with the convert permission.',
            '"The invoice was refused for insufficient stock." The stock was never received. Receive it, or set Selling Below Zero Stock in Company Settings.',
            '"No exchange rate for USD." Add the rate dated on or before the document in Exchange Rates.',
            '"I need to change a posted document." Posted documents are corrected with another document: a return or credit note, a reversal, a reversing journal.',
          ] },
          { t: 'tip', text: 'Ask "what status is it in?" first. Half of all document questions end there.' },
        ],
        remember: ['Drafts change nothing; ask the status first.', 'Posted documents are corrected by another document, never edited.'],
      },
      {
        id: 'books', title: 'Keeping the books healthy', minutes: 5,
        blocks: [
          { t: 'p', text: 'A healthy customer has clean books every month. Check three things with them.' },
          { t: 'ul', items: [
            'Accounting Health is empty. Every row is something to fix. An invoice with no journal is posted from Missing Entries.',
            'The bank is reconciled every week, from the imported statement.',
            'The Trial Balance balances, and no bank account sits on the credit side by mistake.',
          ] },
          { t: 'path', text: 'Accounting > Accounting Health  ·  Banking & Cash > Bank Reconciliation  ·  Accounting > Trial Balance' },
          { t: 'p', text: 'At year end, close the financial year once the accountant has signed off. Closing stops anything being posted into it. Correcting a closed year means re-opening it with a reason, never back-dating into the open year.' },
          { t: 'path', text: 'Administration > Accounting > Financial Years' },
        ],
        remember: ['Monthly: Accounting Health empty, bank reconciled, Trial Balance checked.', 'Close the year after sign-off; re-open with a reason to correct.'],
      },
      {
        id: 'grow', title: 'Growing the account', minutes: 4,
        blocks: [
          { t: 'p', text: 'A supported customer grows: more users, more modules, more of the business in one place. Each morning their administrators get an email of what went live the day before, and some new features are offered with a Yes or No. Read it too, so you can tell them what it means for them.' },
          { t: 'ul', items: [
            'New staff: a seat on their plan, or a larger plan.',
            'A second shop or warehouse: warehouses, transfers and, if they want separate books, entities.',
            'Selling online or on WhatsApp: the online store and the social media module, on the same items and stock.',
            'Staff training: point them to the XionERP Academy courses for their role.',
          ] },
          { t: 'tip', text: 'Visit after the first month and after the first quarter. Ask what they still do outside XionERP; each answer is the next thing to set up.' },
        ],
        remember: ['Read the daily updates email with the customer in mind.', 'Ask what is still done outside XionERP.'],
      },
    ],
    quiz: [
      { id: 'u1', q: 'Where does a problem with XionERP itself go to the XionERP team?', options: ['Report a problem, the question-mark button at the top of every page', 'CRM > Support Tickets', 'The customer\'s email', 'Master Data'] },
      { id: 'u2', q: 'Where do you record a customer issue you are handling today?', options: ['Nowhere', 'As a sales invoice', 'As an Activity on the customer in CRM', 'In Support Tickets'] },
      { id: 'u3', q: 'A user\'s account is locked after wrong passwords. What do you do?', options: ['Delete the user', 'Create a second user', 'Wait a week', 'Unlock Account or Reset Password on Users'] },
      { id: 'u4', q: 'A user still sees a page you switched off. Why?', options: ['They must sign out and in again (and Save Permissions must have been pressed)', 'Permissions do not work', 'Only the owner can switch pages off', 'The page is built in'] },
      { id: 'u5', q: 'A customer says a menu item from the demo is missing. What could be the reason?', options: ['The product is broken', 'That module is switched on per company and is off for them', 'They need a new computer', 'The trial has ended'] },
      { id: 'u6', q: '"I saved it but nothing changed." What do you ask first?', options: ['What browser they use', 'Whether they paid', 'What status the document is in', 'Their password'] },
      { id: 'u7', q: 'How is a posted document corrected?', options: ['Edit it directly', 'With another document: a return, credit note, reversal or reversing journal', 'Delete it', 'Change the date'] },
      { id: 'u8', q: 'What does an empty Accounting Health list mean?', options: ['The checks failed', 'There is no data', 'The ledger is sound', 'The year is closed'] },
      { id: 'u9', q: 'Someone needs to correct a closed year. What is right?', options: ['Back-date into the open year', 'Re-open the year with a reason, correct it, and close it again', 'Delete the year', 'It cannot be done'] },
      { id: 'u10', q: 'What is a good question when visiting a customer after the first month?', options: ['What do you still do outside XionERP?', 'Can we raise the price?', 'Can we remove your users?', 'None: avoid visits'] },
    ],
  },
];
