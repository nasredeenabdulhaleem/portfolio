import { useState, useEffect } from 'react'
import { collection, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import toast from 'react-hot-toast'

interface Message {
  id?: string
  name: string
  email: string
  company?: string
  projectType?: string
  message: string
  timestamp: { toDate?: () => Date } | string | null
  read?: boolean
}

function formatDate(ts: Message['timestamp']) {
  if (!ts) return '—'
  if (typeof ts === 'object' && ts !== null && 'toDate' in ts && typeof ts.toDate === 'function') {
    return ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  if (typeof ts === 'string') return new Date(ts).toLocaleDateString()
  return '—'
}

export default function MessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)))
    }, (err) => toast.error('Failed to load messages: ' + err.message))
    return unsub
  }, [])

  const toggleRead = async (msg: Message) => {
    if (!msg.id) return
    try {
      await updateDoc(doc(db, 'messages', msg.id), { read: !msg.read })
    } catch (err: unknown) {
      toast.error('Update failed: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteDoc(doc(db, 'messages', id))
      toast.success('Message deleted')
      if (selected?.id === id) setSelected(null)
    } catch (err: unknown) {
      toast.error('Delete failed: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-xl font-semibold text-white">
          Messages ({messages.length})
          {unread > 0 && <span className="ml-2 px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">{unread} unread</span>}
        </h2>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Company</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Message</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`border-b border-white/5 cursor-pointer transition ${msg.read ? 'hover:bg-white/5' : 'bg-gold/5 hover:bg-gold/10'}`}
              >
                <td className="px-4 py-3">
                  <span className={`font-medium ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.name}</span>
                  {!msg.read && <span className="ml-2 w-1.5 h-1.5 bg-gold rounded-full inline-block" />}
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{msg.email}</td>
                <td className="px-4 py-3 text-gray-400">{msg.company || '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{msg.projectType || '—'}</td>
                <td className="px-4 py-3 text-gray-500 text-xs truncate max-w-[200px]">{msg.message.slice(0, 60)}…</td>
                <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(msg.timestamp)}</td>
                <td className="px-4 py-3 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleRead(msg)}
                    className="text-xs px-2 py-1 rounded border transition text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                  >
                    {msg.read ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => msg.id && handleDelete(msg.id)}
                    className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded border border-red-500/30 hover:border-red-400/50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">No messages yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">{selected.name}</h3>
                <p className="text-gray-400 text-sm">{selected.email}</p>
                {selected.company && <p className="text-gray-500 text-xs mt-0.5">{selected.company}</p>}
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition text-xl leading-none">×</button>
            </div>
            {selected.projectType && (
              <div className="mb-3">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">{selected.projectType}</span>
              </div>
            )}
            <div className="bg-background rounded-lg p-4 text-gray-300 text-sm whitespace-pre-wrap leading-relaxed mb-4">
              {selected.message}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatDate(selected.timestamp)}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { toggleRead(selected); setSelected({ ...selected, read: !selected.read }) }}
                  className="px-3 py-1.5 rounded border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition"
                >
                  Mark as {selected.read ? 'Unread' : 'Read'}
                </button>
                <button
                  onClick={() => selected.id && handleDelete(selected.id)}
                  className="px-3 py-1.5 rounded border border-red-500/30 text-red-400 hover:border-red-400/50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
