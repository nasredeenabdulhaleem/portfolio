import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Twitter, Download, ChevronDown, CalendarDays } from 'lucide-react'

const roles = [
  'Backend Engineer',
  'Cloud Architect',
  'Product Builder',
  'Web3 Developer',
  'COO @ Naszat Labs',
  'System Designer',
]

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Shipped', value: '30+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Teams Led', value: '10+' },
]

const SCHEDULE_URL = 'https://calendar.app.google/mwEprcnfiZDLtUFGA'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 40 : 80
    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 2000)
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid + orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,179,1,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,179,1,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cloud-blue/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-green/3 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <img
            src="/logo.svg"
            alt="BOB THE BUILDER Logo"
            className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl"
          />
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 glass-gold rounded-full text-sm font-medium text-gold mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span>Open to exciting opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-3"
        >
          Abdulhaleem
          <br />
          <span className="text-gradient-gold">Nasredeen</span>
        </motion.h1>

        {/* Alias */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/40" />
          <span className="font-code text-gold/70 text-xs tracking-[0.3em] uppercase">BOB THE BUILDER</span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-12 flex items-center justify-center mb-5"
        >
          <span className="font-heading text-2xl md:text-3xl text-gray-300 font-medium">
            {text}
            <span className="inline-block w-0.5 h-7 bg-gold ml-1 animate-pulse" />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-body text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Results-driven backend engineer with 5+ years building scalable systems in Python, TypeScript & Rust.{' '}
          <span className="text-white font-medium">Architecting Africa's digital future.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex items-center gap-2"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            Schedule a Meeting
          </a>
          <a
            href="/Abdulhaleem_Nasredeen_Resume.pdf"
            download
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" /> Download CV
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto mb-12"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.75 + i * 0.08 }}
              className="glass-gold rounded-xl p-4 text-center"
            >
              <div className="font-heading text-2xl font-bold text-gold">{s.value}</div>
              <div className="font-body text-xs text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: 'https://github.com/nasredeenabdulhaleem', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/nasredeen-software-engineer', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://x.com/algonasr', label: 'X (Twitter)' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-gold border border-transparent hover:border-gold/30 transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600"
      >
        <span className="font-code text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
