export const EVX_MODULES = [
  { n: 'Accounting', d: 'General ledger, journals, trial balance — to three decimals.', c: '#2E6DA4', icon: 'M3 3v18h18 M7 14l4-4 3 3 5-6' },
  { n: 'Invoicing', d: 'Sales invoices, receipts and GCC e-invoicing built in.', c: '#2E6DA4', icon: 'M9 7h6 M9 11h6 M9 15h4 M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z' },
  { n: 'Banking', d: 'Bank accounts, PDC cheques and reconciliation.', c: '#4A9BD2', icon: 'M3 21h18 M5 21V10 M19 21V10 M3 10l9-6 9 6z' },
  { n: 'CRM', d: 'Leads, contacts and pipeline from first touch to close.', c: '#13a89e', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87' },
  { n: 'Sales', d: 'Quotations and delivery notes through the full cycle.', c: '#13a89e', icon: 'M3 17l6-6 4 4 8-8 M21 7v6h-6' },
  { n: 'Purchase', d: 'POs, goods receipt and supplier invoices, matched.', c: '#e08a1e', icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0' },
  { n: 'Inventory', d: 'Multi-location stock with FIFO / average costing.', c: '#13c2c2', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12' },
  { n: 'Assets', d: 'Fixed assets with GPS tracking, depreciation and maintenance.', c: '#c2418a', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
  { n: 'Projects', d: 'Tasks, milestones and project costing.', c: '#7a5af0', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { n: 'Reports', d: 'Financial, sales and stock analytics in real time.', c: '#e0a800', icon: 'M3 3v18h18 M7 16V9 M12 16V5 M17 16v-4' },
  { n: 'Documents', d: 'Central document storage across the platform.', c: '#7a8694', icon: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
];

// Outer ring: the modules most ERPs and accounting tools don't bundle —
// usually sold separately, or not offered at all. Rendered further out,
// connected with a dashed line, and flagged in the UI as differentiators.
export const EVX_MODULES_OUTER = [
  { n: 'HR & Payroll', d: 'A full HRMS — employees, attendance, leave, payroll and performance. Most competitors sell this as a separate product.', c: '#e0a800', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 11l2 2 4-4' },
  { n: 'Recruitment', d: 'A built-in applicant tracking system — job descriptions, candidates, interviews, offers, onboarding — not a bolt-on integration.', c: '#e0a800', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M17 8h4 M19 6v4' },
  { n: 'Field Sales', d: 'A mobile-first rep app — quick orders, collections and live stock, built for reps working outside the office.', c: '#13a89e', icon: 'M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  { n: 'Governance', d: 'Configurable approval workflows, a full audit trail and a granular permission matrix — standard on every plan, not a top-tier upsell.', c: '#5B7186', icon: 'M12 2l8 4v6c0 5.25-3.4 9.74-8 11-4.6-1.26-8-5.75-8-11V6z M9.5 12.5l1.8 1.8 3.2-3.6' },
];
