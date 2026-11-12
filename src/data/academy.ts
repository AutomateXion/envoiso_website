/*
 * XION ACADEMY: the free courses on xionerp.com/academy.
 *
 * Every lesson is written from the Help Center article of the screen it
 * describes (crm-frontend/src/help/articles in the platform repo), so a lesson
 * never says more than the product does. Where the product does not do
 * something yet, the lesson says so.
 *
 * The quiz questions are here; the ANSWERS are not. They sit on the server
 * (crm-core/src/academy/academy.keys.ts) so a certificate means the quiz was
 * passed. Change a question here and its key there in the same sitting.
 */
export type Block =
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'path'; text: string }
  | { t: 'tip'; text: string }
  /** A picture of the real screen, taken with made-up sample data (public/academy). */
  | { t: 'img'; src: string; alt: string; caption?: string }
  /** A short silent clip of the clicks; poster is shown until it plays. */
  | { t: 'video'; src: string; poster: string; caption: string };

export type Lesson = { id: string; title: string; minutes: number; blocks: Block[]; remember: string[] };
export type Question = { id: string; q: string; options: string[] };
export type Course = {
  id: string;
  /** Who the track is for, and the step on it (1 to 4). */
  track: 'customer' | 'partner'; stage: number;
  /** A job-style title, as it reads on a CV and on LinkedIn. */
  title: string; audience: string; blurb: string; outcome: string;
  lessons: Lesson[]; quiz: Question[];
};

import { CUSTOMER_STAGES } from './academy-customer';
import { PARTNER_STAGES } from './academy-partner';

export const PASS_MARK = 80;

