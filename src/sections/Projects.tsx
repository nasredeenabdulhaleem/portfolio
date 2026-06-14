import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'

const categories = ['All', 'Web3', 'Fintech', 'Infrastructure', 'GovTech']

const statusColor: Record<string, string> = {
  live: '#34D399',
  development: '#F5B301',
  archived: '#6B7280',
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-gold rounded-full text-xs font-code text-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Featured Work
          </div>
          <h2 className="section-heading">Projects That <span className="text-gradient-gold">Ship</span></h2>
          <p className="section-subheading mx-auto mt-4">
            From Solana DeFi protocols to government platforms — real systems solving real problems at scale.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gold text-background'
                  : 'glass text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card group cursor-default"
              >
                {/* Card header */}
                <div
                  className="h-36 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center"
                  style={{ background: `${project.accentColor}08` }}
                >
                  <span
                    className="font-heading text-7xl font-bold select-none"
                    style={{ color: `${project.accentColor}12` }}
                  >
                    {project.title.charAt(0)}
                  </span>
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${project.accentColor}15, transparent 70%)` }}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor[project.status] }} />
                    <span className="text-xs font-code capitalize" style={{ color: statusColor[project.status] }}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-xs text-gray-300 font-code">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gray-600 font-code flex-shrink-0 ml-2">{project.year}</span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-surface-2 text-xs text-gray-400 font-code">{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-surface-2 text-xs text-gray-600 font-code">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gold transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                  <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-gold group-hover:translate-x-1 transition-all ml-auto" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
