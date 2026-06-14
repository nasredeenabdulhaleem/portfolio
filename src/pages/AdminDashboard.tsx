import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../lib/firebase'
import ProjectsManager from '../components/admin/ProjectsManager'
import ExperienceManager from '../components/admin/ExperienceManager'
import SkillsManager from '../components/admin/SkillsManager'
import MessagesViewer from '../components/admin/MessagesViewer'
import AssetsManager from '../components/admin/AssetsManager'

type Tab = 'projects' | 'experience' | 'skills' | 'messages' | 'assets'

const tabs: { id: Tab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'messages', label: 'Messages' },
  { id: 'assets', label: 'Assets' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate('/admin/login')
      } else {
        setUser(u)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [navigate])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gold font-heading text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-56 bg-surface border-r border-white/10 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-8 h-8"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span className="font-heading font-bold text-gold">Admin CMS</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-body text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gold/10 text-gold border border-gold/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <a
            href="/"
            className="block px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
          >
            ← View Site
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-surface border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading font-semibold text-white capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 text-sm transition-all"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'messages' && <MessagesViewer />}
          {activeTab === 'assets' && <AssetsManager />}
        </main>
      </div>
    </div>
  )
}
