import { MODULE_ICONS } from './moduleIcons';

export interface EvxModule { n: string; d: string; svg: string; }

export const EVX_MODULES: EvxModule[] = [
  { n: 'Dashboard', d: 'A CEO Dashboard and a Command Deck for every entity \u2014 sales, purchase, finance, profitability and stock on one screen, with the owner\u2019s view first.', svg: MODULE_ICONS['Dashboard'] },
  { n: 'Accounting', d: 'General ledger, journals, trial balance — to three decimals.', svg: MODULE_ICONS['Accounting'] },
  { n: 'Banking & Cash', d: 'Bank accounts, PDC cheques and reconciliation.', svg: MODULE_ICONS['Banking & Cash'] },
  { n: 'CRM', d: 'Leads, contacts and pipeline from first touch to close.', svg: MODULE_ICONS['CRM'] },
  { n: 'Sales', d: 'Quotations and delivery notes through the full cycle.', svg: MODULE_ICONS['Sales'] },
  { n: 'Purchase', d: 'POs, goods receipt and supplier invoices, matched.', svg: MODULE_ICONS['Purchase'] },
  { n: 'Inventory', d: 'Multi-location stock with FIFO / average costing.', svg: MODULE_ICONS['Inventory'] },
  { n: 'Warehouse & Delivery', d: 'Multi-warehouse operations and delivery tracking, separate from stock counts.', svg: MODULE_ICONS['Warehouse & Delivery'] },
  { n: 'Assets', d: 'Fixed assets with GPS tracking, depreciation and maintenance.', svg: MODULE_ICONS['Assets'] },
  { n: 'Project Management', d: 'Tasks, milestones and project costing.', svg: MODULE_ICONS['Project Management'] },
  { n: 'Analytics Center', d: 'Cross-department BI — KPIs, funnels and risk scoring, not just static reports.', svg: MODULE_ICONS['Analytics Center'] },
  { n: 'Reports', d: 'Financial, sales and stock reports in real time.', svg: MODULE_ICONS['Reports'] },
];

// Outer ring: differentiator modules most ERPs don't bundle.
export const EVX_MODULES_OUTER: EvxModule[] = [
  { n: 'Human Resources', d: 'A full HRMS — employees, attendance, leave, payroll and performance. Most competitors sell this as a separate product.', svg: MODULE_ICONS['Human Resources'] },
  { n: 'Maintenance', d: 'Service calls, AMC contracts, PM visits and technician productivity — run field service like a business, not a bolt-on to inventory.', svg: MODULE_ICONS['Maintenance'] },
  { n: 'Field Sales', d: 'A mobile-first rep app — quick orders, collections and live stock, built for reps working outside the office.', svg: MODULE_ICONS['Field Sales'] },
  { n: 'Point of Sale', d: 'A real point-of-sale, not a workaround — built for retail and counter sales, connected to the same stock and accounts.', svg: MODULE_ICONS['Point of Sale'] },
  { n: 'Manufacturing', d: 'Recipes by size and colour, operation bulletin with SMV and piece rates, fabric rolls with 4-point inspection, a cutting room, and production orders made straight from a sales order \u2014 all flowing into the same stock and ledger.', svg: MODULE_ICONS['Manufacturing'] },
  { n: 'Social Media', d: 'WhatsApp inbox, campaigns, flows and templates, Facebook and Instagram messages, and SEO tools \u2014 every customer conversation and your search visibility, inside the ERP you already run.', svg: MODULE_ICONS['WhatsApp'] },
  { n: 'Claude AI', d: 'Connect your own Claude to Xion ERP and ask the owner\u2019s questions \u2014 profit, cash, best sellers, low stock, overdue receivables \u2014 and send a document to the customer by WhatsApp or email, with every write previewed and confirmed first.', svg: MODULE_ICONS['Claude'] },
  { n: 'Xion Webstore', d: 'Your own online shop, run from the XionERP you already use. Prices and stock come from XionERP; coupons, templates, Google Shopping, Facebook, Instagram and WhatsApp product feeds are built in, and web orders land as sales documents.', svg: MODULE_ICONS['Xion Webstore'] },
];
