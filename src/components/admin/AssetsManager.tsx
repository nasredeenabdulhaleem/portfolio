import { useState, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../lib/firebase'
import toast from 'react-hot-toast'
import { Upload, Copy, Image, FileText, CheckCircle } from 'lucide-react'

export default function AssetsManager() {
  const [logoUrl, setLogoUrl] = useState('')
  const [cvUrl, setCvUrl] = useState('')
  const [uploading, setUploading] = useState<'logo' | 'cv' | null>(null)
  const logoRef = useRef<HTMLInputElement>(null)
  const cvRef = useRef<HTMLInputElement>(null)

  const upload = async (file: File, path: string, type: 'logo' | 'cv') => {
    setUploading(type)
    try {
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      if (type === 'logo') setLogoUrl(url)
      else setCvUrl(url)
      toast.success(`${type === 'logo' ? 'Logo' : 'CV'} uploaded! Update the src in your code.`)
    } catch {
      toast.error('Upload failed — Firebase Storage may not be configured')
    } finally {
      setUploading(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-white font-heading font-semibold text-lg">Assets</h2>

      <div className="card space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Image className="w-4 h-4 text-gold" />
          <h3 className="font-heading font-semibold text-white">Logo</h3>
        </div>
        <p className="text-gray-500 text-sm">Current logo: <code className="text-gold">/logo.svg</code> (in public/)</p>
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Current logo" className="w-16 h-16 object-contain bg-surface-2 rounded-lg p-1" />
          <div className="text-gray-400 text-xs leading-relaxed">
            To replace the logo, either:<br />
            1. Upload a new file to Firebase Storage below, or<br />
            2. Replace <code className="text-gold">public/logo.svg</code> in the repository
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input ref={logoRef} type="file" accept="image/*" className="hidden"
            onChange={e => e.target.files?.[0] && upload(e.target.files[0], 'assets/logo.png', 'logo')} />
          <button onClick={() => logoRef.current?.click()} disabled={uploading === 'logo'}
            className="btn-secondary flex items-center gap-2 text-sm py-2">
            <Upload className="w-4 h-4" />
            {uploading === 'logo' ? 'Uploading…' : 'Upload to Storage'}
          </button>
          {logoUrl && (
            <button onClick={() => copyToClipboard(logoUrl)}
              className="flex items-center gap-1.5 text-gold text-sm hover:underline">
              <Copy className="w-3.5 h-3.5" /> Copy URL
            </button>
          )}
        </div>
        {logoUrl && (
          <div className="flex items-center gap-2 p-2 bg-surface-2 rounded-lg">
            <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />
            <code className="text-xs text-gray-300 truncate">{logoUrl}</code>
          </div>
        )}
      </div>

      <div className="card space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-gold" />
          <h3 className="font-heading font-semibold text-white">Resume / CV</h3>
        </div>
        <p className="text-gray-500 text-sm">Current CV: <code className="text-gold">/Abdulhaleem_Nasredeen_Resume.pdf</code> (in public/)</p>
        <div className="flex items-center gap-3">
          <a href="/Abdulhaleem_Nasredeen_Resume.pdf" target="_blank"
            className="btn-secondary flex items-center gap-2 text-sm py-2">
            <FileText className="w-4 h-4" /> View Current CV
          </a>
          <input ref={cvRef} type="file" accept=".pdf" className="hidden"
            onChange={e => e.target.files?.[0] && upload(e.target.files[0], 'assets/resume.pdf', 'cv')} />
          <button onClick={() => cvRef.current?.click()} disabled={uploading === 'cv'}
            className="btn-secondary flex items-center gap-2 text-sm py-2">
            <Upload className="w-4 h-4" />
            {uploading === 'cv' ? 'Uploading…' : 'Upload New CV'}
          </button>
        </div>
        {cvUrl && (
          <div className="flex items-center gap-2 p-2 bg-surface-2 rounded-lg">
            <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />
            <code className="text-xs text-gray-300 truncate">{cvUrl}</code>
            <button onClick={() => copyToClipboard(cvUrl)} className="shrink-0 text-gold">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="card bg-gold/5 border-gold/20">
        <h3 className="font-heading font-semibold text-gold mb-2">Firebase Storage Setup</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          To enable file uploads, configure Firebase Storage in your project and add the <code className="text-gold">VITE_FIREBASE_STORAGE_BUCKET</code> env variable.
          Set Storage rules to allow authenticated writes:
        </p>
        <pre className="mt-3 p-3 bg-surface-2 rounded-lg text-xs text-gray-300 overflow-auto">{`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /assets/{file} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}</pre>
      </div>
    </div>
  )
}
