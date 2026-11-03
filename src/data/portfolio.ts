/* ============================================================================
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ----------------------------------------------------------------------------
 * Edit this file to update the site. No component changes required.
 *
 * TODO LIST (search for "TODO" to find each one):
 *   1. contact.github — add your real GitHub profile URL
 *   2. site.url       — set this to your live domain after deploying, and
 *                       update the matching tags in index.html, robots.txt
 *                       and sitemap.xml
 *   3. public/Jainam_Shah_Resume.pdf — replace with your latest resume PDF
 *
 * (public/og-image.png is already generated from public/og-image.svg — only
 *  re-export it if you change the artwork. See the README.)
 * ========================================================================== */

import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Network,
  Sparkles,
  Wrench,
} from 'lucide-react';
import type {
  ApiResponse,
  CaseStudy,
  Contact,
  Degree,
  Job,
  NavLink,
  SiteMeta,
  SkillGroup,
  Stat,
} from '@/types';

/* -------------------------------------------------------------------------- */
/*  SITE                                                                      */
/* -------------------------------------------------------------------------- */

export const site: SiteMeta = {
  name: 'Jainam Shah',
  shortName: 'JS',
  role: 'Backend Engineer',
  tagline: 'Backend Engineer · Node.js · Distributed Systems',
  pitch:
    'I build the systems that stay correct when traffic spikes — queue-backed APIs, idempotent webhook pipelines, and integrations that keep data in sync across six storefronts.',
  location: 'Bengaluru, India',
  availability: 'Open to backend / platform roles',
  openToWork: true,
  // TODO: replace with your live domain once deployed (used for SEO + JSON-LD).
  url: 'https://jainamshah.vercel.app',
  resumePath: '/Jainam_Shah_Resume.pdf',
  ogImage: '/og-image.png',
};

export const contact: Contact = {
  email: 'shahjainam776@gmail.com',
  phone: '+91 9016081898',
  phoneHref: '+919016081898',
  linkedin: 'https://linkedin.com/in/jainam-shah-98541a270',
  // TODO: add your GitHub profile URL here (e.g. https://github.com/your-handle).
  // While this is an empty string, the GitHub icon/link is hidden everywhere.
  github: '',
};

export const navLinks: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/* -------------------------------------------------------------------------- */
/*  HERO — the animated terminal / API response                               */
/* -------------------------------------------------------------------------- */

export const heroCommand = 'curl -s https://api.jainamshah.dev/v1/jainam';

export const apiResponse: ApiResponse = {
  role: 'Backend Engineer',
  experience: '2.5 years',
  stack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'MySQL', 'AWS'],
  location: 'Bengaluru, India',
  open_to_work: true,
};

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  paragraphs: [
    'I am a backend engineer with two and a half years spent close to production — the part of the job where a webhook arrives twice, a flash sale opens at midnight, and an integration between two systems that were never meant to talk has to not lose an order.',
    'Most of my work is Node.js and Express over MongoDB and MySQL, with Redis where correctness under concurrency matters. I like problems that have a measurable right answer: zero oversells, idempotent writes, response times that drop and stay down.',
    'I own what I ship. That means writing the business logic, deploying it to AWS, reading the logs when something looks off in production, and leaving behind code the next person can actually follow.',
  ],
  stats: [
    {
      value: '2.5+',
      label: 'years experience',
      detail: 'Backend engineering, shipped to production',
    },
    {
      value: '250+',
      label: 'req/s sustained',
      detail: 'Queue-based reservation system under load',
    },
    {
      value: '6',
      label: 'storefronts integrated',
      detail: 'Multi-tenant Shopify webhook pipeline',
    },
    {
      value: '0',
      label: 'oversells under load',
      detail: 'Verified across 1,000-user load tests',
    },
  ] satisfies Stat[],
};

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                */
/* -------------------------------------------------------------------------- */

