import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Cloud, Database, Layers, Brain } from 'lucide-react'
import { skillCategories } from '../data/skills'
import type { ElementType } from 'react'

const iconMap: Record<string, ElementType> = { Code2, Cloud, Database, Layers, Brain }

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="skills" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-gold rounded-full text-xs font-code text-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Technical Arsenal
          </div>
          <h2 className="section-heading">Skills & <span className="text-gradient-gold">Expertise</span></h2>
          <p className="section-subheading mx-auto mt-4">A battle-tested toolkit spanning full-stack development, cloud infrastructure, blockchain, and AI systems.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => {
            const Icon = iconMap[cat.icon] || Code2
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className="card group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}18` }}>
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-heading text-white font-semibold">{cat.title}</h3>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-body text-xs text-gray-400">{skill.name}</span>
                        <span className="font-code text-xs" style={{ color: cat.color }}>{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 0.9, delay: ci * 0.1 + si * 0.05 + 0.3, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
