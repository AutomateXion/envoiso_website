import { MODULE_ICONS } from './moduleIcons';

export interface EvxModule { n: string; d: string; svg: string; }

export const EVX_MODULES: EvxModule[] = [
  { n: 'Dashboard', d: 'One command centre for the whole business — live KPIs, role-based landing view.', svg: MODULE_ICONS['Dashboard'] },
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
];
