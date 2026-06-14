import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, CheckCircle2, MapPin, ExternalLink } from 'lucide-react'
import { experiences } from '../data/experience'

const typeColor: Record<string, string> = {
  'Full-time': '#34D399',
  Contract: '#0078D4',
  Executive: '#F5B301',
  Freelance: '#818CF8',
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-gold rounded-full text-xs font-code text-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Career Journey
          </div>
          <h2 className="section-heading">
            Work <span className="text-gradient-gold">Experience</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Building impactful products and systems across Nigeria and the global tech ecosystem.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-7 top-2 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-5 top-6 w-5 h-5 rounded-full border-2 border-gold bg-background hidden md:flex items-center justify-center flex-shrink-0">
                  {exp.current && <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                </div>

                <div className="card group">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-code"
                          style={{
                            backgroundColor: `${typeColor[exp.type] || '#6B7280'}18`,
                            color: typeColor[exp.type] || '#6B7280',
                          }}
                        >
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green text-xs font-code">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-xl font-semibold text-white group-hover:text-gold transition-colors">
                          {exp.role}
                        </h3>
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-gold/80 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs font-code text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((d, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-gold/50 flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-surface-2 text-xs text-gray-400 font-code">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
