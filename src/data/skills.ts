export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages & Frameworks',
    icon: 'Code2',
    color: '#F5B301',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Rust', level: 78 },
      { name: 'Java', level: 74 },
      { name: 'Django / Flask', level: 88 },
      { name: 'NestJS / Actix', level: 82 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    color: '#0078D4',
    skills: [
      { name: 'AWS', level: 88 },
      { name: 'GCP', level: 76 },
      { name: 'Docker', level: 92 },
      { name: 'CI/CD Pipelines', level: 88 },
      { name: 'Bash & Automation', level: 85 },
      { name: 'Microservices Arch', level: 90 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & APIs',
    icon: 'Database',
    color: '#34D399',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'Firebase / Firestore', level: 84 },
      { name: 'RESTful API Design', level: 92 },
    ],
  },
  {
    id: 'web3',
    title: 'Web3 & Blockchain',
    icon: 'Layers',
    color: '#818CF8',
    skills: [
      { name: 'Solana / Anchor', level: 82 },
      { name: 'Rust Smart Contracts', level: 78 },
      { name: 'Web3.js / Ethers.js', level: 80 },
      { name: 'DeFi Protocols', level: 75 },
      { name: 'Decentralized Apps', level: 80 },
    ],
  },
  {
    id: 'leadership',
    title: 'Architecture & Leadership',
    icon: 'Brain',
    color: '#F87171',
    skills: [
      { name: 'System Design', level: 90 },
      { name: 'Cloud Architecture', level: 88 },
      { name: 'Team Leadership', level: 88 },
      { name: 'OWASP / Security', level: 82 },
      { name: 'Operational Strategy', level: 86 },
    ],
  },
]
