import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Receipt,
  MessageSquareText,
  Smartphone,
  Hospital,
  Hotel,
  Wallet,
  Users,
  Dumbbell,
  TrendingUp,
  School,
  GraduationCap,
  PenTool,
  IdCard,
  ShieldCheck,
} from "lucide-react";

export const brand = {
  name: "सृजEX",
  latin: "Srujex",
  full: "सृजEX",
  tagline: "We design, build and grow digital products.",
  email: "hello@srujex.com",
  phone: "+91 98765 43210",
  address: "Tech Park, Bhubaneswar, Odisha, India",
};

export type ServiceCategory = "Marketing" | "Design" | "Development" | "Software";

export type Service = {
  slug: string;
  title: string;
  short: string;
  category: ServiceCategory;
  icon: LucideIcon;
  accent: string; // tailwind gradient stops
  intro: string;
  features: { title: string; text: string }[];
  deliverables: string[];
  stats: { value: number; suffix: string; label: string }[];
  faqs: { q: string; a: string }[];
};

const commonFaq = (name: string) => [
  {
    q: `How long does a typical ${name} engagement take?`,
    a: "Most projects go from kickoff to launch in 3 to 8 weeks. We share a dated roadmap after discovery so you always know what ships next.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every project includes 60 days of free support, and you can move to a monthly care plan with monitoring, updates and priority fixes.",
  },
  {
    q: "Can you work with our existing tools and data?",
    a: "Absolutely. We audit what you already have, migrate what is worth keeping and integrate with the systems your team relies on.",
  },
];

