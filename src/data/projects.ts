export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github?: string
  live?: string
  featured: boolean
  status: 'live' | 'development' | 'archived'
  year: string
  accentColor: string
}

export const projects: Project[] = [
  {
    id: 'veladao',
    title: 'VelaDAO',
    description: 'Solana-powered crowdfunding platform with milestone-based donations using SOL & USDC, DAO governance, and impact reporting.',
    longDescription: 'Spearheaded a decentralized crowdfunding platform on Solana enabling milestone-based donations with governance voting and impact tracking. Built with Anchor framework and integrated SOL/USDC payment rails.',
    tech: ['Solana', 'Anchor', 'Rust', 'TypeScript', 'React', 'Web3.js', 'IPFS'],
    category: 'Web3',
    live: 'https://veladao.io',
    featured: true,
    status: 'live',
    year: '2024',
    accentColor: '#818CF8',
  },
  {
    id: 'ajinex',
    title: 'Ajinex',
    description: 'High-performance crypto exchange with real-time trading, WebSocket market data, and institutional-grade security architecture.',
    longDescription: 'Next-generation cryptocurrency exchange built for speed and reliability. Sub-millisecond order matching, WebSocket market data, multi-layer security, and a scalable microservices backend.',
    tech: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'WebSocket', 'Docker', 'AWS'],
    category: 'Fintech',
    live: 'https://ajinex.com',
    featured: true,
    status: 'live',
    year: '2024',
    accentColor: '#F5B301',
  },
  {
    id: 'naszat-labs',
    title: 'Naszat Laboratories',
    description: 'Technology innovation company building developer tools, open-source solutions, and digital infrastructure for Africa.',
    longDescription: 'As COO, leading operational and product strategy at Naszat Labs — delivering education, fintech, and digital infrastructure solutions across Africa through a team of world-class engineers.',
    tech: ['TypeScript', 'Python', 'Django', 'React', 'Docker', 'AWS', 'PostgreSQL'],
    category: 'Infrastructure',
    live: 'https://naszat.tech',
    featured: true,
    status: 'live',
    year: '2025',
    accentColor: '#34D399',
  },
  {
    id: 'agric-loan',
    title: 'Agric Loan System',
    description: 'Government loan management platform for Jigawa State Ministry of Agriculture improving transparency and farmer access to credit.',
    longDescription: 'Built for the Ministry of Agriculture as part of Startup Jigawa. Full-stack system managing loan applications, approvals, disbursements, and repayment tracking for thousands of smallholder farmers.',
    tech: ['Django', 'Python', 'PostgreSQL', 'React', 'Docker', 'REST API', 'AWS'],
    category: 'GovTech',
    featured: true,
    status: 'live',
    year: '2025',
    accentColor: '#0078D4',
  },
  {
    id: 'health-reporting',
    title: 'Health Reporting System',
    description: 'Digital platform for health data collection and analysis across Jigawa State health facilities enabling real-time public health insights.',
    longDescription: 'Comprehensive health data platform for the Jigawa State Ministry of Health. Enables facility-level data collection, aggregation, and real-time analysis for evidence-based public health decisions.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'React', 'AWS', 'REST API', 'Docker'],
    category: 'GovTech',
    featured: false,
    status: 'live',
    year: '2025',
    accentColor: '#F87171',
  },
  {
    id: 'pyrax',
    title: 'Pyrax Chain',
    description: 'Scalable blockchain infrastructure powering the Pyrax decentralized ecosystem with high-performance Rust-based backend systems.',
    longDescription: 'Core blockchain infrastructure for Pyrax LLC — building the backend systems and Web3 infrastructure powering the Pyrax chain using Rust and modern decentralized technologies.',
    tech: ['Rust', 'Actix', 'Solana', 'Anchor', 'TypeScript', 'Web3', 'Docker'],
    category: 'Web3',
    featured: false,
    status: 'development',
    year: '2026',
    accentColor: '#818CF8',
  },
]
