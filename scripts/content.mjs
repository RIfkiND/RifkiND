// Portfolio content for Rifki Nauva Dzaki — Backend Developer & Software Engineer.
// Edit this file, then run `npm run build`.

export const profile = {
  name: 'Rifki Nauva Dzaki',
  fullName: 'Rifki Nauva Dzaki',
  role: 'Backend Developer & Software Engineer',
  tagline: [
    'Architecting high-throughput backend services,',
    'reliable APIs, and automated cloud infrastructure.'
  ],
  location: 'Bandung, Indonesia',
  timezone: 'UTC+7',
  status: 'Open to engineering roles',
  email: 'rifkinauvaldzaki08@gmail.com',
  meaning: 'architecture · scalability · reliability',
};

export const links = [
  { id: 'portfolio', label: 'Portfolio', icon: 'globe', href: 'https://rifki-n-dzaki.vercel.app' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/rifkind' },
  { id: 'email', label: 'Email', icon: 'mail', href: 'mailto:rifkinauvaldzaki08@gmail.com' },
  { id: 'instagram', label: 'GitHub', icon: 'github', href: 'https://github.com/RifkiND' },
];

export const sections = [
  { id: 'about', no: '01', eyebrow: 'ENGINEERING WORKSPACE', title: 'System architecture & craft.' },
  { id: 'work', no: '02', eyebrow: 'SELECTED WORK', title: 'Services, APIs & infrastructure.' },
  { id: 'stack', no: '03', eyebrow: 'TECH TOOLBOX', title: 'Technologies I build with.' },
  { id: 'activity', no: '04', eyebrow: 'ENGINEERING CADENCE', title: 'Continuous activity on GitHub.' },
];

// Workflow process / engineering pillars (Section 6 & focus cards)
export const focus = [
  {
    id: 'backend',
    accent: 'backend',
    label: 'CORE',
    no: '01',
    title: 'Backend Systems',
    desc: 'High-throughput REST & gRPC microservices, robust business logic, and concurrent processing pipelines.',
    tags: ['GO', 'PYTHON', 'PHP', 'FASTAPI'],
  },
  {
    id: 'devops',
    accent: 'devops',
    label: 'INFRA',
    no: '02',
    title: 'DevOps & CI/CD',
    desc: 'Containerized deployments, automated GitHub Actions pipelines, Linux systems, and reverse proxy routing.',
    tags: ['DOCKER', 'ACTIONS', 'NGINX', 'LINUX'],
  },
  {
    id: 'data',
    accent: 'data',
    label: 'STORAGE',
    no: '03',
    title: 'Data & Caching',
    desc: 'Relational data modeling, query optimization, in-memory caching strategies, and event distribution.',
    tags: ['POSTGRESQL', 'REDIS', 'MYSQL', 'BASH'],
  },
];

// Process stages specified in Section 6 of AGENTS.md
export const workflowStages = [
  {
    no: '01',
    name: 'Discovery',
    items: ['Requirements analysis', 'Problem definition', 'Technical research'],
    desc: 'Analyzing system requirements, identifying performance bottlenecks, and researching optimal tech stacks.'
  },
  {
    no: '02',
    name: 'Architecture & Design',
    items: ['System architecture', 'Database schema design', 'API contracts & gRPC', 'Infrastructure planning'],
    desc: 'Drafting data flows, designing normalized schemas, specifying API contracts, and planning infrastructure topology.'
  },
  {
    no: '03',
    name: 'Build & Ship',
    items: ['Backend implementation', 'Service integration', 'Automated unit/integ tests', 'Containerization'],
    desc: 'Implementing core logic with high test coverage, packaging into Docker containers, and validating resilience.'
  },
  {
    no: '04',
    name: 'Deploy & Support',
    items: ['CI/CD pipeline runs', 'Production deployment', 'Telemetry & monitoring', 'Reliability maintenance'],
    desc: 'Automating release pipelines, configuring Nginx gateways, instrumenting health checks, and maintaining uptime.'
  },
];

// Tech stack categorized by backend engineering focus [label, simple-icons slug]
export const stack = [
  {
    label: 'Languages',
    accent: 'backend',
    items: [
      ['Go', 'go'],
      ['Python', 'python'],
      ['PHP', 'php'],
      ['C++', 'cplusplus'],
      ['Bash', 'gnubash'],
      ['Linux', 'linux'],
    ],
  },
  {
    label: 'Backend & APIs',
    accent: 'backend',
    items: [
      ['FastAPI', 'fastapi'],
      ['Express', 'express'],
      ['Node.js', 'nodedotjs'],
      ['Nginx', 'nginx'],
    ],
  },
  {
    label: 'Data & Caching',
    accent: 'data',
    items: [
      ['PostgreSQL', 'postgresql'],
      ['Redis', 'redis'],
      ['MySQL', 'mysql'],
      ['SQLite', 'sqlite'],
    ],
  },
  {
    label: 'DevOps & Cloud',
    accent: 'devops',
    items: [
      ['Docker', 'docker'],
      ['GitHub Actions', 'githubactions'],
      ['Git', 'git'],
    ],
  },
];

export const projects = [
  {
    id: 'api-gateway',
    name: 'Distributed API Gateway',
    accent: 'backend',
    kind: 'MICROSERVICES · GO',
    desc: 'High-throughput reverse proxy and API routing layer with token authentication and rate limiting.',
    stack: ['GO', 'REDIS', 'DOCKER', 'NGINX'],
    href: 'https://github.com/RifkiND',
  },
  {
    id: 'cloud-infra',
    name: 'Automated CI/CD Pipeline',
    accent: 'devops',
    kind: 'INFRASTRUCTURE · DEVOPS',
    desc: 'Production-ready container deployment workflow with linting, integration testing, and automated rollouts.',
    stack: ['GITHUB ACTIONS', 'DOCKER', 'LINUX', 'BASH'],
    href: 'https://github.com/RifkiND',
  },
];

export const footer = {
  title: "Let's build reliable systems together.",
  sub: 'Open to backend, DevOps, and software engineering opportunities — reach me at rifkinauvaldzaki08@gmail.com',
};