export const services: Service[] = [
  {
    slug: "web-design",
    title: "Website Design & Development",
    short: "Conversion-first websites that load fast, look sharp and turn visitors into leads.",
    category: "Design",
    icon: Monitor,
    accent: "from-violet-500 to-fuchsia-500",
    intro:
      "Your website is your hardest working salesperson. We craft responsive, accessible and lightning-fast sites with motion, clarity and a clear path to action on every screen.",
    features: [
      { title: "UX research & wireframes", text: "We map user journeys before pixels so every page has a job to do." },
      { title: "Custom visual design", text: "A distinctive look aligned to your brand, not a recycled template." },
      { title: "Headless & CMS builds", text: "Next.js, WordPress or Webflow with editing your team will actually enjoy." },
      { title: "Core Web Vitals tuned", text: "Optimised images, code splitting and caching for top Lighthouse scores." },
    ],
    deliverables: ["Sitemap & wireframes", "Design system", "Responsive build", "CMS training", "Analytics setup"],
    stats: [
      { value: 240, suffix: "+", label: "Sites launched" },
      { value: 98, suffix: "", label: "Avg. Lighthouse" },
      { value: 2.4, suffix: "x", label: "Lead uplift" },
    ],
    faqs: commonFaq("website"),
  },
  {
    slug: "digital-marketing",
    title: "SEO & Digital Marketing",
    short: "Data-led SEO, social and paid campaigns that compound into predictable growth.",
    category: "Marketing",
    icon: TrendingUp,
    accent: "from-lime-400 to-emerald-500",
    intro:
      "Traffic is only useful when it converts. We combine technical SEO, content, social media and performance ads into one growth engine measured against revenue, not vanity metrics.",
    features: [
      { title: "Technical & local SEO", text: "Site health, schema, Google Business Profile and local citations." },
      { title: "Content that ranks", text: "Topic clusters and landing pages written for people and search engines." },
      { title: "Social media (SMO)", text: "Platform-native creative and community management that builds trust." },
      { title: "Performance ads", text: "Google, Meta and LinkedIn campaigns optimised to cost per acquisition." },
    ],
    deliverables: ["SEO audit", "Keyword roadmap", "Monthly content", "Ad campaigns", "Live dashboard"],
    stats: [
      { value: 312, suffix: "%", label: "Avg. organic growth" },
      { value: 4.8, suffix: "x", label: "Return on ad spend" },
      { value: 1200, suffix: "+", label: "Page-one keywords" },
    ],
    faqs: commonFaq("marketing"),
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    short: "Native-feel Android and iOS apps built with Flutter and React Native.",
    category: "Development",
    icon: Smartphone,
    accent: "from-sky-400 to-indigo-500",
    intro:
      "From MVP to scale, we build mobile apps that feel effortless. One codebase, two stores, and an architecture ready for the features you have not thought of yet.",
    features: [
      { title: "Product discovery", text: "Workshops to define the smallest app that proves the biggest idea." },
      { title: "Cross-platform builds", text: "Flutter or React Native with native modules where performance matters." },
      { title: "Backend & APIs", text: "Secure auth, payments, push notifications and real-time sync." },
      { title: "Store launch", text: "App Store and Play Store submission, ASO and release management." },
    ],
    deliverables: ["Clickable prototype", "iOS & Android apps", "Admin panel", "API docs", "Store listing"],
    stats: [
      { value: 85, suffix: "+", label: "Apps shipped" },
      { value: 4.7, suffix: "★", label: "Avg. store rating" },
      { value: 2, suffix: "M+", label: "Downloads" },
    ],
    faqs: commonFaq("app"),
  },
  {
    slug: "bulk-sms",
    title: "Bulk SMS & WhatsApp",
    short: "Transactional and promotional messaging with DLT compliance and real-time reports.",
    category: "Marketing",
    icon: MessageSquareText,
    accent: "from-amber-400 to-orange-500",
    intro:
      "Reach customers where they read. Our messaging platform delivers OTPs, alerts and campaigns over SMS and WhatsApp with high delivery rates and full compliance.",
    features: [
      { title: "DLT-ready templates", text: "We handle sender IDs and template registration end to end." },
      { title: "API & panel", text: "Send from our web panel or plug into your app via REST API." },
      { title: "Smart scheduling", text: "Personalised, time-zone aware campaigns with automatic retries." },
      { title: "Delivery analytics", text: "Live delivery, click and reply tracking per campaign." },
    ],
    deliverables: ["Account setup", "DLT registration", "API keys", "Campaign templates", "Reports"],
    stats: [
      { value: 99, suffix: "%", label: "Delivery rate" },
      { value: 50, suffix: "M+", label: "Messages / month" },
      { value: 3, suffix: "s", label: "Avg. OTP latency" },
    ],
    faqs: commonFaq("messaging"),
  },
  {
    slug: "billing-software",
    title: "GST Billing & Inventory",
    short: "Fast invoicing, stock control and GST-ready reports for retail and wholesale.",
    category: "Software",
    icon: Receipt,
    accent: "from-teal-400 to-cyan-500",
    intro:
      "Bill in seconds, know your stock in real time and file GST without stress. Our billing suite works on desktop, web and mobile with offline support.",
    features: [
      { title: "One-click invoicing", text: "Barcode scanning, thermal printing and e-invoice generation." },
      { title: "Live inventory", text: "Multi-godown stock, batch and expiry tracking with low-stock alerts." },
      { title: "GST returns", text: "GSTR-1 and 3B ready exports with reconciliation." },
      { title: "Multi-branch", text: "Central dashboard for every outlet with role-based access." },
    ],
    deliverables: ["Installation", "Data migration", "Staff training", "Custom reports", "Cloud backup"],
    stats: [
      { value: 1800, suffix: "+", label: "Businesses billing" },
      { value: 70, suffix: "%", label: "Faster checkout" },
      { value: 24, suffix: "/7", label: "Support" },
    ],
    faqs: commonFaq("billing"),
  },
  {
    slug: "crm-software",
    title: "CRM Software",
    short: "Pipeline, follow-ups and customer history in one place your sales team will use.",
    category: "Software",
    icon: Users,
    accent: "from-pink-500 to-rose-500",
    intro:
      "Stop losing leads in spreadsheets. Our CRM captures enquiries from every channel, automates follow-ups and shows you exactly where revenue is coming from.",
    features: [
      { title: "Omnichannel capture", text: "Leads from web forms, ads, WhatsApp and calls flow in automatically." },
      { title: "Visual pipeline", text: "Drag-and-drop deals with stage probabilities and forecasts." },
      { title: "Automations", text: "Reminders, assignments and drip messages without manual work." },
      { title: "Insightful reports", text: "Team performance, source ROI and conversion funnels." },
    ],
    deliverables: ["Pipeline setup", "Integrations", "Automation rules", "Mobile app", "Training"],
    stats: [
      { value: 35, suffix: "%", label: "More deals closed" },
      { value: 6, suffix: "h", label: "Saved per rep / week" },
      { value: 400, suffix: "+", label: "Teams onboarded" },
    ],
    faqs: commonFaq("CRM"),
  },
  {
    slug: "payroll-software",
    title: "Payroll & HRMS",
    short: "Attendance, payroll and compliance automated, from biometric to bank transfer.",
    category: "Software",
    icon: Wallet,
    accent: "from-emerald-400 to-teal-500",
    intro:
      "Run payroll in minutes, not days. Attendance, leave, PF, ESI and TDS are calculated for you, with payslips delivered straight to employees' phones.",
    features: [
      { title: "Attendance sync", text: "Biometric, geo-fenced mobile and shift-based tracking." },
      { title: "Statutory compliance", text: "PF, ESI, PT and TDS calculated and reported automatically." },
      { title: "Employee self-service", text: "Leave requests, payslips and documents on mobile." },
      { title: "Bank integration", text: "Salary files ready for bulk transfer in one click." },
    ],
    deliverables: ["Policy setup", "Device integration", "Employee app", "Compliance reports", "Training"],
    stats: [
      { value: 90, suffix: "%", label: "Less payroll time" },
      { value: 25, suffix: "k+", label: "Employees paid" },
      { value: 0, suffix: "", label: "Missed deadlines" },
    ],
    faqs: commonFaq("payroll"),
  },
  {
    slug: "hospital-management",
    title: "Hospital Management Software",
    short: "OPD, IPD, pharmacy, lab and billing connected in one secure platform.",
    category: "Software",
    icon: Hospital,
    accent: "from-cyan-400 to-blue-500",
    intro:
      "Give clinicians more time for patients. Our HMS digitises every department from front desk to discharge with secure records and real-time bed management.",
    features: [
      { title: "Patient journey", text: "Registration, appointments, EMR and discharge summaries." },
      { title: "Pharmacy & lab", text: "Stock, prescriptions and lab results linked to each patient." },
      { title: "Insurance & billing", text: "TPA workflows, packages and itemised bills." },
      { title: "Secure by design", text: "Role-based access, audit trails and encrypted backups." },
    ],
    deliverables: ["Department mapping", "Implementation", "Staff training", "Data migration", "Support SLA"],
    stats: [
      { value: 60, suffix: "+", label: "Hospitals & clinics" },
      { value: 40, suffix: "%", label: "Shorter wait times" },
      { value: 99.9, suffix: "%", label: "Uptime" },
    ],
    faqs: commonFaq("HMS"),
  },
  {
    slug: "hotel-management",
    title: "Hotel Management Software",
    short: "Reservations, front desk, housekeeping and POS for modern hospitality.",
    category: "Software",
    icon: Hotel,
    accent: "from-orange-400 to-red-500",
    intro:
      "Delight guests and fill more rooms. Our property management system unifies bookings, channel manager, restaurant POS and housekeeping in a single dashboard.",
    features: [
      { title: "Booking engine", text: "Commission-free direct bookings from your own website." },
      { title: "Channel manager", text: "Rates and inventory synced across OTAs in real time." },
      { title: "Front desk", text: "Fast check-in, folios, room moves and night audit." },
      { title: "Restaurant POS", text: "KOTs, table management and room-posting." },
    ],
    deliverables: ["Property setup", "OTA connections", "POS hardware", "Training", "Reports"],
    stats: [
      { value: 120, suffix: "+", label: "Properties" },
      { value: 28, suffix: "%", label: "More direct bookings" },
      { value: 15, suffix: "min", label: "Night audit" },
    ],
    faqs: commonFaq("hotel software"),
  },
  {
    slug: "school-management",
    title: "School Management Software",
    short: "Admissions, fees, attendance and parent communication for K-12.",
    category: "Software",
    icon: School,
    accent: "from-yellow-400 to-amber-500",
    intro:
      "Bring schools, teachers and parents onto one page. Automate fee collection, attendance and report cards while keeping parents informed in real time.",
    features: [
      { title: "Online admissions", text: "Forms, document upload and seat allotment." },
      { title: "Fee management", text: "Online payments, reminders and receipts." },
      { title: "Academics", text: "Timetables, homework, exams and report cards." },
      { title: "Parent app", text: "Attendance alerts, notices and progress in one app." },
    ],
    deliverables: ["Setup", "Data import", "Parent app", "Payment gateway", "Training"],
    stats: [
      { value: 150, suffix: "+", label: "Schools" },
      { value: 95, suffix: "%", label: "On-time fees" },
      { value: 80, suffix: "k+", label: "Parents connected" },
    ],
    faqs: commonFaq("school software"),
  },
  {
    slug: "college-management",
    title: "College & University ERP",
    short: "Academic, examination and accreditation workflows for higher education.",
    category: "Software",
    icon: GraduationCap,
    accent: "from-indigo-400 to-violet-500",
    intro:
      "A campus ERP built for the complexity of higher education, from choice-based credit systems to NAAC documentation and placement tracking.",
    features: [
      { title: "CBCS & exams", text: "Credits, internal assessments and result processing." },
      { title: "Accreditation ready", text: "NAAC and NBA data captured as you go." },
      { title: "Student lifecycle", text: "Admission to alumni with digital records." },
      { title: "Placement cell", text: "Company drives, applications and offer tracking." },
    ],
    deliverables: ["Module setup", "Data migration", "Student portal", "Faculty training", "Support"],
    stats: [
      { value: 45, suffix: "+", label: "Institutions" },
      { value: 70, suffix: "%", label: "Less paperwork" },
      { value: 200, suffix: "k+", label: "Student records" },
    ],
    faqs: commonFaq("ERP"),
  },
  {
    slug: "gym-management",
    title: "Gym & Fitness Software",
    short: "Memberships, renewals, trainers and access control for fitness studios.",
    category: "Software",
    icon: Dumbbell,
    accent: "from-red-500 to-pink-500",
    intro:
      "Keep members coming back. Automate renewals, track workouts and manage trainers with a branded member app and biometric access.",
    features: [
      { title: "Memberships", text: "Plans, freezes, upgrades and auto-renewal reminders." },
      { title: "Access control", text: "Biometric and QR entry tied to active plans." },
      { title: "Trainer tools", text: "Diet and workout plans with progress tracking." },
      { title: "Member app", text: "Class bookings, payments and progress in your brand." },
    ],
    deliverables: ["Setup", "Device integration", "Member app", "Payment links", "Training"],
    stats: [
      { value: 30, suffix: "%", label: "Higher retention" },
      { value: 90, suffix: "+", label: "Studios" },
      { value: 0, suffix: "", label: "Missed renewals" },
    ],
    faqs: commonFaq("gym software"),
  },
  {
    slug: "logo-branding",
    title: "Logo & Brand Identity",
    short: "Memorable logos and brand systems that make you instantly recognisable.",
    category: "Design",
    icon: PenTool,
    accent: "from-fuchsia-500 to-purple-600",
    intro:
      "A brand is a promise you keep everywhere. We build identities with strategy behind them: logo, colour, type, voice and a guide your whole team can follow.",
    features: [
      { title: "Brand strategy", text: "Positioning, audience and personality workshops." },
      { title: "Logo design", text: "Multiple concepts refined into one timeless mark." },
      { title: "Visual system", text: "Palette, typography, iconography and imagery style." },
      { title: "Brand guidelines", text: "A clear rulebook with ready-to-use templates." },
    ],
    deliverables: ["Logo suite", "Colour & type", "Stationery", "Social kit", "Brand book"],
    stats: [
      { value: 500, suffix: "+", label: "Brands crafted" },
      { value: 3, suffix: "", label: "Concepts per project" },
      { value: 100, suffix: "%", label: "Ownership" },
    ],
    faqs: commonFaq("branding"),
  },
  {
    slug: "digital-business-card",
    title: "Digital Business Card",
    short: "Shareable NFC and QR cards that update instantly and capture leads.",
    category: "Design",
    icon: IdCard,
    accent: "from-sky-400 to-cyan-400",
    intro:
      "Never run out of cards again. Share your details, portfolio, payment links and location with a tap or a scan, and see who viewed them.",
    features: [
      { title: "Tap or scan", text: "NFC card plus QR code that works on every phone." },
      { title: "Always current", text: "Edit details anytime without reprinting." },
      { title: "Lead capture", text: "Visitors can share their contact back with one tap." },
      { title: "Team management", text: "Consistent branded cards for your whole company." },
    ],
    deliverables: ["Card design", "NFC card", "Profile page", "Analytics", "Team console"],
    stats: [
      { value: 10, suffix: "k+", label: "Cards shared" },
      { value: 3, suffix: "x", label: "More saved contacts" },
      { value: 1, suffix: " tap", label: "To connect" },
    ],
    faqs: commonFaq("digital card"),
  },
  {
    slug: "hardware-security",
    title: "IT Hardware & Security",
    short: "CCTV, networking, firewalls and AMC support that keeps your business running.",
    category: "Development",
    icon: ShieldCheck,
    accent: "from-slate-400 to-zinc-500",
    intro:
      "Reliable infrastructure is invisible until it fails. We design, install and maintain networks, surveillance and endpoint security so you can focus on work.",
    features: [
      { title: "Network setup", text: "Structured cabling, Wi-Fi and VPN for offices of any size." },
      { title: "Surveillance", text: "IP CCTV with remote viewing and cloud recording." },
      { title: "Cybersecurity", text: "Firewalls, endpoint protection and backup policies." },
      { title: "AMC support", text: "Preventive maintenance with guaranteed response times." },
    ],
    deliverables: ["Site survey", "Installation", "Configuration", "Documentation", "AMC"],
    stats: [
      { value: 2, suffix: "h", label: "Response SLA" },
      { value: 350, suffix: "+", label: "Sites secured" },
      { value: 99.9, suffix: "%", label: "Network uptime" },
    ],
    faqs: commonFaq("IT infrastructure"),
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    text: "We dig into your goals, users and competitors to find the sharpest opportunity and define what success looks like.",
    points: ["Stakeholder workshop", "Market & competitor audit", "KPI definition"],
  },
  {
    step: "02",
    title: "Design",
    text: "Wireframes become a visual language that fits your brand, validated with clickable prototypes before a line of code.",
    points: ["User flows", "UI design system", "Interactive prototype"],
  },
  {
    step: "03",
    title: "Build & Test",
    text: "Agile sprints with weekly demos. Automated tests, performance budgets and security reviews are baked in.",
    points: ["Weekly demos", "QA automation", "Performance budget"],
  },
  {
    step: "04",
    title: "Launch & Grow",
    text: "We ship, measure and iterate. Monitoring, SEO and campaigns keep the momentum going long after go-live.",
    points: ["Zero-downtime launch", "Analytics & SEO", "Ongoing care plan"],
  },
];

