// Semua isi portofolio ada di sini. Sumber: CV (ATS) Nyiayu Syafiah Riani.

export type SectionId = "about" | "projects" | "skills" | "experience" | "contact";

export const sections: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const profile = {
  name: "Nyiayu Syafiah Riani",
  shortName: "Nyiayu",
  role: "UI Engineer & Frontend Developer",
  tagline: "I turn visual design into fast, clean, scalable interfaces.",
  about:
    "Performance-driven UI Engineer with 6+ years of experience at major Indonesian media companies. I specialize in design system engineering, modern web architecture and performance optimization, building lightweight, SEO-friendly interfaces with Astro, Tailwind CSS and Vue.js, with a strong focus on Core Web Vitals.",
  location: "Jakarta, Indonesia",
  email: "nyiayusyaf@gmail.com",
  // File ada di public/cv/. Ganti file-nya kalau CV di-update.
  cvUrl: "/cv/Nyiayu-Syafiah-Riani-CV.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/nyiayusyaf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nyiayu" },
  ],
};

export type Project = {
  title: string; // judul pendek, tampil di papan (maks ~15 huruf)
  org: string; // dipakai buat ngelompokin di panel Projects
  desc: string;
  tags: string[];
  href?: string; // kalau kosong, link disembunyikan
  color: string; // warna sticky note
};

// 4 proyek pertama tampil sebagai sticky note di papan. Semua tampil di panel.
export const projects: Project[] = [
  {
    title: "CNN Indonesia",
    org: "detikcom",
    desc: "Frontend UI for CNN Indonesia's national news portal, turning designs into responsive, SEO-friendly pages for a high-traffic audience.",
    tags: ["News portal", "Responsive UI", "SEO"],
    href: "https://www.cnnindonesia.com/",
    color: "#ff2e88",
  },
  {
    title: "CNBC Indonesia",
    org: "detikcom",
    desc: "Frontend UI for CNBC Indonesia's business and economic news portal, built to stay fast and readable across devices.",
    tags: ["News portal", "Responsive UI", "SEO"],
    href: "https://www.cnbcindonesia.com/",
    color: "#ffb627",
  },
  {
    title: "CNN Awards",
    org: "detikcom",
    desc: "Event microsite for the CNN Indonesia Awards, presented as a responsive, visually rich showcase.",
    tags: ["Microsite", "Event", "Responsive UI"],
    href: "https://www.cnnindonesia.com/awards",
    color: "#5fd35a",
  },
  {
    title: "IndonesiaNow",
    org: "detikcom",
    desc: "English-language news site that brings Indonesian stories to an international audience, with lightweight interactivity.",
    tags: ["News portal", "Alpine.js", "Responsive UI"],
    href: "https://www.indonesianow.co/",
    color: "#ffb627",
  },
  {
    title: "Design System",
    org: "detikcom",
    desc: "A scalable UI component library built with Tailwind CSS that keeps the visual language consistent and speeds up engineering cycles across products.",
    tags: ["Tailwind CSS", "Component-Driven", "Design System"],
    color: "#ffb627",
  },
  {
    title: "Vue Migration",
    org: "PT MNC Pictures",
    desc: "Led the redesign and refactor that moved the platform from Laravel to Vue.js, including CMS modules for novels, comics, audio plays, casting and member circles.",
    tags: ["Vue.js", "Laravel", "CMS"],
    color: "#5fd35a",
  },
  {
    title: "Analytics Dash",
    org: "PT MNC Pictures",
    desc: "An internal analytics dashboard built from scratch in Laravel, shipping 9 data-driven features for performance monitoring.",
    tags: ["Laravel", "Dashboard", "Data"],
    color: "#ffb627",
  },
  {
    title: "Payments & Live",
    org: "PT MNC Pictures",
    desc: "Integrated secure third-party payment gateways, real-time live streaming for the mobile apps, and interactive mini-games to boost daily retention.",
    tags: ["API Integration", "Payment Gateway", "Live Streaming"],
    color: "#ff2e88",
  },
  {
    title: "This Portfolio",
    org: "Personal",
    desc: "The interactive office you're looking at: layered SVG scene with mouse parallax, camera zoom and accessible hotspots, built with React, TypeScript and GSAP.",
    tags: ["React", "TypeScript", "GSAP", "SVG"],
    href: "https://github.com/nyiayusyaf/portofolio-nyiayu",
    color: "#5fd35a",
  },
];

export const skills = [
  {
    group: "UI Architecture",
    items: [
      "Design System Engineering",
      "Component-Driven Development",
      "Performance Optimization",
      "Islands Architecture",
      "Responsive Web Design",
      "Core Web Vitals",
    ],
  },
  {
    group: "Languages & Frameworks",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Astro JS",
      "Vue.js",
      "React",
      "Tailwind CSS",
      "Alpine.js",
      "Laravel",
      "GSAP",
    ],
  },
  {
    group: "Integrations",
    items: ["REST API Integration", "Payment Gateways", "Live Streaming", "CMS Development"],
  },
  {
    group: "Tools & Methods",
    items: ["Git", "Vite", "Webpack", "Agile / Scrum", "Cross-functional Collaboration"],
  },
  { group: "Currently exploring", items: ["Next.js"] },
];

export const experience = [
  {
    period: "Mar 2023 – Present",
    role: "Frontend Designer (UI Engineer)",
    company: "detikcom",
    desc: "Ship UI for CNN Indonesia, CNBC Indonesia, IndonesiaNow and the CNN Indonesia Awards. Build and maintain a Tailwind CSS component library, deliver fast SEO-friendly pages with Astro's Islands Architecture, and use Alpine.js for snappy interactions without heavy framework overhead.",
  },
  {
    period: "Mar 2021 – Feb 2023",
    role: "Frontend Developer",
    company: "PT MNC Pictures",
    desc: "Led the Laravel-to-Vue.js migration, built CMS modules and an internal analytics dashboard with 9 features, and integrated payment gateways, live streaming for mobile apps and mini-games to boost daily retention.",
  },
  {
    period: "Aug 2020 – Feb 2021",
    role: "Frontend Developer Intern",
    company: "PT MNC Pictures",
    desc: "Built layout and UI components, supported responsive work for the mobile team, and helped debug and test releases. Promoted to full-time after 7 months.",
  },
  {
    period: "2015 – 2019",
    role: "B.E. Information Technology",
    company: "Universitas Gunadarma",
    desc: "Bachelor of Engineering in Information Technology.",
  },
];
