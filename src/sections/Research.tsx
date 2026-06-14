import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FlaskConical, BookOpen, ExternalLink, Clock } from 'lucide-react'

const researchItems = [
  {
    id: 'fl-blockchain',
    title: 'Federated Learning for Blockchain Fraud Detection on L2 Rollups',
    status: 'active',
    area: 'AI × Web3 Security',
    description:
      'Investigating the application of federated learning techniques to detect fraudulent transactions on Layer 2 rollup networks (Optimism, Arbitrum, zkSync). The approach preserves on-chain data privacy by training models locally across nodes while aggregating gradients — enabling fraud pattern detection without exposing raw transaction data.',
    topics: ['Federated Learning', 'L2 Rollups', 'Fraud Detection', 'Privacy-Preserving ML', 'Solana', 'ZK Proofs'],
    color: '#818CF8',
  },
]

const certifications = [
  {
    name: 'Udacity Full-Stack NanoDegree',
    issuer: 'ALX Scholarship · 2021',
    status: 'completed',
    color: '#F5B301',
  },
  {
    name: 'Backend Specialist',
    issuer: 'Coursera — IBM & AWS',
    status: 'completed',
    color: '#0078D4',
  },
  {
    name: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    status: 'in-progress',
    color: '#F97316',
  },
  {
    name: 'Certified Kubernetes Administrator',
    issuer: 'CNCF',
    status: 'in-progress',
    color: '#34D399',
  },
]

export default function Research() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="research" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-gold rounded-full text-xs font-code text-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Research & Learning
          </div>
          <h2 className="section-heading">Research & <span className="text-gradient-gold">Certifications</span></h2>
          <p className="section-subheading mx-auto mt-4">
            Active research at the intersection of AI and Web3, plus ongoing professional certifications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Research — takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-2"
            >
              <FlaskConical className="w-4 h-4 text-gold" />
              <span className="font-code text-xs text-gold uppercase tracking-widest">Active Research</span>
            </motion.div>

            {researchItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="card group border border-white/5 hover:border-[#818CF8]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-code px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${item.color}18`, color: item.color }}
                      >
                        {item.area}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-accent-green font-code">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                        In Progress
                      </span>
                    </div>
                    <h3 className="font-heading text-white font-semibold text-lg leading-snug group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <BookOpen className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                </div>

                <p className="font-body text-sm text-gray-400 leading-relaxed mb-5">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.topics.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-code px-2.5 py-1 rounded-lg bg-surface-2 text-gray-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <ExternalLink className="w-4 h-4 text-gold" />
              <span className="font-code text-xs text-gold uppercase tracking-widest">Certifications</span>
            </motion.div>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                  className="card flex items-start gap-3 border border-white/5"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: cert.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium leading-snug">{cert.name}</p>
                    <p className="text-xs text-gray-500 font-code mt-0.5">{cert.issuer}</p>
                    {cert.status === 'in-progress' && (
                      <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-code text-amber-400">
                        <Clock className="w-3 h-3" /> In Progress
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
