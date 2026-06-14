import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Coffee, Code2, Target, Award, Heart, Rocket } from 'lucide-react'

const highlights = [
  { icon: MapPin, label: 'Location', value: 'Nigeria, Africa' },
  { icon: Code2, label: 'Specialty', value: 'Cloud Architecture' },
  { icon: Coffee, label: 'Fuel', value: '∞ Coffee cups' },
  { icon: Target, label: 'Focus', value: 'Scalable Systems' },
]

const values = [
  { icon: Award, title: 'Excellence First', description: 'Every line of code and architecture decision crafted for excellence, performance, and long-term maintainability.' },
  { icon: Heart, title: 'Africa-Focused', description: 'Building technology that solves real problems for African businesses and empowers the next generation of builders.' },
  { icon: Rocket, title: 'Ship Fast, Scale Right', description: 'Balancing velocity with quality — launching MVPs quickly then scaling them to handle millions of users.' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <p>I'm Abdulhaleem Nasredeen Hamza — a software engineer, cloud architect, and product builder with 5+ years crafting scalable systems that power businesses across Africa and beyond.</p>
              <p>From architecting microservices handling millions of daily requests to deploying DeFi protocols managing millions in TVL, I bridge complex technical challenges with elegant, production-ready solutions.</p>
              <p>As the founder of Nazat Labs and Lead Engineer at Naszat Ideal Concepts, I'm on a mission to build Africa's digital infrastructure — one scalable system at a time.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
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
          </motion.div>

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
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-gray-600 text-xs ml-2 font-code">bob.ts</span>
              </div>
              <pre className="text-xs text-gray-300 font-code leading-relaxed overflow-x-auto">{`const bob = {
  name: "Abdulhaleem Nasredeen",
  alias: "BOB THE BUILDER",
  stack: ["TypeScript","Cloud","Web3"],
  mission: "Building Africa's Future",
  available: true, // hire me! 🚀
}`}</pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
