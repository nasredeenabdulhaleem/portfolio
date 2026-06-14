export interface Skill {
  name: string
  level: number
  icon?: string
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
    id: 'software',
    title: 'Software Engineering',
    icon: 'Code2',
    color: '#F5B301',
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'Node.js', level: 95 },
      { name: 'Go', level: 75 },
      { name: 'Rust', level: 60 },
      { name: 'Java', level: 80 },
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    color: '#0078D4',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Azure', level: 80 },
      { name: 'Docker', level: 95 },
      { name: 'Kubernetes', level: 85 },
      { name: 'Terraform', level: 80 },
      { name: 'Firebase', level: 90 },
      { name: 'CI/CD', level: 90 },
      { name: 'Nginx', level: 85 },
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    color: '#34D399',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 85 },
      { name: 'Firestore', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'Elasticsearch', level: 75 },
    ]
  },
  {
    id: 'web3',
    title: 'Web3 & Blockchain',
    icon: 'Layers',
    color: '#818CF8',
    skills: [
      { name: 'Solidity', level: 80 },
      { name: 'Web3.js', level: 85 },
      { name: 'Ethers.js', level: 85 },
      { name: 'Hardhat', level: 80 },
      { name: 'IPFS', level: 75 },
      { name: 'Smart Contracts', level: 80 },
    ]
  },
  {
    id: 'ai',
    title: 'AI & ML Systems',
    icon: 'Brain',
    color: '#F87171',
    skills: [
      { name: 'LangChain', level: 75 },
      { name: 'OpenAI API', level: 85 },
      { name: 'Vector DBs', level: 70 },
      { name: 'RAG Systems', level: 75 },
      { name: 'Python ML', level: 70 },
    ]
  }
]
