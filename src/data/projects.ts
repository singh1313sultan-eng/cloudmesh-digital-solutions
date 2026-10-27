export type ProjectKind = 'website' | 'portal' | 'mobile';

export interface Project {
  id: string;
  name: string;
  category: string;
  kind: ProjectKind;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Public URL, shown as "Visit live site" when present. */
  url?: string;
  /** Optional screenshot in /public (e.g. '/work/brown-boys.webp'); a styled mockup is drawn otherwise. */
  image?: string;
  /** Tailwind gradient stops used for the card mockup. */
  accent: string;
  monogram: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'brown-boys',
    name: 'Brown Boys',
    category: 'Restaurant ordering platform',
    kind: 'website',
    summary:
      'Online ordering for a New Zealand gourmet street-food brand: fusion burgers, loaded fries and stuffed parathas for delivery and pickup.',
    highlights: ['Menu & cart with live pricing', 'Stripe checkout', 'Owner order dashboard'],
    stack: ['React', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind'],
    url: 'https://brownboys.co.nz',
    accent: 'from-amber-500 via-orange-500 to-rose-500',
    monogram: 'BB'
  },
  {
    id: 'tiffin-and-treat',
    name: 'Tiffin & Treat',
    category: 'Food delivery & subscriptions',
    kind: 'website',
    summary:
      'Branded ordering site for homestyle tiffin meal boxes, artisanal pizzas and treats, delivered across New Zealand with no third-party commission.',
    highlights: ['Meal-box ordering', 'Delivery & pickup flows', 'Secure online payments'],
    stack: ['React', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind'],
    url: 'https://tiffintreat.co.nz',
    accent: 'from-emerald-500 via-teal-500 to-lime-400',
    monogram: 'T&T'
  },
  {
    id: 'stone-soul',
    name: 'Stone Soul',
    category: 'Luxury e-commerce · AI try-on',
    kind: 'website',
    summary:
      'An architectural luxury apparel storefront with an AI camera virtual try-on, real-time inventory management and order tracking.',
    highlights: ['AI virtual try-on via camera', 'Real-time inventory', 'Order tracking'],
    stack: ['React', 'Gemini AI', 'Supabase', 'Node.js'],
    accent: 'from-stone-500 via-neutral-700 to-zinc-900',
    monogram: 'SS'
  },
  {
    id: 'move-logistics',
    name: 'Move Logistics',
    category: 'On-demand logistics & fleet control',
    kind: 'mobile',
    summary:
      'Urban logistics platform with a customer booking app, a driver-partner app and an operations control tower for live fleet management.',
    highlights: ['Customer & driver apps', 'Live fleet control tower', 'Android build'],
    stack: ['React', 'Capacitor', 'Supabase', 'Android'],
    accent: 'from-sky-500 via-blue-600 to-indigo-600',
    monogram: 'MV'
  },
  {
    id: 'taxvault',
    name: 'TaxVault',
    category: 'Fintech mobile app',
    kind: 'mobile',
    summary:
      'Receipt scanning, automatic expense categorisation and multi-currency accounting, with accountant-ready tax exports aligned to NZ IRD.',
    highlights: ['Camera receipt scanning', 'Auto categorisation', 'IRD-ready exports'],
    stack: ['React', 'Capacitor', 'iOS', 'Android', 'Gemini AI'],
    accent: 'from-violet-500 via-purple-600 to-fuchsia-500',
    monogram: 'TV'
  },
  {
    id: 'crm-command-centre',
    name: 'CRM Network Command Centre',
    category: 'Enterprise KPI dashboard',
    kind: 'portal',
    summary:
      'Real-time command centre for an automotive & EV dealer network, with KPI charts, flow analytics and a documented REST API.',
    highlights: ['Live KPI dashboards', 'Sankey flow analytics', 'OpenAPI 3.0 REST API'],
    stack: ['React', 'Chart.js', 'Express', 'SQL'],
    accent: 'from-cyan-500 via-sky-600 to-slate-700',
    monogram: 'CRM'
  },
  {
    id: 'kb-portal',
    name: 'KB Portal',
    category: 'Self-hosted knowledge base',
    kind: 'portal',
    summary:
      'A help-centre platform with a rich-text admin editor, immutable version history and a themeable public portal for support articles.',
    highlights: ['WYSIWYG article editor', 'Version compare & restore', 'Liquid-themed portal'],
    stack: ['Node.js', '.NET', 'Docker', 'TipTap'],
    accent: 'from-teal-500 via-cyan-600 to-blue-700',
    monogram: 'KB'
  }
];

export const TECH_STACK = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  '.NET',
  'Supabase',
  'PostgreSQL',
  'Stripe',
  'Capacitor',
  'iOS & Android',
  'Three.js',
  'Tailwind CSS',
  'Docker',
  'Cloudflare',
  'Gemini AI'
];