export const jobs: Job[] = [
  {
    id: 'autumn',
    company: 'Autumn',
    role: 'SDE-1',
    start: 'Apr 2026',
    end: 'Present',
    location: 'Bengaluru, India',
    current: true,
    summary:
      'Own backend systems for commerce operations: webhook ingestion, inventory correctness, and ERP/WMS integration.',
    bullets: [
      'Built a multi-tenant Shopify webhook pipeline (Node.js/Express/MongoDB) handling orders, inventory, customers, and abandoned-cart/checkout recovery across 6 brand storefronts, with per-store HMAC signature verification, idempotent upserts, and rotating daily audit logs.',
      'Built a queue-based flash-sale reservation system in Node.js/Express handling 250+ req/s with atomic inventory allocation via Redis, guaranteeing zero overselling across 1,000-user load tests.',
      'Built automated post-purchase engagement end-to-end: server-rendered invoice PDFs (Puppeteer) to S3 presigned URLs to WhatsApp Business templates (Interakt), with points confirmation gated on provider confirmation.',
      'Architected an event-driven integration middleware in Node.js/Express connecting SAP Business One and Increff WMS, orchestrating the full order-to-cash chain (Sales Order, Delivery Note, AR Invoice, Credit Note) across 6 webhook endpoints.',
    ],
    tech: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redis',
      'AWS S3',
      'Shopify Webhooks',
      'Puppeteer',
      'SAP B1',
    ],
  },
  {
    id: 'iroid',
    company: 'Iroid Solutions',
    role: 'Back-end Developer',
    start: 'Nov 2024',
    end: 'Apr 2026',
    location: 'Gujarat, India',
    summary:
      'Built and maintained REST APIs and real-time features across client web applications.',
    bullets: [
      'Developed RESTful APIs and backend services using Node.js and Express.js for scalable, maintainable web applications.',
      'Worked with both SQL (MySQL) and NoSQL (MongoDB) databases for efficient data storage and querying.',
      'Implemented real-time features using WebSocket (Socket.IO) for live notifications, score updates, and chat.',
      'Collaborated closely with front-end developers for smooth frontend-backend integration.',
      'Used GitHub for version control and followed Agile methodologies for sprint planning and task management.',
    ],
    tech: [
      'Node.js',
      'Express.js',
      'MySQL',
      'MongoDB',
      'Socket.IO',
      'REST APIs',
      'Git',
    ],
  },
  {
    id: 'narola',
    company: 'Narola Infotech',
    role: 'Back-end Developer (Intern)',
    start: 'Jan 2024',
    end: 'Jun 2024',
    location: 'Gujarat, India',
    summary:
      'Backend features and performance work on an eCommerce shopping application.',
    bullets: [
      'Developed and maintained backend features for an eCommerce shopping app using Node.js and Express.js.',
      'Optimized existing APIs to reduce response time.',
      'Developed APIs for data handling and communication processes.',
      'Optimized database queries to improve application performance.',
      'Collaborated closely with front-end developers on integration.',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
];

/* -------------------------------------------------------------------------- */
/*  FEATURED WORK / CASE STUDIES                                              */
/* -------------------------------------------------------------------------- */

export const caseStudies: CaseStudy[] = [
  {
    id: 'webhook-pipeline',
    index: '01',
    title: 'Multi-tenant Shopify Webhook Pipeline',
    endpoint: 'POST /webhooks/:store/:topic',
    problem:
      'Six brand storefronts needed to push orders, inventory, customers and abandoned checkouts into one backend. Shopify retries aggressively, so the same event arrives more than once, and every store signs its payloads with a different secret.',
    built:
      'A multi-tenant ingestion service in Node.js/Express on MongoDB. Each request is verified against the per-store HMAC signature before it is trusted, then written through idempotent upserts, so a replayed delivery is a no-op instead of a duplicate order. Rotating daily audit logs keep a replayable record of every delivery for debugging.',
    impact: [
      { value: '6', label: 'storefronts, one pipeline' },
      { value: '4', label: 'event domains ingested' },
      { value: 'HMAC', label: 'per-store verification' },
    ],
    tech: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Shopify Webhooks',
      'HMAC',
      'Multi-tenancy',
    ],
    flow: [
      { label: 'Shopify', kind: 'source' },
      { label: 'Webhook', kind: 'process' },
      { label: 'HMAC verify', kind: 'process' },
      { label: 'Queue', kind: 'process' },
      { label: 'MongoDB', kind: 'store' },
    ],
  },
  {
    id: 'flash-sale',
    index: '02',
    title: 'Flash-Sale Reservation System',
    endpoint: 'POST /reservations',
    problem:
      'Flash sales concentrate thousands of buyers onto a handful of SKUs in the same few seconds. Read-then-write inventory checks race against each other under that load, and the result is oversold stock you have to refund and apologise for.',
    built:
      'A queue-based reservation service in Node.js/Express. Requests are accepted onto a queue and inventory is allocated atomically in Redis, so the decrement and the reservation happen as one indivisible step. Concurrent buyers are serialised at the only place it actually matters, and the system was load tested at 1,000 concurrent users.',
    impact: [
      { value: '250+', label: 'req/s sustained' },
      { value: '0', label: 'oversells recorded' },
      { value: '1,000', label: 'concurrent users tested' },
    ],
    tech: [
      'Node.js',
      'Express.js',
      'Redis',
      'Queues',
      'Atomic allocation',
      'Load testing',
    ],
    flow: [
      { label: 'Buyers', kind: 'source' },
      { label: 'API', kind: 'process' },
      { label: 'Queue', kind: 'process' },
      { label: 'Redis (atomic)', kind: 'store' },
      { label: 'Reservation', kind: 'output' },
    ],
  },
  {
    id: 'post-purchase',
    index: '03',
    title: 'Automated Post-Purchase Engagement',
    endpoint: 'POST /orders/:id/post-purchase',
    problem:
      'After checkout, customers needed an invoice and a confirmation on the channel they actually read, which is WhatsApp. Doing that by hand does not scale, and awarding loyalty points before the message is confirmed means paying out for messages that never arrived.',
    built:
      'An end-to-end automated flow: invoices are server-rendered to PDF with Puppeteer, uploaded to S3 and shared as presigned URLs, then delivered through WhatsApp Business templates via Interakt. Points confirmation is gated on the provider confirming delivery, so the ledger only moves once the customer has actually been reached.',
    impact: [
      { value: 'PDF', label: 'server-rendered invoices' },
      { value: 'WhatsApp', label: 'delivery channel' },
      { value: 'Gated', label: 'points on provider confirm' },
    ],
    tech: [
      'Node.js',
      'Puppeteer',
      'AWS S3',
      'Presigned URLs',
      'WhatsApp Business',
      'Interakt',
    ],
    flow: [
      { label: 'Order', kind: 'source' },
      { label: 'Puppeteer PDF', kind: 'process' },
      { label: 'S3 presigned', kind: 'store' },
      { label: 'WhatsApp', kind: 'output' },
      { label: 'Points', kind: 'output' },
    ],
  },
  {
    id: 'sap-increff',
    index: '04',
    title: 'SAP Business One / Increff WMS Middleware',
    endpoint: 'POST /integration/:event',
    problem:
      'The ERP and the warehouse system had no shared language. Orders had to travel the full order-to-cash chain across both, and a document that silently fails halfway through leaves stock and accounting disagreeing about reality.',
    built:
      'An event-driven integration middleware in Node.js/Express sitting between SAP Business One and Increff WMS. Six webhook endpoints orchestrate the document chain, from Sales Order through Delivery Note and AR Invoice to Credit Note, translating payloads in both directions and keeping the two systems converging on the same state.',
    impact: [
      { value: '6', label: 'webhook endpoints' },
      { value: '4', label: 'document types chained' },
      { value: '2-way', label: 'ERP and WMS sync' },
    ],
    tech: [
      'Node.js',
      'Express.js',
      'SAP Business One',
      'Increff WMS',
      'Event-driven',
      'Webhooks',
    ],
    flow: [
      { label: 'SAP B1', kind: 'source' },
      { label: 'Middleware', kind: 'process' },
      { label: 'Order-to-cash', kind: 'process' },
      { label: 'Increff WMS', kind: 'output' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                    */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: Code2,
    items: ['JavaScript', 'SQL'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Boxes,
    items: ['Node.js', 'Express.js', 'REST APIs', 'OAuth 2.0', 'JWT'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    icon: Network,
    items: ['Webhooks', 'Event-driven systems', 'Queues'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    items: ['MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    items: ['AWS EC2', 'AWS S3', 'AWS IAM', 'Nginx', 'PM2', 'GitHub Actions'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: Sparkles,
    items: ['OpenAI APIs'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    items: ['Git', 'GitHub', 'Postman', 'OpenAPI', 'VS Code'],
  },
];

/* -------------------------------------------------------------------------- */
/*  EDUCATION                                                                 */
/* -------------------------------------------------------------------------- */

export const education: Degree[] = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    institution: 'Veer Narmad South Gujarat University',
    start: 'Sep 2022',
    end: 'Jul 2024',
  },
  {
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    institution: 'C.B. Patel Computer College',
    start: 'Jul 2019',
    end: 'Jun 2022',
  },
];

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

export const seo = {
  title: 'Jainam Shah — Backend Engineer (Node.js, Distributed Systems)',
  description:
    'Backend engineer with 2.5+ years building scalable Node.js APIs, queue-based systems handling 250+ req/s, multi-tenant webhook pipelines and ERP integrations. Based in Bengaluru, India.',
};
