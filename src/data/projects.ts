export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github?: string
  live?: string
  image: string
  featured: boolean
  status: 'live' | 'development' | 'archived'
  year: string
  accentColor: string
}

export const projects: Project[] = [
  {
    id: 'veladao',
    title: 'VelaDAO',
    description: 'Decentralized autonomous organization platform enabling community governance and DeFi protocols on blockchain.',
    longDescription: 'VelaDAO is a cutting-edge Web3 platform that enables decentralized governance, token voting, and DeFi integrations. Built with Solidity smart contracts, React frontend, and Web3.js for seamless blockchain interactions.',
    tech: ['Solidity', 'React', 'Web3.js', 'Hardhat', 'IPFS', 'TypeScript', 'Node.js'],
    category: 'Web3',
    github: 'https://github.com',
    live: 'https://veladao.io',
    image: '/projects/veladao.jpg',
    featured: true,
    status: 'live',
    year: '2024',
    accentColor: '#818CF8',
  },
  {
    id: 'ajinex',
    title: 'Ajinex',
    description: 'High-performance crypto exchange platform with real-time trading, advanced charting, and institutional-grade security.',
    longDescription: 'Ajinex is a next-generation cryptocurrency exchange built for speed and reliability. Features include sub-millisecond order matching, WebSocket-powered real-time data, and multi-layer security architecture.',
    tech: ['Node.js', 'Redis', 'PostgreSQL', 'React', 'WebSocket', 'Docker', 'Kubernetes', 'AWS'],
    category: 'Fintech',
    github: 'https://github.com',
    live: 'https://ajinex.com',
    image: '/projects/ajinex.jpg',
    featured: true,
    status: 'live',
    year: '2023',
    accentColor: '#F5B301',
  },
  {
    id: 'taxstream',
    title: 'TaxStream',
    description: 'Intelligent tax automation platform for African businesses with compliance tracking and real-time reporting.',
    longDescription: 'TaxStream revolutionizes tax management for SMEs across Africa. Automated compliance tracking, multi-jurisdiction support, real-time financial reporting, and integration with major ERP systems.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Celery', 'Redis', 'AWS Lambda'],
    category: 'SaaS',
    github: 'https://github.com',
    live: 'https://taxstream.ng',
    image: '/projects/taxstream.jpg',
    featured: true,
    status: 'live',
    year: '2023',
    accentColor: '#34D399',
  },
  {
    id: 'edusoft',
    title: 'EduSoft',
    description: 'Comprehensive learning management system powering digital education for institutions across Nigeria.',
    longDescription: 'EduSoft is an enterprise LMS designed for African educational institutions. Features live classes, assignment management, grade tracking, parent portals, and offline-first capabilities for low-bandwidth environments.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'FFmpeg', 'Docker', 'Nginx', 'WebRTC'],
    category: 'EdTech',
    github: 'https://github.com',
    live: 'https://edusoft.ng',
    image: '/projects/edusoft.jpg',
    featured: true,
    status: 'live',
    year: '2022',
    accentColor: '#0078D4',
  },
  {
    id: 'nazat-labs',
    title: 'Nazat Labs',
    description: 'Technology innovation lab building developer tools, open-source libraries, and cloud infrastructure solutions.',
    longDescription: 'Nazat Labs is the R&D arm of Naszat Ideal Concepts, focused on building open-source developer tools, cloud automation frameworks, and innovative technology solutions for African startups.',
    tech: ['Go', 'Rust', 'TypeScript', 'Kubernetes', 'Terraform', 'AWS', 'Firebase'],
    category: 'Infrastructure',
    github: 'https://github.com/nazatlabs',
    live: 'https://nazatlabs.com',
    image: '/projects/nazat.jpg',
    featured: true,
    status: 'development',
    year: '2024',
    accentColor: '#F87171',
  }
]
