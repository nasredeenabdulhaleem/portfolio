export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: string
  description: string[]
  tech: string[]
  current: boolean
  link?: string
}

export const experiences: Experience[] = [
  {
    id: 'kindlepath',
    company: 'KindlePath Digital Initiative',
    role: 'Backend & Cloud Architect',
    period: 'Mar 2026 – Present',
    location: 'Africa (Hybrid)',
    type: 'Full-time',
    description: [
      'Architecting scalable cloud-native backend systems and digital infrastructures for enterprise clients',
      'Designing secure APIs, databases, and deployment workflows for high-availability applications',
      'Managing cloud environments, automation pipelines, and system reliability at scale',
      'Driving backend optimization, scalability, and infrastructure efficiency across multiple product lines',
    ],
    tech: ['AWS', 'GCP', 'Docker', 'PostgreSQL', 'Python', 'NestJS', 'CI/CD'],
    current: true,
  },
  {
    id: 'pyrax',
    company: 'Pyrax LLC',
    role: 'Core Developer',
    period: 'Mar 2026 – Present',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Developing scalable blockchain-based backend systems and decentralized applications',
      'Building secure and efficient Web3 infrastructures that power the Pyrax chain',
      'Designing high-performance backend architectures using Rust and modern blockchain technologies',
      'Collaborating on smart infrastructure development and decentralized ecosystem growth',
    ],
    tech: ['Rust', 'Blockchain', 'Web3', 'Actix', 'Anchor', 'Solana'],
    current: true,
  },
  {
    id: 'naszat-labs',
    company: 'Naszat Laboratories',
    role: 'Chief Operations Officer',
    period: 'Jul 2025 – Present',
    location: 'Abuja, Nigeria (Hybrid)',
    type: 'Executive',
    description: [
      'Leading operational strategy and execution across all technology initiatives at Naszat Labs',
      'Overseeing product development workflows and cross-functional team coordination',
      'Managing technology project delivery across education, fintech, and digital infrastructure sectors',
      'Coordinating partnerships, ecosystem growth, and strategic business development across Africa',
    ],
    tech: ['Strategy', 'Operations', 'TypeScript', 'Cloud', 'Python', 'Team Leadership'],
    current: true,
    link: 'https://naszat.tech',
  },
  {
    id: 'corestream',
    company: 'Corestream Nigeria',
    role: 'Software Engineer',
    period: 'Mar 2025 – May 2026',
    location: 'Plateau, Nigeria',
    type: 'Contract',
    description: [
      'Participated in all system architecture and design decisions for critical infrastructure projects',
      'Built scalable full-stack systems and authored CI/CD workflows for seamless production deployments',
      'Led and mentored a team of developers across the full-stack domain',
      'Ensured OWASP compliance, security testing, and uptime with proper recovery mechanisms',
    ],
    tech: ['TypeScript', 'Python', 'Docker', 'CI/CD', 'PostgreSQL', 'React', 'AWS'],
    current: false,
  },
  {
    id: 'startup-jigawa',
    company: 'Startup Jigawa',
    role: 'Software Development Partner',
    period: 'May 2024 – Feb 2026',
    location: 'Jigawa, Nigeria',
    type: 'Full-time',
    description: [
      'Led development of critical government systems including Agric Loan and Health Reporting platforms',
      'Supervised software training programs and managed in-house products for state ministries',
      'Led a team of 7–10 developers delivering client projects and internal products',
      'Designed system architectures maintaining highest industry standards for government-grade software',
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'AWS', 'Docker', 'Python', 'TypeScript'],
    current: false,
  },
  {
    id: 'veladao',
    company: 'Veladao Crowdfunding Platform',
    role: 'Product Lead & Developer',
    period: 'Jul 2024 – Oct 2024',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Spearheaded the Solana blockchain-based crowdfunding platform with milestone-based donations using SOL and USDC',
      'Integrated governance features, DAO voting mechanisms, and an impact reporting system',
    ],
    tech: ['Solana', 'Anchor', 'Rust', 'TypeScript', 'React', 'Web3.js'],
    current: false,
    link: 'https://veladao.io',
  },
]
