import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Code2, Briefcase, User, Mail, Layers } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const commands = [
  { id: 'about', label: 'Go to About', icon: User, href: '#about', category: 'Navigate' },
  { id: 'skills', label: 'View Skills', icon: Code2, href: '#skills', category: 'Navigate' },
  { id: 'projects', label: 'Browse Projects', icon: Layers, href: '#projects', category: 'Navigate' },
  { id: 'experience', label: 'View Experience', icon: Briefcase, href: '#experience', category: 'Navigate' },
  { id: 'contact', label: 'Contact Me', icon: Mail, href: '#contact', category: 'Navigate' },
]

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
    }
  }, [commandPaletteOpen])

  const execute = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setCommandPaletteOpen(false)
  }

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-[101] px-4"
          >
            <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or navigate..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none font-body text-sm"
                />
                <button onClick={() => setCommandPaletteOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No results</p>
                ) : (
                  filtered.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => execute(cmd.href)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                        <cmd.icon className="w-4 h-4 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium">{cmd.label}</p>
                        <p className="text-xs text-gray-500">{cmd.category}</p>
                      </div>
                      <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-gold transition-colors" />
                    </button>
                  ))
                )}
              </div>
              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-xs text-gray-600 font-code">
                <span>Enter Select</span>
                <span>Cmd+K Toggle</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
