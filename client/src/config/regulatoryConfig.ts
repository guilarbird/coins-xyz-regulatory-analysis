export interface CapitalEvent {
  id: string;
  date: string;
  entity: 'IP' | 'VASP' | 'Both';
  amount_brl: number;
  split?: {
    IP: number;
    VASP: number;
  };
  label: string;
  purpose: string;
  link: string;
}

export interface Milestone {
  id: string;
  date: string;
  entity: 'IP' | 'VASP' | 'Both';
  type: 'event' | 'deadline' | 'window';
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'planned';
}

export const capitalEvents: CapitalEvent[] = [
  {
    id: "ip-2026-02",
    date: "2026-02-15",
    entity: "IP",
    amount_brl: 2000000,
    label: "Partial",
    purpose: "Pre-audit capacity",
    link: "/ip#partial-2026-02"
  },
  {
    id: "vasp-2026-02",
    date: "2026-02-20",
    entity: "VASP",
    amount_brl: 3000000,
    label: "Partial",
    purpose: "Baseline for PRE",
    link: "/vasp#partial-2026-02"
  },
  {
    id: "ip-2026-05-01",
    date: "2026-05-01",
    entity: "IP",
    amount_brl: 3000000,
    label: "Pre-Audit",
    purpose: "Top-up for audit",
    link: "/ip#preaudit-2026-05"
  },
  {
    id: "vasp-2026-05-01",
    date: "2026-05-01",
    entity: "VASP",
    amount_brl: 5000000,
    label: "Pre-Audit",
    purpose: "Top-up for audit",
    link: "/vasp#preaudit-2026-05"
  },
  {
    id: "both-2026-11",
    date: "2026-11-01",
    entity: "Both",
    amount_brl: 6000000,
    split: {
      IP: 2500000,
      VASP: 3500000
    },
    label: "Filing Align",
    purpose: "Paid-in ≈ PRE at filing",
    link: "/ip#filing-2026-11"
  },
  {
    id: "both-2028-01",
    date: "2028-01-15",
    entity: "Both",
    amount_brl: 4200000,
    split: {
      IP: 1700000,
      VASP: 2500000
    },
    label: "Final Top-Up",
    purpose: "Year-one compliance",
    link: "/ip#final-2028-01"
  }
];

export const milestones: Milestone[] = [
  {
    id: "ip-filing-target",
    date: "2026-03-15",
    entity: "IP",
    type: "deadline",
    title: "IP Filing (Target)",
    description: "Target date for Payment Institution authorization filing",
    status: "upcoming"
  },
  {
    id: "vasp-audit-window",
    date: "2026-06-01",
    entity: "VASP",
    type: "window",
    title: "External Audit Window (VASP)",
    description: "Jun-Sep 2026 audit window for VASP compliance validation",
    status: "upcoming"
  },
  {
    id: "vasp-authorization-deadline",
    date: "2026-11-01",
    entity: "VASP",
    type: "deadline",
    title: "VASP Authorization Deadline",
    description: "Hard deadline for VASP authorization filing",
    status: "upcoming"
  },
  {
    id: "full-compliance",
    date: "2028-01-15",
    entity: "Both",
    type: "event",
    title: "Full Compliance",
    description: "Both licenses fully operational and compliant",
    status: "planned"
  }
];

export const capitalPlan = {
  ip: {
    total: 9200000,
    entity: "Coins.xyz Global Trading Ltda.",
    license: "Payment Institution (IP)",
    resolutions: ["BCB Resolution 517", "Joint Resolution 14/2025"],
    events: capitalEvents.filter(e => e.entity === 'IP' || e.entity === 'Both')
  },
  vasp: {
    total: 14000000,
    entity: "Coins.xyz Digital Markets Ltda.",
    license: "Virtual Asset Service Provider (VASP)",
    resolutions: ["BCB Resolution 519", "BCB Resolution 520", "BCB Resolution 521"],
    events: capitalEvents.filter(e => e.entity === 'VASP' || e.entity === 'Both')
  }
};

export const requirements = {
  ip: [
    "Minimum capital: R$ 9.200.000",
    "Business Plan completion",
    "SISORF packaging",
    "Controller registration (CNPJ)",
    "Bylaws amendment",
    "RDE-IED (FDI) registration"
  ],
  vasp: [
    "Minimum capital: R$ 14.000.000",
    "PRE (Patrimônio de Referência Exigido) validation",
    "External audit selection (RFP)",
    "Controller registration (CNPJ)",
    "Bylaws amendment",
    "RDE-IED (FDI) registration"
  ]
};

export const checklists = {
  ip: [
    { item: "Business Plan", status: "in-progress" },
    { item: "SISORF Documentation", status: "pending" },
    { item: "Capital Structure", status: "in-progress" },
    { item: "Controller Registration", status: "in-progress" }
  ],
  vasp: [
    { item: "PRE Calculator", status: "in-progress" },
    { item: "External Audit RFP", status: "in-progress" },
    { item: "Capital Requirements", status: "in-progress" },
    { item: "Controller Registration", status: "in-progress" }
  ]
};
