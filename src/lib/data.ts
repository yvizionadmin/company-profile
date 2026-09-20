/** Central site content. Swap copy here without touching components. */

export const site = {
  name: "Y-Vision",
  wordmark: "Y-VISION",
  tagline: "Smarter digital marketing. Better results.",
  email: "info@yvision.digital",
  phone: "+971 56 xxx 6560",
  location: "Dubai, United Arab Emirates",
};

export type Service = {
  num: string;
  title: string;
  short: string;
  blurb: string;
  why: string[];
  process: { step: string; text: string }[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    num: "01",
    title: "Website Development",
    short: "When you need a powerful online presence that drives results",
    blurb:
      "Fast, responsive, SEO-friendly websites engineered to turn visitors into customers. We design and build high-performance websites that load instantly, rank well, and convert.",
    why: [
      "Sub-second loads with a 95+ Lighthouse target",
      "SEO foundations baked in from day one",
      "Conversion-first layouts, not templates",
    ],
    process: [
      { step: "Discovery", text: "Goals, audience and success metrics." },
      { step: "Design", text: "Editorial, conversion-first interfaces." },
      { step: "Build", text: "Fast, accessible, maintainable code." },
      { step: "Launch", text: "QA, analytics and hand-over." },
    ],
    deliverables: ["Custom website", "CMS integration", "Analytics setup", "Performance budget"],
  },
  {
    num: "02",
    title: "Mobile App Development",
    short: "When you're looking to reach users on iOS and Android",
    blurb:
      "Cross-platform mobile apps shipped at a fraction of traditional timelines — end to end, from scope to store.",
    why: [
      "One codebase, both stores, native feel",
      "Rapid prototyping before you commit",
      "Backend, analytics and CI included",
    ],
    process: [
      { step: "Scope", text: "User flows, data model, priorities." },
      { step: "Prototype", text: "Clickable prototype in days." },
      { step: "Develop", text: "Weekly builds you can install." },
      { step: "Ship", text: "Store submission and support." },
    ],
    deliverables: ["iOS + Android app", "App store submission", "Admin dashboard", "Crash reporting"],
  },
  {
    num: "03",
    title: "SEO Services",
    short: "When you need to rank higher and drive organic traffic",
    blurb:
      "Technical, on-page and content SEO that compounds. We fix what's holding you back, target keywords that actually convert, and build authority month after month.",
    why: [
      "Technical fixes that unblock rankings",
      "Content mapped to buying intent",
      "Transparent monthly reporting",
    ],
    process: [
      { step: "Audit", text: "Technical and content baseline." },
      { step: "Strategy", text: "Keyword and content roadmap." },
      { step: "Execute", text: "Fixes, content, authority building." },
      { step: "Grow", text: "Measure, iterate, compound." },
    ],
    deliverables: ["Technical SEO audit", "Content strategy", "Link building", "Rank tracking"],
  },
  {
    num: "04",
    title: "Digital Marketing",
    short: "When you want to grow your online reach and visibility",
    blurb:
      "Full-funnel campaigns that find your audience where they already are — always measuring against the metrics that matter to your bottom line.",
    why: [
      "Channels chosen by data, not habit",
      "Creative that earns attention",
      "One dashboard, every channel",
    ],
    process: [
      { step: "Plan", text: "Audience, channels, budget split." },
      { step: "Create", text: "Assets built to perform." },
      { step: "Launch", text: "Coordinated multi-channel push." },
      { step: "Optimise", text: "Weekly iteration on results." },
    ],
    deliverables: ["Channel strategy", "Campaign creative", "Monthly reporting", "Growth roadmap"],
  },
  {
    num: "05",
    title: "DevOps Services",
    short: "When you need reliable, scalable infrastructure and CI/CD",
    blurb:
      "DevOps to ship faster and operate reliably. We design infrastructure-as-code, CI/CD pipelines, monitoring and runbooks so your product teams can deploy with confidence and recover quickly.",
    why: [
      "Repeatable infrastructure with IaC",
      "Automated CI/CD for safer releases",
      "Monitoring and runbooks to minimise downtime",
    ],
    process: [
      { step: "Plan", text: "Assess architecture, compliance and reliability goals." },
      { step: "Automate", text: "IaC, CI/CD pipelines, and environment provisioning." },
      { step: "Operate", text: "Monitoring, alerting, and runbooks for on-call." },
      { step: "Improve", text: "Cost optimisation and reliability engineering." },
    ],
    deliverables: ["Infrastructure as Code", "CI/CD pipelines", "Monitoring & alerting", "Runbooks & incident playbooks"],
  },
  {
    num: "06",
    title: "Email Marketing",
    short: "When you want to nurture leads and boost customer engagement",
    blurb:
      "Email is still the highest-ROI channel — when it's done right. We build automated journeys that nurture leads, recover carts, and turn one-time buyers into loyal customers, all wired into your CRM.",
    why: [
      "Automated journeys that sell while you sleep",
      "Segmentation for relevant messaging",
      "Deliverability and list health handled",
    ],
    process: [
      { step: "Plan", text: "Audience, journeys, tooling." },
      { step: "Create", text: "Templates and sequences." },
      { step: "Launch", text: "Automation live with testing." },
      { step: "Optimise", text: "Open, click, revenue iteration." },
    ],
    deliverables: ["Automation flows", "Campaign templates", "CRM integration", "Performance reports"],
  },
  {
    num: "07",
    title: "Branding & Strategy",
    short: "When you need a strong identity that sets you apart",
    blurb:
      "Before tactics, clarity. We define who you are, who you're for, and why you win — then translate that into an identity and a roadmap your whole team can rally behind.",
    why: [
      "Positioning grounded in research",
      "Identity systems, not just logos",
      "Strategy your team can execute",
    ],
    process: [
      { step: "Audit", text: "Market, audience, competitors." },
      { step: "Strategy", text: "Positioning and messaging." },
      { step: "Execute", text: "Identity and guidelines." },
      { step: "Grow", text: "Roll-out across touchpoints." },
    ],
    deliverables: ["Brand strategy", "Visual identity", "Brand guidelines", "Messaging framework"],
  },
  {
    num: "08",
    title: "UI/UX Design",
    short: "When your product needs intuitive and engaging experiences",
    blurb:
      "We design products people love to use. Research-led, accessible, and beautiful — interfaces that reduce friction, increase conversion, and feel effortless on every device.",
    why: [
      "Research-driven, user-tested design",
      "Design systems that scale with you",
      "Prototypes that de-risk the build",
    ],
    process: [
      { step: "Research", text: "Users, jobs to be done, flows." },
      { step: "Wireframe", text: "Structure before decoration." },
      { step: "Prototype", text: "Test with real users." },
      { step: "Design", text: "Polished, dev-ready systems." },
    ],
    deliverables: ["UX research", "Wireframes", "Design system", "Interactive prototype"],
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Projects delivered" },
  { value: 95, suffix: "+", label: "Avg. Lighthouse score" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Client satisfaction" },
  { value: 3, suffix: "yrs", label: "Driving growth" },
];

export const approach = [
  {
    num: "01",
    title: "Strategy first",
    text: "We start with your business goals, not a template. Every decision traces back to a number that matters.",
  },
  {
    num: "02",
    title: "Designed to convert",
    text: "Beautiful is table stakes. We engineer experiences that turn attention into action and visitors into customers.",
  },
  {
    num: "03",
    title: "Built to last",
    text: "Fast, accessible, maintainable code on modern frameworks — an investment that keeps performing for years.",
  },
  {
    num: "04",
    title: "Optimised forever",
    text: "Launch is the starting line. We test, measure, and refine so your results compound month over month.",
  },
];

export const values = [
  { num: "01", title: "Innovation", text: "We build with tomorrow's tools, today — so your business stays ahead, not catching up." },
  { num: "02", title: "Transparency", text: "Clear reporting, honest timelines, no jargon. You always know exactly where things stand." },
  { num: "03", title: "Results", text: "Vanity metrics are easy. We optimise for the numbers that actually move your business." },
  { num: "04", title: "Partnership", text: "We work as an extension of your team — invested in your outcomes, not just our deliverables." },
  { num: "05", title: "Continuous Improvement", text: "Launch is the start. We test, learn, and refine so performance compounds over time." },
];

export const timeline = [
  { year: "2023", title: "The journey begins", text: "Y-Vision is founded to help Middle East businesses grow online." },
  { year: "2024", title: "Web & mobile expansion", text: "We scale our build team and add cross-platform app development, end to end." },
  { year: "2025", title: "AI-powered solutions", text: "Automation and AI workflows enter every engagement." },
  { year: "2026", title: "Scaling across the region", text: "Now partnering with businesses region-wide to compound growth." },
];

export const works = [
  {
    num: "01",
    title: "HealthCure",
    sector: "Health & Wellness",
    year: "2026",
    tags: ["Website", "SEO", "Marketing"],
    art: "from-emerald-900 via-ink-2 to-ink",
  },
  {
    num: "02",
    title: "Kiwiana Immigration",
    sector: "Legal & Consulting",
    year: "2025",
    tags: ["Website", "Paid Ads"],
    art: "from-indigo-950 via-ink-2 to-ink",
  },
  {
    num: "03",
    title: "Atlas Interiors",
    sector: "Architecture",
    year: "2025",
    tags: ["Branding", "UI/UX"],
    art: "from-amber-950 via-ink-2 to-ink",
  },
  {
    num: "04",
    title: "Nimbus Fintech",
    sector: "Finance",
    year: "2024",
    tags: ["Mobile App", "Design System"],
    art: "from-cyan-950 via-ink-2 to-ink",
  },
  {
    num: "05",
    title: "Souq Fresh",
    sector: "E-commerce",
    year: "2024",
    tags: ["Website", "Email"],
    art: "from-rose-950 via-ink-2 to-ink",
  },
];

export const techStack = [
  "Next.js",
  "FlutterFlow",
  "Google Ads",
  "Meta Ads",
  "SEO",
  "HubSpot",
  "Tailwind CSS",
  "AI Automation",
];

export const disciplines = [
  "Branding",
  "UI/UX Design",
  "Website Development",
  "Mobile Apps",
  "SEO",
  "Paid Ads",
];

export const testimonial = {
  quote:
    "Y-Vision didn't just give us a website — they built the engine that runs our business",
  author: "Pawandeep Singh",
  role: "Director, Kiwiana Immigration",
};

export const nav = {
  pages: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Who we are", href: "/who-we-are" },
    { label: "Contact", href: "/contact" },
  ],
};

/** "Who we are" page content. */
export const whoWeAre = {
  experience: [
    { label: "E-commerce", value: 10, caption: "Years in e-commerce" },
    { label: "Catalogue", value: 10, caption: "Years in catalogue" },
    { label: "Design & Engineering", value: 15, caption: "Years in design & engineering" },
  ],
  expertise: [
    {
      icon: "box",
      label: "E-commerce",
      text: "Catalogue, customer journeys, and commerce systems.",
    },
    {
      icon: "pen",
      label: "Design",
      text: "Interfaces, systems, and experiences shaped for clarity.",
    },
    {
      icon: "code",
      label: "Engineering",
      text: "Scalable platforms, infrastructure, and production-ready technology.",
    },
  ],
  journey: [
    { icon: "bulb", label: "Idea" },
    { icon: "search", label: "Understand" },
    { icon: "pen", label: "Design" },
    { icon: "code", label: "Build" },
    { icon: "growth", label: "Scale" },
  ],
  ecosystem: ["Catalogue", "Storefront", "Marketplace", "OMS", "Customer", "Growth"],
  disciplines: ["Idea", "Experience", "E-commerce", "Scale"],
  technology: {
    eyebrow: "Technology behind e-commerce",
    headline: ["Built for", "Modern E-commerce."],
    line: "From storefront to marketplace, catalogue to operations, and AI to growth — we build the technology behind digital E-commerce.",
    layers: [
      { id: "experience", label: "Experience", tech: ["React", "Next.js", "React Native"] },
      {
        id: "commerce",
        label: "E-commerce",
        tech: ["E-commerce", "Marketplace", "PIM", "OMS", "Seller Platform"],
      },
      { id: "engineering", label: "Engineering", tech: ["Node.js", "APIs", "Data", "Integrations"] },
      { id: "cloud", label: "Cloud", tech: ["Cloud", "CI/CD", "DevOps", "Scalability"] },
      {
        id: "ai",
        label: "AI",
        tech: ["AI Search", "AI Content", "AI Automation", "AI Image Generation"],
      },
    ],
  },
} as const;
