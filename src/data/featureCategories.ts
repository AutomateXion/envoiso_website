export interface FeatureCategory {
  title: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
  highlightNote?: string;
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: 'Accounting & Finance',
    blurb: 'The financial core every other module posts back to.',
    features: ['Chart of Accounts', 'General Ledger', 'Journal Vouchers', 'Trial Balance', 'Multi-currency & exchange rates', 'Bank & cash accounts', 'Received cheques (PDC tracking)'],
  },
  {
    title: 'Invoicing & Billing',
    blurb: 'From quote to cash, fully connected to the ledger.',
    features: ['Quotations', 'Sales invoices', 'Receipts', 'Sales returns', 'GCC e-invoicing (Fawtara / UBL 2.1)'],
  },
  {
    title: 'Financial Reporting',
    blurb: 'Board-ready reports, generated live — not exported and patched up.',
    features: ['Profit & Loss', 'Balance Sheet', 'Cash Flow', 'VAT Return', 'AR / AP Aging', 'Bank Reconciliation', 'Budget vs. Actual', 'Credit Risk', 'Day Book', 'Daily Closing & Daily Sales Reports', 'Liquidation Projection'],
  },
  {
    title: 'Sales & CRM',
    blurb: 'Pipeline, contacts and activity in one thread.',
    features: ['CRM dashboard', 'Leads', 'Contacts', 'Activities & tasks', 'Sales pipeline'],
  },
  {
    title: 'Field Sales',
    blurb: 'A mobile-first toolkit for reps working outside the office.',
    features: ['Rep dashboard', 'Quick order entry', 'My orders', 'Collections & collection vouchers', 'Customer snapshot', 'Live product availability'],
    highlight: true,
    highlightNote: 'A dedicated rep-in-the-field app — usually a separate mobile SKU elsewhere.',
  },
  {
    title: 'Purchase & Procurement',
    blurb: 'RFQ through to supplier payment, matched at every step.',
    features: ['RFQs', 'Vendor quotes', 'Purchase orders', 'Goods receipt (GRN)', 'Purchase invoices & returns', 'Payment vouchers', 'Supplier management'],
  },
  {
    title: 'Inventory & Warehouse',
    blurb: 'Multi-location stock that stays accurate without a recount.',
    features: ['Products', 'Delivery notes', 'Multiple warehouses & locations', 'Stock transfers', 'Stock adjustments', 'Reorder management'],
  },
  {
    title: 'Stock & Sales Analytics',
    blurb: 'See what\u2019s moving, what isn\u2019t, and who sold it.',
    features: ['Stock valuation', 'Stock movement & summary', 'Stock by location', 'Sales report', 'Sales vs. target', 'Salesman performance', 'Item profile report'],
  },
  {
    title: 'Fixed Assets',
    blurb: 'Assets tracked from purchase to depreciation to disposal.',
    features: ['Fixed asset register with GPS tracking', 'Automated depreciation journals', 'Maintenance scheduling', 'Consumables tracking'],
    highlight: true,
    highlightNote: 'GPS-tracked assets with auto-depreciation journals — most ERPs stop at a static asset list.',
  },
  {
    title: 'Projects',
    blurb: 'Tasks, milestones and costing tied back to the job.',
    features: ['Project detail & milestones', 'Feasibility analysis', 'Project costing', 'PM dashboard'],
  },
  {
    title: 'HR & Payroll',
    blurb: 'A full HR system, not a bolt-on employee list.',
    features: ['Employee records', 'Attendance & shifts', 'Leave types, requests & approvals', 'Payroll & payroll components', 'Organization structure', 'Performance goals, cycles & reviews'],
    highlight: true,
    highlightNote: 'A complete HRMS included standard — competitors typically charge for this as a separate product.',
  },
  {
    title: 'Recruitment',
    blurb: 'From job description to signed offer, tracked end to end.',
    features: ['Candidate pipeline', 'Interview scheduling', 'Job descriptions & JD library', 'Offer management', 'Onboarding', 'Public careers / apply page', 'Manpower requisitions'],
    highlight: true,
    highlightNote: 'A full applicant-tracking system, not just an HR module — rarely bundled with an ERP at this price.',
  },
  {
    title: 'Approvals & Governance',
    blurb: 'Control who can do what, and see who did what.',
    features: ['Configurable approval workflows', 'Approval inbox', 'Full audit trail', 'Granular permission matrix', 'User groups & roles'],
    highlight: true,
    highlightNote: 'Enterprise-grade access control and audit history, standard on every plan.',
  },
  {
    title: 'Compliance & E-Invoicing',
    blurb: 'Built for Oman\u2019s Fawtara mandate, not retrofitted.',
    features: ['UBL 2.1 / PINT-OM structured invoices', 'Peppol-ready architecture', 'VAT reporting'],
  },
  {
    title: 'Admin & Configuration',
    blurb: 'The settings that let you run this your way.',
    features: ['Company, accounting, document & email configuration', 'Feature flags', 'Import / export tools', 'Recurring expenses automation', 'Multi-tenant Super Admin portal'],
  },
  {
    title: 'Documents & Support',
    blurb: 'Everything filed and everyone helped, in-platform.',
    features: ['Central document storage across every module', 'Built-in support / ticketing'],
  },
];