export const stats = [
  { value: 12, suffix: "+", label: "Years building" },
  { value: 950, suffix: "+", label: "Projects delivered" },
  { value: 40, suffix: "+", label: "Specialists" },
  { value: 97, suffix: "%", label: "Client retention" },
];

export const testimonials = [
  {
    quote:
      "सृजEX rebuilt our website and ran our SEO. Organic enquiries tripled within six months and the site finally feels like us.",
    name: "Ananya Mishra",
    role: "Founder, Bloom Organics",
  },
  {
    quote:
      "The hospital software went live across three branches without a single day of downtime. Our front desk queue is half what it was.",
    name: "Dr. Rakesh Patnaik",
    role: "Director, CarePoint Hospitals",
  },
  {
    quote:
      "Their team thinks like product owners, not vendors. The app shipped on time and our ratings jumped to 4.8 stars.",
    name: "Karan Mehta",
    role: "CTO, Swiftcart",
  },
  {
    quote:
      "From GST billing to WhatsApp campaigns, one partner handles it all. Support replies in minutes, not days.",
    name: "Priya Sahoo",
    role: "Owner, Urban Threads",
  },
];

export const clients = [
  "Bloom Organics",
  "CarePoint",
  "Swiftcart",
  "Urban Threads",
  "Nimbus Hotels",
  "EduSphere",
  "IronCore Gyms",
  "Kalinga Foods",
  "Vertex Realty",
  "Pulse Labs",
];

