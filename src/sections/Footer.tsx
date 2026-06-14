import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Twitter, Mail, ArrowUp, CalendarDays } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com/nasredeenabdulhaleem', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/nasredeen-software-engineer', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/algonasr', label: 'X (@algonasr)' },
  { icon: Mail, href: 'mailto:nabdulhaleem09@gmail.com', label: 'Email' },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const SCHEDULE_URL = 'https://calendar.app.google/mwEprcnfiZDLtUFGA'

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <footer ref={ref} className="relative border-t border-white/5 py-14">
      <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1.5 justify-center md:justify-start">
                <img src="/logo.svg" alt="BOB THE BUILDER" className="w-10 h-10" />
                <div>
                  <span className="font-heading font-bold text-base text-white block leading-none">BOB THE BUILDER</span>
                  <span className="font-code text-xs text-gold/60 tracking-widest">CODE · CLOUD · SCALE</span>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap gap-5 justify-center">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Scroll top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-gray-500 hover:text-gold border border-transparent hover:border-gold/30 transition-all hover:scale-110"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Schedule CTA */}
          <div className="flex justify-center mb-8">
            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 glass-gold rounded-full text-sm text-gold font-medium hover:bg-gold/10 transition-all"
            >
              <CalendarDays className="w-4 h-4" />
              Schedule a Meeting
            </a>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-3 mb-8">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-gray-500 hover:text-gold border border-transparent hover:border-gold/30 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Bottom */}
          <div className="text-center pt-6 border-t border-white/5">
            <p className="text-xs text-gray-600 font-code">
              © {new Date().getFullYear()} Abdulhaleem Nasredeen Hamza · COO @ Naszat Laboratories · Crafted with{' '}
              <span className="text-gold">♥</span> in Nigeria
            </p>
            <p className="text-xs text-gray-700 mt-1 font-code">
              Architecting Scalable Systems · Building Africa's Digital Future
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
