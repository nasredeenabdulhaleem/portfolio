import { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save } from 'lucide-react'
import { skillCategories as staticSkills } from '../../data/skills'

interface Skill { name: string; level: number }
interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  skills: Skill[]
}

const ICON_OPTIONS = ['Code2', 'Cloud', 'Database', 'Layers', 'Brain']

export default function SkillsManager() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newCat, setNewCat] = useState<Omit<SkillCategory, 'id'>>({
    title: '', icon: 'Code2', color: '#F5B301', skills: []
  })

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'skills'), (snap) => {
      if (snap.empty) {
        setCategories(staticSkills.map(c => ({ ...c })) as SkillCategory[])
      } else {
        setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() } as SkillCategory)))
      }
    }, () => {
      setCategories(staticSkills.map(c => ({ ...c })) as SkillCategory[])
    })
    return unsub
  }, [])

  const save = async (cat: SkillCategory) => {
    try {
      await setDoc(doc(db, 'skills', cat.id), { title: cat.title, icon: cat.icon, color: cat.color, skills: cat.skills })
      toast.success('Saved')
    } catch {
      toast.error('Failed to save')
    }
  }

  const addCategory = async () => {
    if (!newCat.title) return
    const id = newCat.title.toLowerCase().replace(/\s+/g, '-')
    try {
      await setDoc(doc(db, 'skills', id), newCat)
      toast.success('Category added')
      setShowAdd(false)
      setNewCat({ title: '', icon: 'Code2', color: '#F5B301', skills: [] })
    } catch {
      toast.error('Failed to add')
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return
    try {
      await deleteDoc(doc(db, 'skills', id))
      toast.success('Deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const updateSkillLevel = (catId: string, skillIdx: number, level: number) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, skills: c.skills.map((s, i) => i === skillIdx ? { ...s, level } : s) } : c
    ))
  }

  const addSkill = (catId: string) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, skills: [...c.skills, { name: 'New Skill', level: 80 }] } : c
    ))
  }

  const removeSkill = (catId: string, idx: number) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, skills: c.skills.filter((_, i) => i !== idx) } : c
    ))
  }

  const updateSkillName = (catId: string, idx: number, name: string) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, skills: c.skills.map((s, i) => i === idx ? { ...s, name } : s) } : c
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-heading font-semibold text-lg">Skill Categories</h2>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showAdd && (
        <div className="card space-y-3">
          <h3 className="text-white font-heading font-semibold">New Category</h3>
          <input className="w-full bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            placeholder="Title" value={newCat.title} onChange={e => setNewCat(p => ({ ...p, title: e.target.value }))} />
          <div className="flex gap-3">
            <select className="flex-1 bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              value={newCat.icon} onChange={e => setNewCat(p => ({ ...p, icon: e.target.value }))}>
              {ICON_OPTIONS.map(i => <option key={i}>{i}</option>)}
            </select>
            <input type="color" className="w-12 h-10 rounded-lg border border-white/10 bg-surface-2 cursor-pointer"
              value={newCat.color} onChange={e => setNewCat(p => ({ ...p, color: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <button onClick={addCategory} className="btn-primary text-sm py-2">Create</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm py-2">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <h3 className="font-heading font-semibold text-white">{cat.title}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => save(cat)}
                  className="p-1.5 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors">
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {cat.skills.map((skill, si) => (
                <div key={si} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <input className="flex-1 bg-surface-2 border border-white/10 rounded px-2 py-1 text-white text-xs"
                      value={skill.name} onChange={e => updateSkillName(cat.id, si, e.target.value)} />
                    <span className="font-code text-xs w-8 text-right" style={{ color: cat.color }}>{skill.level}%</span>
                    <button onClick={() => removeSkill(cat.id, si)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <input type="range" min={0} max={100} value={skill.level}
                    onChange={e => updateSkillLevel(cat.id, si, Number(e.target.value))}
                    className="w-full h-1 appearance-none rounded-full cursor-pointer"
                    style={{ accentColor: cat.color }} />
                </div>
              ))}
              <button onClick={() => addSkill(cat.id)}
                className="w-full text-xs text-gray-500 hover:text-gold border border-dashed border-white/10 hover:border-gold/30 rounded-lg py-2 transition-colors">
                + Add Skill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
