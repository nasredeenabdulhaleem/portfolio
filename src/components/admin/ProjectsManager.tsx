import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'

interface Project {
  id?: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github?: string
  live?: string
  featured: boolean
  status: string
  year: number
  accentColor: string
}

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  description: '',
  longDescription: '',
  tech: [],
  category: 'Web3',
  github: '',
  live: '',
  featured: false,
  status: 'live',
  year: new Date().getFullYear(),
  accentColor: '#F5B301',
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<Omit<Project, 'id'>>(emptyProject)
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('year', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)))
    }, (err) => toast.error('Failed to load projects: ' + err.message))
    return unsub
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyProject)
    setTechInput('')
    setShowModal(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({ ...p })
    setTechInput(p.tech.join(', '))
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error('Title is required')
    setSaving(true)
    try {
      const data = { ...form, tech: techInput.split(',').map((t) => t.trim()).filter(Boolean) }
      if (editing?.id) {
        await updateDoc(doc(db, 'projects', editing.id), data)
        toast.success('Project updated')
      } else {
        await addDoc(collection(db, 'projects'), data)
        toast.success('Project created')
      }
      setShowModal(false)
    } catch (err: unknown) {
      toast.error('Save failed: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    try {
      await deleteDoc(doc(db, 'projects', id))
      toast.success('Project deleted')
    } catch (err: unknown) {
      toast.error('Delete failed: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-xl font-semibold text-white">Projects ({projects.length})</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2">+ Add Project</button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Year</th>
              <th className="text-left px-4 py-3">Featured</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="px-4 py-3 text-white font-medium">{p.title}</td>
                <td className="px-4 py-3 text-gray-400">{p.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    p.status === 'live' ? 'bg-green-500/20 text-green-400' :
                    p.status === 'development' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-400">{p.year}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs ${p.featured ? 'text-gold' : 'text-gray-600'}`}>
                    {p.featured ? '★ Yes' : '—'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(p)} className="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30 hover:border-blue-400/50 transition">Edit</button>
                  <button onClick={() => p.id && handleDelete(p.id)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded border border-red-500/30 hover:border-red-400/50 transition">Delete</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-heading text-lg font-semibold text-white mb-5">
              {editing ? 'Edit Project' : 'Add Project'}
            </h3>
            <div className="space-y-4">
              <Field label="Title">
                <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <Field label="Description">
                <textarea className={inputCls} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Field>
              <Field label="Long Description">
                <textarea className={inputCls} rows={4} value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
              </Field>
              <Field label="Tech (comma-separated)">
                <input className={inputCls} value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="React, TypeScript, Firebase" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {['Web3', 'Fintech', 'Infrastructure', 'GovTech'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {['live', 'development', 'archived'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="GitHub URL">
                  <input className={inputCls} value={form.github || ''} onChange={(e) => setForm({ ...form, github: e.target.value })} />
                </Field>
                <Field label="Live URL">
                  <input className={inputCls} value={form.live || ''} onChange={(e) => setForm({ ...form, live: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Year">
                  <input type="number" className={inputCls} value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
                </Field>
                <Field label="Accent Color">
                  <input className={inputCls} value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-gold" />
                Featured project
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