export const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Flutter",
  "React Native",
  "Laravel",
  "PostgreSQL",
  "AWS",
  "Figma",
  "Google Ads",
  "Meta Ads",
  "GA4",
  "Shopify",
];

export const projects = [
  {
    title: "Bloom Organics",
    category: "Website + SEO",
    result: "+312% organic traffic",
    gradient: "from-lime-300 via-emerald-400 to-teal-600",
    tags: ["Next.js", "Shopify", "SEO"],
  },
  {
    title: "CarePoint HMS",
    category: "Hospital Software",
    result: "40% shorter wait times",
    gradient: "from-sky-300 via-blue-500 to-indigo-700",
    tags: ["Laravel", "Vue", "AWS"],
  },
  {
    title: "Swiftcart",
    category: "Mobile App",
    result: "4.8★ across 200k installs",
    gradient: "from-fuchsia-400 via-violet-500 to-indigo-700",
    tags: ["Flutter", "Firebase"],
  },
  {
    title: "Nimbus Hotels",
    category: "Hotel Software + Ads",
    result: "+28% direct bookings",
    gradient: "from-amber-300 via-orange-500 to-rose-600",
    tags: ["PMS", "Google Ads"],
  },
  {
    title: "EduSphere",
    category: "School ERP",
    result: "95% on-time fee collection",
    gradient: "from-yellow-300 via-amber-400 to-orange-600",
    tags: ["React", "Node.js"],
  },
  {
    title: "IronCore Gyms",
    category: "Brand + Member App",
    result: "30% higher retention",
    gradient: "from-rose-400 via-red-500 to-zinc-800",
    tags: ["Branding", "React Native"],
  },
];

export const whyUs = [
  {
    title: "Senior, specialised team",
    text: "Designers, engineers and marketers who have shipped hundreds of products work directly on your account.",
  },
  {
    title: "Transparent pricing",
    text: "Fixed-scope quotes or monthly retainers. No surprises, no hidden hours, just clear value.",
  },
  {
    title: "Built to perform",
    text: "Every build is measured on speed, accessibility and conversions, with a live dashboard you can check anytime.",
  },
  {
    title: "Partners after launch",
    text: "We stick around. Care plans, growth sprints and a support line that answers fast.",
  },
];
