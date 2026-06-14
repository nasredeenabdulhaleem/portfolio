export interface Experience {
  id: string
  company: string
  role: string
  period: string
  type: string
  description: string[]
  tech: string[]
  current: boolean
}

export const experiences: Experience[] = [
  {
    id: 'nazat-labs',
    company: 'Nazat Labs',
    role: 'Founder & CTO',
    period: '2024 - Present',
    type: 'Founder',
    description: [
      'Founded and leading a technology innovation lab building next-gen developer tools',
      'Architecting cloud-native infrastructure solutions for African startups',
      'Building open-source libraries used by thousands of developers',
      'Spearheading R&D in Web3, AI, and distributed systems'
    ],
    tech: ['Go', 'Rust', 'TypeScript', 'Kubernetes', 'Terraform', 'AWS'],
    current: true
  },
  {
    id: 'naszat',
    company: 'Naszat Ideal Concepts',
    role: 'Lead Software Engineer & Cloud Architect',
    period: '2022 - Present',
    type: 'Full-time',
    description: [
      'Led architecture and development of 5+ enterprise-grade applications',
      'Designed and deployed cloud infrastructure serving 100k+ users',
      'Implemented microservices architecture reducing system latency by 60%',
      'Mentored team of 8 engineers across frontend, backend, and DevOps'
    ],
    tech: ['Node.js', 'React', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    current: true
  },
  {
    id: 'corestream',
    company: 'Corestream Nigeria',
    role: 'Senior Backend Engineer',
    period: '2020 - 2022',
    type: 'Full-time',
    description: [
      'Developed high-performance API services handling 1M+ requests/day',
      'Optimized database queries reducing response times by 40%',
      'Built real-time data pipelines using event-driven architecture',
      'Implemented security protocols achieving SOC 2 compliance'
    ],
    tech: ['Python', 'Django', 'PostgreSQL', 'Celery', 'Redis', 'Docker', 'AWS'],
    current: false
  },
  {
    id: 'veladao',
    company: 'VelaDAO',
    role: 'Web3 Lead Engineer',
    period: '2021 - 2023',
    type: 'Contract',
    description: [
      'Designed and deployed Solidity smart contracts managing $2M+ TVL',
      'Built DAO governance mechanisms with quadratic voting',
      'Created DeFi protocol integrations with major blockchain networks',
      'Implemented security auditing processes preventing $500k in potential exploits'
    ],
    tech: ['Solidity', 'Hardhat', 'Web3.js', 'React', 'IPFS', 'Ethereum'],
    current: false
  }
]
