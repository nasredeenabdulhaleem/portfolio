import { useState, useEffect } from 'react'
import { collection, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'
import { Trash2, Mail, MailOpen, X } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  company?: string
  projectType?: string
  message: string
  timestamp: { seconds: number } | null
  read?: boolean
}

export default function MessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() } as Message)))
    }, () => {
      setMessages([])
    })
    return unsub
  }, [])

  const toggleRead = async (msg: Message) => {
    try {
      await updateDoc(doc(db, 'messages', msg.id), { read: !msg.read })
    } catch {
      toast.error('Failed to update')
    }
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteDoc(doc(db, 'messages', id))
      toast.success('Deleted')
      if (selected?.id === id) setSelected(null)
    } catch {
      toast.error('Failed to delete')
    }
  }

  const formatDate = (ts: Message['timestamp']) => {
    if (!ts) return '—'
    return new Date(ts.seconds * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-white font-heading font-semibold text-lg">
        Contact Messages <span className="text-gray-500 font-normal text-sm">({messages.length})</span>
      </h2>

      {messages.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">No messages yet</div>
      ) : (
        <div className="space-y-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => { setSelected(msg); if (!msg.read) toggleRead(msg) }}
              className={`card cursor-pointer hover:border-gold/20 transition-all ${!msg.read ? 'border-gold/30 bg-gold/5' : ''}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {msg.read ? <MailOpen className="w-4 h-4 text-gray-500 shrink-0" /> : <Mail className="w-4 h-4 text-gold shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm text-white font-medium">{msg.name}</span>
                      {msg.company && <span className="text-gray-500 text-xs">@ {msg.company}</span>}
                    </div>
                    <p className="text-gray-400 text-xs truncate">{msg.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-gray-600 text-xs">{formatDate(msg.timestamp)}</span>
                  <button onClick={e => { e.stopPropagation(); deleteMsg(msg.id) }}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-semibold text-white">{selected.name}</h3>
                <a href={`mailto:${selected.email}`} className="text-gold text-sm hover:underline">{selected.email}</a>
                {selected.company && <p className="text-gray-500 text-xs">{selected.company}</p>}
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            {selected.projectType && (
              <div className="inline-flex px-2 py-1 glass-gold rounded-full text-gold text-xs">{selected.projectType}</div>
            )}
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            <p className="text-gray-600 text-xs">{formatDate(selected.timestamp)}</p>
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`} className="btn-primary text-sm py-2 flex-1 text-center">Reply</a>
              <button onClick={() => deleteMsg(selected.id)} className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
