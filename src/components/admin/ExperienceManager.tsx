import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'

interface Experience {
  id?: string
  company: string
  role: string
  period: string
  location: string
  type: string
  description: string[]
  tech: string[]
  current: boolean
  link?: string
}

const emptyExp: Omit<Experience, 'id'> = {
  company: '',
  role: '',
  period: '',
  location: '',
  type: 'Full-time',
  description: [],
  tech: [],
  current: false,
  link: '',
}

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)
  const [form, setForm] = useState<Omit<Experience, 'id'>>(emptyExp)
  const [techInput, setTechInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'experiences'), orderBy('period', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setExperiences(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Experience)))
    }, (err) => toast.error('Failed to load: ' + err.message))
    return unsub
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyExp)
    setTechInput('')
    setDescInput('')
    setShowModal(true)
  }

  const openEdit = (e: Experience) => {
    setEditing(e)
    setForm({ ...e })
    setTechInput(e.tech.join(', '))
    setDescInput(e.description.join('\n'))
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.company.trim()) return toast.error('Company is required')
    setSaving(true)
    try {
      const data = {
        ...form,
        tech: techInput.split(',').map((t) => t.trim()).filter(Boolean),
        description: descInput.split('\n').map((d) => d.trim()).filter(Boolean),
      }
      if (editing?.id) {
        await updateDoc(doc(db, 'experiences', editing.id), data)
        toast.success('Experience updated')
      } else {
        await addDoc(collection(db, 'experiences'), data)
        toast.success('Experience created')
      }
      setShowModal(false)
    } catch (err: unknown) {
      toast.error('Save failed: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return
    try {
      await deleteDoc(doc(db, 'experiences', id))
      toast.success('Deleted')
    } catch (err: unknown) {
      toast.error('Delete failed: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-xl font-semibold text-white">Experience ({experiences.length})</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2">+ Add Experience</button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="text-left px-4 py-3">Company</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Period</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="px-4 py-3 text-white font-medium">{exp.company}</td>
                <td className="px-4 py-3 text-gray-300">{exp.role}</td>
                <td className="px-4 py-3 text-gray-400">{exp.period}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-400">{exp.type}</span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(exp)} className="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30 hover:border-blue-400/50 transition">Edit</button>
                  <button onClick={() => exp.id && handleDelete(exp.id)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded border border-red-500/30 hover:border-red-400/50 transition">Delete</button>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No experiences yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-heading text-lg font-semibold text-white mb-5">
              {editing ? 'Edit Experience' : 'Add Experience'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Company">
                  <input className={inputCls} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </Field>
                <Field label="Role">
                  <input className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Period">
                  <input className={inputCls} value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="2022 — Present" />
                </Field>
                <Field label="Location">
                  <input className={inputCls} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Type">
                  <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {['Full-time', 'Contract', 'Executive'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Link (optional)">
                  <input className={inputCls} value={form.link || ''} onChange={(e) => setForm({ ...form, link: e.target.value })} />
                </Field>
              </div>
              <Field label="Description (one per line)">
                <textarea className={inputCls} rows={5} value={descInput} onChange={(e) => setDescInput(e.target.value)} placeholder="Each line becomes a bullet point" />
              </Field>
              <Field label="Tech (comma-separated)">
                <input className={inputCls} value={techInput} onChange={(e) => setTechInput(e.target.value)} />
              </Field>
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} className="accent-gold" />
                Current position
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary text-sm py-2">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputCls = 'w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold/50 transition'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  )
}
