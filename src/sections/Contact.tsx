import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const projectTypes = [
  'Web Application',
  'Cloud Architecture',
  'Web3 / Blockchain',
  'API Development',
  'Technical Consultation',
  'Other',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: serverTimestamp(),
        read: false,
      })
      setSubmitted(true)
      reset()
      toast.success('Message sent! I\'ll be in touch soon.')
    } catch {
      toast.error('Failed to send. Please try again or email directly.')
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-surface-2 border border-white/5 rounded-lg text-sm text-white placeholder-gray-600 outline-none focus:border-gold/40 transition-colors font-body'

  return (
    <section id="contact" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-gold rounded-full text-xs font-code text-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Get In Touch
          </div>
          <h2 className="section-heading">
            Let's <span className="text-gradient-gold">Build Together</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Have a project in mind? Let's discuss how we can architect and build your next big thing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'nabdulhaleem09@gmail.com',
                href: 'mailto:nabdulhaleem09@gmail.com',
              },
              { icon: MapPin, label: 'Location', value: 'Nigeria, Africa', href: null },
              { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-code">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-white hover:text-gold transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 glass-gold rounded-xl hover:bg-gold/10 transition-all group"
            >
              <MessageSquare className="w-5 h-5 text-gold" />
              <div>
                <p className="text-sm font-medium text-white">WhatsApp</p>
                <p className="text-xs text-gray-500">Quick chat available</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gold/50 ml-auto group-hover:text-gold transition-colors" />
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="card flex flex-col items-center justify-center text-center py-14">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <CheckCircle2 className="w-16 h-16 text-accent-green mx-auto mb-4" />
                </motion.div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Message Received!</h3>
                <p className="text-gray-400 text-sm mb-6">I'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 font-code mb-1.5">Name *</label>
                    <input {...register('name')} placeholder="John Doe" className={inputClass} />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-code mb-1.5">Email *</label>
                    <input {...register('email')} type="email" placeholder="john@company.com" className={inputClass} />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 font-code mb-1.5">Company</label>
                    <input {...register('company')} placeholder="Your Company" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-code mb-1.5">Project Type *</label>
                    <select {...register('projectType')} className={inputClass}>
                      <option value="">Select type...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="text-xs text-red-400 mt-1">{errors.projectType.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 font-code mb-1.5">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