const FIRST_STAGES: Course[] = [
  {
    id: 'fundamentals',
    track: 'customer', stage: 1,
    title: 'XionERP Certified User',
    audience: 'Customers · Stage 1 · Fundamentals',
    blurb: 'How XionERP is organised, how to set a company up, and how a sale, a purchase, stock and the books fit together.',
    outcome: 'You can find your way around XionERP and follow a sale and a purchase from the first document to the books.',
    lessons: [
      {
        id: 'organised', title: 'How XionERP is organised', minutes: 4,
        blocks: [
          { t: 'p', text: 'XionERP is a cloud ERP: you sign in from a browser and everything your business does sits in one place. The menu groups the work by what it is for: Sales, Purchase, Inventory Management, Warehouse & Delivery, Accounting, Banking & Cash and CRM, among others.' },
          { t: 'p', text: 'Settings for the whole company live under the gear at the top, in Administration. That is where you set up the company, the people who use it and the lists the other screens draw on.' },
          { t: 'p', text: 'Most work in XionERP is a chain of documents. One document leads to the next: a quotation to an invoice, an invoice to a receipt, a purchase order to a goods receipt. Each document picks up what the one before it already holds, so nothing is typed twice.' },
          { t: 'path', text: 'Written like this, a menu path tells you where to click: Sales > Sales Invoices.' },
          { t: 'img', src: '/academy/menu-sales-invoices.webp', alt: 'Sales Invoices screen with the menu on the left', caption: 'The menu on the left, open at Sales > Sales Invoices.' },
          { t: 'tip', text: 'XionERP has a Help Center with an article for each screen. It explains every field and where the screen sits in the chain. Open it from your profile menu (your initial, top right) > Help Center. When you are unsure what a field does, read the article before you guess.' },
          { t: 'img', src: '/academy/help-center.webp', alt: 'The Help Center, with a search box and a card for each module', caption: 'The Help Center: search, or open a module.' },
        ],
        remember: ['Work is grouped in menus by purpose; company settings are under the gear in Administration.', 'Documents chain together, so each one carries forward what the last one holds.'],
      },
      {
        id: 'setup', title: 'Setting up your company', minutes: 6,
        blocks: [
          { t: 'p', text: 'Set the company up once when it starts, and come back when something changes. These are the places to know.' },
          { t: 'ul', items: [
            'Company Settings holds the facts every document prints and the rules the system follows: VAT, credit, stock below zero, which sales document takes the goods, and more. One Save button stores the whole page.',
            'Financial Years lists every year since the books opened and whether each is open, closed or locked. Closing a year stops anything further being posted into it. Nobody has to create next year.',
            'Chart of Accounts is the list of every ledger account the company posts to. Invoices, receipts, vouchers and payroll post to these accounts, and every financial report is built from them.',
            'Master Data holds the lists behind the dropdowns: payment terms, payment methods, VAT rates, product categories, brands, units and many more. Add an option once and it appears wherever the list is used.',
          ] },
          { t: 'path', text: 'Administration (gear) > Company > Company Settings' },
          { t: 'img', src: '/academy/company-settings.webp', alt: 'Company Settings: company information, logo and branding' },
          { t: 'path', text: 'Administration (gear) > Data > Master Data' },
          { t: 'img', src: '/academy/master-data.webp', alt: 'Master Data: a list on the left and its options on the right' },
          { t: 'p', text: 'A company that is moving from another system uses Customer Onboarding. It loads the opening stock, unpaid invoices and bills, cheques, gift vouchers, loyalty points, fixed assets and bank and other balances as at one cut-off date, and then shows the opening trial balance. Each step is an Excel file that is checked first and loaded only when nothing is wrong with it. Every step is optional.' },
          { t: 'path', text: 'Administration (gear) > Data > Customer Onboarding' },
          { t: 'img', src: '/academy/customer-onboarding.webp', alt: 'Customer Onboarding: the steps across the top and the cut-off date', caption: 'The steps run across the top; the cut-off date is set first.' },
          { t: 'tip', text: 'Choose the cut-off date before you prepare any file. Every opening balance must be as at that same date.' },
        ],
        remember: ['Company Settings, Financial Years, Chart of Accounts and Master Data are set up once.', 'Customer Onboarding loads opening balances as at one cut-off date, checking each Excel file before it loads.'],
      },
      {
        id: 'people', title: 'People and access', minutes: 4,
        blocks: [
          { t: 'p', text: 'Not everyone should see everything. XionERP controls access in three steps, all under the gear in People & Access.' },
          { t: 'ul', items: [
            'Users is where an administrator adds the people who work in the system and decides which user group each one belongs to.',
            'User Groups are roles, such as Sales Executive or Accounts. Every user belongs to one, and the group decides which screens they open, whose records they see and where they land after signing in.',
            'Permissions decides, for one user group at a time, which modules, pages, tabs and actions its members can use. Everything is a switch: a page can be viewed, created on, edited and deleted.',
          ] },
          { t: 'path', text: 'Administration (gear) > People & Access > Permissions' },
          { t: 'video', src: '/academy/clip-permissions.mp4', poster: '/academy/clip-permissions.webp', caption: 'Switch on Delete for Quotations, then press Save Permissions. Nothing changes until you save.' },
          { t: 'tip', text: 'Nothing changes on the Permissions screen until you press Save Permissions. Give each group only what its job needs.' },
        ],
        remember: ['A user belongs to one group; the group decides what they can open.', 'Press Save Permissions or nothing changes.'],
      },
      {
        id: 'products', title: 'Products, customers and prices', minutes: 5,
        blocks: [
          { t: 'p', text: 'Every sales and purchase document picks its items and its customer or supplier from a register. Keep the registers clean and the documents are quick.' },
          { t: 'ul', items: [
            'Products & Services is the list of everything you buy, sell or hold: stock items, consumables, fixed assets, rental items and services. A new stock item can start with an opening quantity, which puts it into stock and onto the books in one step.',
            'Contacts & Accounts is the register of every company and person you deal with. Accounts are your customers, resellers and suppliers; contacts are the people who work there.',
            'Suppliers are managed from the Purchase menu.',
            'Price Lists hold your own prices for some or all products, for the customers each list is given to. When a sales document is raised, the customer\'s list sets the prices; items it does not price take the standard price. Prices on the document can still be changed line by line.',
          ] },
          { t: 'path', text: 'Inventory Management > Products & Services' },
          { t: 'img', src: '/academy/products.webp', alt: 'Products & Services list with stock and prices' },
          { t: 'path', text: 'CRM > Contacts & Accounts' },
          { t: 'img', src: '/academy/contacts.webp', alt: 'Contacts & Accounts: customers and suppliers in one register' },
          { t: 'path', text: 'Inventory Management > Price Lists' },
          { t: 'img', src: '/academy/price-lists.webp', alt: 'A price list beside the standard price of each product', caption: 'The list price beside the standard price. Items left empty take the standard price.' },
        ],
        remember: ['Documents pick items and customers from the registers, so keep the registers accurate.', 'A customer\'s price list sets the prices on their documents, and a line can still be changed.'],
      },
      {
        id: 'selling', title: 'Selling: from quotation to receipt', minutes: 7,
        blocks: [
          { t: 'p', text: 'A typical sale follows a chain. You do not need every step; your company uses the ones it needs.' },
          { t: 'ul', items: [
            'Quotation: the price you offer before the customer buys. It changes nothing in stock or in the books. When the customer agrees, you convert it into a delivery note or an invoice and the customer, lines, discount and terms carry across.',
            'Sales Order (optional): what the customer ordered. It can be delivered on one or more delivery notes, or billed straight on an invoice, and it always shows what has been delivered, invoiced and is still to go.',
            'Sales Invoice: bills the customer. Once posted, the customer owes the amount, the sale counts in every sales report, and the goods leave stock (unless your company takes stock out on the delivery note instead).',
            'Receipt: records money the customer has paid. It is saved as a draft first; posting it pays down the invoices it names and puts the money in the right cash, bank, card or cheque account.',
          ] },
          { t: 'path', text: 'Sales > Quotations  >  Sales > Sales Invoices  >  Sales > Receipts' },
          { t: 'video', src: '/academy/clip-quotation.mp4', poster: '/academy/clip-quotation.webp', caption: 'A new quotation: pick the customer and their details fill in, add a product and a quantity, and the total follows.' },
          { t: 'img', src: '/academy/sales-invoices.webp', alt: 'Sales Invoices with what was invoiced, paid and is still outstanding', caption: 'Sales Invoices: what is invoiced, paid and still outstanding.' },
          { t: 'img', src: '/academy/receipts.webp', alt: 'Receipts list with the payment method of each' },
          { t: 'p', text: 'When goods come back, a Sales Return puts them back in stock and credits the customer: the invoice owes less, or, if it was already paid, the customer has a credit to use or be paid back. To see where a customer stands, open Customer Statement: every invoice and payment in a period with a running balance.' },
          { t: 'path', text: 'Sales > Sales Returns' },
          { t: 'img', src: '/academy/sales-returns.webp', alt: 'Sales Returns and credit notes' },
          { t: 'path', text: 'Sales > Customer Statement' },
          { t: 'video', src: '/academy/clip-statement.mp4', poster: '/academy/clip-statement.webp', caption: 'Pick a customer: every invoice and payment in the period, with a running balance.' },
        ],
        remember: ['A quotation changes nothing; a posted invoice makes the customer owe and counts as a sale.', 'A receipt is a draft until posted; posting pays down the invoices it names.'],
      },
      {
        id: 'buying', title: 'Buying: from purchase order to payment', minutes: 6,
        blocks: [
          { t: 'p', text: 'Buying follows a chain of its own.' },
          { t: 'ul', items: [
            'Purchase Order: what you ask a supplier to deliver.',
            'Goods Receipt: records goods that have arrived. Once it is received, the goods go into stock in the warehouse you name, at what they cost. Freight, duty and clearing for the goods are added from here as a landed cost.',
            'Purchase Invoice: records the supplier\'s bill. It is keyed in as a draft and reaches the books when it is received: from then on the supplier is owed the amount and it shows in what you owe.',
            'Payment Voucher: records money you paid out, to a supplier against what you owe them or straight to an expense such as rent. It is saved as a draft first; posting it takes the money out of the cash box or bank and, for a supplier, pays down their bill.',
          ] },
          { t: 'path', text: 'Purchase > Purchase Orders  >  Purchase > Goods Receipt  >  Purchase > Purchase Invoices  >  Purchase > Payment Vouchers' },
          { t: 'img', src: '/academy/purchase-orders.webp', alt: 'Purchase Orders with what has been received' },
          { t: 'img', src: '/academy/goods-receipt.webp', alt: 'Goods Receipt Notes, with goods on the way from a supplier ready to receive', caption: 'Goods Receipt: goods on the way are received from here, into stock.' },
          { t: 'img', src: '/academy/purchase-invoices.webp', alt: 'Purchase Invoices: supplier bills, goods and services, with what is still owed' },
          { t: 'img', src: '/academy/payment-vouchers.webp', alt: 'Payment Vouchers: to suppliers, and straight to expenses such as rent' },
          { t: 'p', text: 'Supplier Statement shows one supplier\'s account with you: every bill and payment in a period with a running balance, and what you still owe. Use it to agree your figures with the supplier\'s own statement.' },
          { t: 'path', text: 'Purchase > Supplier Statement' },
        ],
        remember: ['A received goods receipt puts the goods in stock at cost; landed cost adds freight, duty and clearing.', 'A purchase invoice is a draft until received; then the supplier is owed.'],
      },
      {
        id: 'books', title: 'Stock, bank and the books', minutes: 6,
        blocks: [
          { t: 'p', text: 'These screens keep stock and money honest.' },
          { t: 'ul', items: [
            'Stock Adjustments add stock or take it away when no purchase, sale or transfer explains the change: a count that came out different, damaged goods, a sample given away. Confirmed, it moves the stock and posts the gain or loss to the books. A confirmed adjustment is never changed; it is undone with a reversal.',
            'Stock Transfers move goods from one place to another, warehouse to warehouse or bin to bin. It is saved as a draft; confirming it moves the stock. The company holds the same quantity at the same value afterwards, so a transfer makes no journal entry.',
            'Stock Reports read your stock and tell you what to do next: what has sat too long, what is not selling, what runs out soon, what is about to expire.',
            'Bank Reconciliation puts your bank\'s statement beside your own books, line by line. You import the statement, the screen suggests which receipt, payment or journal each line is, and you confirm. A bank charge confirmed here posts to bank charges so your books agree with the bank.',
            'Day Book is one day\'s register of money: every sale, collection, expense, payment and deposit on its own line, from opening cash to closing cash. It is switched on for companies that ask for it, so your menu may not show it.',
            'Trial Balance lists every account that has entries, with one balance each. Use it to check that the books balance before you read the Profit & Loss or the Balance Sheet.',
          ] },
          { t: 'path', text: 'Warehouse & Delivery > Warehouse Management > Stock Adjustments' },
          { t: 'img', src: '/academy/stock-adjustments.webp', alt: 'Stock Adjustments, each with a reason' },
          { t: 'path', text: 'Banking & Cash > Bank Reconciliation' },
          { t: 'img', src: '/academy/bank-reconciliation.webp', alt: 'Bank Reconciliation: an imported statement with the lines still to match' },
          { t: 'path', text: 'Accounting > Trial Balance  (and Accounting > Day Book, where it is switched on)' },
          { t: 'img', src: '/academy/trial-balance.webp', alt: 'Trial Balance: one balance per account, debits equal to credits', caption: 'Balanced: total debits equal total credits.' },
        ],
        remember: ['An adjustment is for changes no document explains, and is undone only by a reversal.', 'Reconcile the bank by confirming suggested matches; check the Trial Balance before reading the reports.'],
      },
    ],
    quiz: [
      { id: 'f1', q: 'In Bank Reconciliation, what do you do with a line from the imported bank statement?', options: ['Type the whole line again as a journal', 'Confirm the receipt, payment or journal the screen suggests it matches', 'Delete it from the statement', 'Print it and file it'] },
      { id: 'f2', q: 'Which is the usual order of a sale that starts with a quotation?', options: ['Receipt, invoice, quotation', 'Quotation, receipt, invoice', 'Quotation, then a delivery note or invoice, then the receipt', 'Invoice, quotation, receipt'] },
      { id: 'f3', q: 'What does a quotation change in stock and in the books?', options: ['Nothing', 'It takes the goods out of stock', 'It makes the customer owe the amount', 'It posts the sale to the sales reports'] },
      { id: 'f4', q: 'What happens when a sales invoice is posted?', options: ['Nothing until the customer pays', 'Only the stock changes', 'It is deleted once printed', 'The customer owes the amount and the sale counts in every sales report'] },
      { id: 'f5', q: 'How do you record money a customer has paid?', options: ['Edit the total on the invoice', 'With a receipt: saved as a draft, then posted to pay down the invoices it names', 'With a stock adjustment', 'With a quotation'] },
      { id: 'f6', q: 'When a goods receipt is received, what happens?', options: ['The supplier is paid', 'The customer is invoiced', 'The goods go into stock in the warehouse named, at what they cost', 'Nothing: it is only a note'] },
      { id: 'f7', q: 'When does a purchase invoice show in what you owe the supplier?', options: ['When it is received', 'As soon as it is typed in as a draft', 'When the year is closed', 'Only after the payment voucher is posted'] },
      { id: 'f8', q: 'Where are freight, duty and clearing costs added to the cost of goods?', options: ['On the sales invoice', 'On the quotation', 'In Master Data', 'As a landed cost from the goods receipt'] },
      { id: 'f9', q: 'You change what a user group may open on the Permissions screen. When does it take effect?', options: ['Immediately, as you tick each switch', 'After you press Save Permissions', 'At the end of the month', 'Only after the users are deleted and added again'] },
      { id: 'f10', q: 'Customer Onboarding loads opening balances as at what?', options: ['Today\'s date, whenever each step is run', 'The date each customer was added', 'One cut-off date that you choose', 'The first day of the financial year, always'] },
    ],
  },
  {
    id: 'partner',
    track: 'partner', stage: 1,
    title: 'XionERP Partner Essentials',
    audience: 'Partners · Stage 1',
    blurb: 'How the partner programme works, what your partner portal gives you, and how to show, set up and support XionERP for a customer.',
    outcome: 'You can explain the programme, use your partner portal, and take a customer from first demo to first week.',
    lessons: [
      {
        id: 'roles', title: 'Reseller or distributor', minutes: 4,
        blocks: [
          { t: 'p', text: 'XionERP has two kinds of partner.' },
          { t: 'ul', items: [
            'A reseller sells XionERP to its own customers, sets it up for them and supports them.',
            'A distributor covers a whole country. It does what a reseller does and also builds and supports a network of resellers there.',
          ] },
          { t: 'p', text: 'A few rules keep the network clear. A reseller works under one distributor, in the same country. A distributor does not work under anyone. A distributor that covers more than one country is listed once for each country, with the company it has registered in that country.' },
          { t: 'p', text: 'Active partners that agree to be listed appear in the public Partner directory, where anyone can search by country and by type.' },
          { t: 'path', text: 'xionerp.com/partners/directory' },
          { t: 'img', src: '/academy/partner-directory.webp', alt: 'The public Partner directory, searched by country, type, company or city' },
          { t: 'tip', text: 'Applying is free and commits neither side. If both sides go ahead, the terms are agreed with you directly and put in a partner agreement.' },
        ],
        remember: ['Reseller: sells and supports its own customers. Distributor: covers a country and supports resellers.', 'A reseller has one distributor, in the same country.'],
      },
      {
        id: 'portal', title: 'Your partner portal', minutes: 4,
        blocks: [
          { t: 'p', text: 'When your application is approved, you get a welcome email with an invitation. Open it, choose a password, and your partner portal opens. After that you sign in at xionerp.com/partners/kit with your email and your password. "Forgot password" sends a link to reset it.' },
          { t: 'p', text: 'In the portal you add your logo and contact details once. They are printed on every piece of material you download.' },
          { t: 'ul', items: [
            'The XionERP brochure and leaflet',
            'Data sheets for XionERP, XionConnect and XionWebstore',
            'Three social posters',
          ] },
          { t: 'p', text: 'Each piece carries a strip with your logo, your company, your country and your contact person. Download again after you change your details, because a file you downloaded earlier keeps the old ones.' },
          { t: 'path', text: 'xionerp.com/partners/kit' },
          { t: 'img', src: '/academy/partner-kit-sign-in.webp', alt: 'Sign in to your partner kit with your email and password' },
        ],
        remember: ['The invitation in your welcome email lets you create a password once; after that, sign in with email and password.', 'Your logo and contacts are printed on every material; download again after a change.'],
      },
      {
        id: 'customers', title: 'Finding the right customers', minutes: 4,
        blocks: [
          { t: 'p', text: 'Start with the businesses you already serve. They know you, and you already know how they work.' },
          { t: 'p', text: 'XionERP covers the work of a growing business in one system: sales, purchasing, inventory and warehouse, accounting and banking, CRM, HR and payroll, point of sale, WhatsApp and an online store. A business is a good fit when it keeps running into the limits of separate tools: invoices in one place, stock in another, accounts in a third.' },
          { t: 'ul', items: [
            'Ask how they raise an invoice today, and how long it takes to know what is in stock.',
            'Ask who chases late payments, and how they know who owes what.',
            'Ask how the accountant gets the figures at month end.',
          ] },
          { t: 'tip', text: 'Listen for work that is done twice. Every place a figure is typed twice is a place XionERP removes the second typing.' },
        ],
        remember: ['Begin with customers you already serve.', 'Look for work done twice and figures typed in more than one place.'],
      },
      {
        id: 'demo', title: 'Showing XionERP', minutes: 5,
        blocks: [
          { t: 'p', text: 'A good demo tells one story from start to finish. Use the chain from the Fundamentals course.' },
          { t: 'ul', items: [
            'Raise a quotation for a product the customer really sells, then convert it to an invoice.',
            'Post the invoice and record a receipt against it.',
            'Open Customer Statement to show where the customer stands.',
            'Buy stock with a purchase order and goods receipt, and show the stock arrive.',
            'Finish with the Trial Balance: the books were written as you worked.',
          ] },
          { t: 'video', src: '/academy/clip-quotation.mp4', poster: '/academy/clip-quotation.webp', caption: 'The first step of the story: a quotation for a product the customer really sells.' },
          { t: 'p', text: 'Let the customer try it themselves. They can start a free trial from xionerp.com.' },
          { t: 'tip', text: 'Use the customer\'s own product names and prices in the demo. It makes the story theirs.' },
        ],
        remember: ['Tell one story: quotation, invoice, receipt, statement, then a purchase.', 'Finish on the books: they were written as you worked.'],
      },
      {
        id: 'onboard', title: 'Setting a customer up', minutes: 5,
        blocks: [
          { t: 'p', text: 'A smooth first week comes from doing the setup in the right order.' },
          { t: 'ul', items: [
            'Company Settings: the company\'s details and the rules it follows.',
            'Users, User Groups and Permissions: who can do what.',
            'Products & Services and Contacts & Accounts: what they sell and who they sell to.',
            'Customer Onboarding: the opening stock, unpaid invoices and bills, cheques and balances as at one cut-off date, each step an Excel file that is checked first.',
            'Open the opening trial balance and agree it with the customer\'s accountant before they start working.',
          ] },
          { t: 'path', text: 'Administration (gear) > Data > Customer Onboarding' },
          { t: 'img', src: '/academy/customer-onboarding.webp', alt: 'Customer Onboarding: the steps across the top and the cut-off date' },
          { t: 'tip', text: 'Agree the cut-off date with the customer first. Every opening balance must be as at that date.' },
        ],
        remember: ['Set up in order: company, people, products and customers, then opening balances.', 'Agree the opening trial balance before the customer starts.'],
      },
      {
        id: 'support', title: 'Supporting your customers', minutes: 5,
        blocks: [
          { t: 'p', text: 'You give first-line support to the customers you bring. The XionERP team supports you on anything deeper.' },
          { t: 'ul', items: [
            'Start with the Help Center article for the screen the customer is on (profile menu > Help Center). It explains every field.',
            'Record customer issues as Activities on the customer in CRM. The Support Tickets screen is not ready yet.',
            'When you cannot solve it, bring the XionERP team in with the screen, what the customer did and what they expected.',
          ] },
          { t: 'img', src: '/academy/help-center.webp', alt: 'The Help Center, with a search box and a card for each module' },
          { t: 'p', text: 'Be accurate about what the product does today. For example, Fawtara is Oman\'s e-invoicing scheme. XionERP turns each sales invoice into the standard e-invoice file (UBL 2.1) for the customer\'s accredited provider to pass to the tax authority. Sending the file to the provider automatically is not built yet.' },
          { t: 'tip', text: 'When a customer asks for something XionERP does not do yet, say so plainly and tell us. An honest answer keeps the customer\'s trust.' },
        ],
        remember: ['You are first line; the XionERP team is behind you.', 'Say plainly what the product does today, including what is not built yet.'],
      },
    ],
    quiz: [
      { id: 'p1', q: 'What does a reseller do?', options: ['Sells XionERP to its own customers, sets it up and supports them', 'Covers a whole country and appoints other partners', 'Only refers leads and does no support', 'Hosts XionERP on its own servers'] },
      { id: 'p2', q: 'What does a distributor do?', options: ['Sells to a single customer only', 'Handles only the billing for XionERP', 'Writes the product\'s code', 'Covers a whole country, and builds and supports a network of resellers'] },
      { id: 'p3', q: 'How many distributors can a reseller work under?', options: ['As many as it likes', 'One, in the same country', 'One in every country, always', 'None: resellers work alone'] },
      { id: 'p4', q: 'A distributor covers two countries. How is it listed in the directory?', options: ['As one entry with a list of countries', 'Only in the country of its head office', 'Once for each country, with the company it has registered there', 'It is not listed'] },
      { id: 'p5', q: 'Who appears in the public partner directory?', options: ['Every applicant', 'Active partners that agree to be listed', 'Only distributors', 'Only partners that have uploaded a logo'] },
      { id: 'p6', q: 'What is Customer Onboarding used for?', options: ['Loading opening stock, unpaid invoices and bills, cheques and balances as at one cut-off date', 'Inviting new partners', 'Translating the system', 'Sending marketing email'] },
      { id: 'p7', q: 'Who gives first-line support to the customers you bring?', options: ['Always the XionERP team directly', 'Nobody: XionERP is self-service', 'You, with the XionERP team behind you for anything deeper', 'The customer\'s bank'] },
      { id: 'p8', q: 'What does it cost to apply as a partner?', options: ['A one-time fee paid on approval', 'A fee for every customer', 'A monthly subscription', 'Nothing: applying is free and commits neither side'] },
      { id: 'p9', q: 'Where do you download brochures and posters that carry your own logo and contacts?', options: ['By emailing the XionERP team each time', 'From the partner portal, after you sign in', 'From the public Help Center', 'You design them yourself'] },
      { id: 'p10', q: 'A customer in Oman asks about e-invoicing (Fawtara). What is accurate to say today?', options: ['XionERP sends every invoice to the tax authority automatically', 'XionERP does not support e-invoicing', 'XionERP creates the standard e-invoice file (UBL 2.1) for each sales invoice; sending it to the provider automatically is not built yet', 'E-invoicing is only for retail shops'] },
    ],
  },
];

export const COURSES: Course[] = [...FIRST_STAGES, ...CUSTOMER_STAGES, ...PARTNER_STAGES]
  .sort((a, b) => (a.track === b.track ? a.stage - b.stage : a.track === 'customer' ? -1 : 1));
export const TRACKS: { id: Course['track']; title: string; sub: string }[] = [
  { id: 'customer', title: 'For customers and their teams', sub: 'Four stages, from first steps to running the system. Each certificate carries a job title you can put on your CV and LinkedIn.' },
  { id: 'partner', title: 'For resellers and distributors', sub: 'Four stages, from the programme to selling, implementing and supporting XionERP.' },
];

export const courseById = (id: string) => COURSES.find((c) => c.id === id);
export const courseMinutes = (c: Course) => c.lessons.reduce((n, l) => n + l.minutes, 0) + 5;
