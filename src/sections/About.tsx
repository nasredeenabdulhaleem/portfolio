import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, GraduationCap, Code2, Target, Award, Rocket, CalendarDays } from 'lucide-react'

const highlights = [
  { icon: MapPin, label: 'Location', value: 'Nigeria, Africa' },
  { icon: Code2, label: 'Core Stack', value: 'Python · TypeScript · Rust' },
  { icon: GraduationCap, label: 'Education', value: 'BSc CS – FUD (2026)' },
  { icon: Target, label: 'Focus', value: 'Scalable Backend Systems' },
]

const values = [
  {
    icon: Award,
    title: 'Excellence in Engineering',
    description: 'Every system I architect is built for performance, security, and long-term maintainability — production-grade from day one.',
  },
  {
    icon: Rocket,
    title: 'Ship Fast, Scale Right',
    description: 'I balance velocity with quality — launching MVPs rapidly then scaling them to handle millions of requests daily.',
  },
  {
    icon: CalendarDays,
    title: 'Africa-Focused Impact',
    description: 'As COO at Naszat Labs, I\'m driving technology solutions that empower African businesses and communities at scale.',
  },
]

const SCHEDULE_URL = 'https://calendar.app.google/mwEprcnfiZDLtUFGA'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-gold rounded-full text-xs font-code text-gold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              About Me
            </div>
            <h2 className="section-heading mb-6">
              The Engineer Behind<br />
              <span className="text-gradient-gold">The Build</span>
            </h2>
            <div className="space-y-4 text-gray-400 font-body leading-relaxed">
              <p>
                I'm Abdulhaleem Nasredeen Hamza — a results-driven backend engineer and cloud architect
                with 5+ years building scalable, high-performance systems. Proficient in Python, TypeScript,
                and Rust, with deep expertise in Django, Flask, NestJS, and Actix frameworks.
              </p>
              <p>
                Currently serving as <span className="text-white font-medium">Chief Operations Officer at Naszat Laboratories</span> and
                Core Developer at Pyrax LLC, I simultaneously architect blockchain systems in Rust and
                lead operational strategy across Africa's tech ecosystem.
              </p>
              <p>
                From Solana smart contracts to government-grade cloud infrastructure serving Nigerian state
                ministries — I deliver end-to-end solutions that drive efficiency and real-world impact.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-code">{item.label}</p>
                    <p className="text-sm text-white font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              Schedule a Meeting
            </a>
          </motion.div>

          {/* Right */}
          <div className="space-y-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="card group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <v.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-white font-semibold mb-1">{v.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="card"
            >
              <p className="text-xs text-gray-500 font-code mb-3 uppercase tracking-widest">Certifications</p>
              <div className="space-y-2.5">
                {[
                  { name: 'Udacity Full-Stack NanoDegree', issuer: 'ALX Scholarship · 2021', color: '#F5B301' },
                  { name: 'Backend Specialist', issuer: 'Coursera — IBM & AWS', color: '#0078D4' },
                ].map((cert) => (
                  <div key={cert.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cert.color }} />
                    <div>
                      <p className="text-sm text-white font-medium">{cert.name}</p>
                      <p className="text-xs text-gray-500 font-code">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Code card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-gray-600 text-xs ml-2 font-code">bob.py</span>
              </div>
              <pre className="text-xs text-gray-300 font-code leading-relaxed overflow-x-auto">{`class BobTheBuilder:
    name = "Abdulhaleem Nasredeen"
    role = ["Backend Eng", "Cloud Arch", "COO"]
    stack = ["Python", "TypeScript", "Rust"]
    mission = "Building Africa's Future"
    available = True  # hire me! 🚀`}</pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
