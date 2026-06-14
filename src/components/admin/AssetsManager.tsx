import { useState, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../lib/firebase'
import toast from 'react-hot-toast'

interface UploadState {
  uploading: boolean
  url: string | null
}

export default function AssetsManager() {
  const [logo, setLogo] = useState<UploadState>({ uploading: false, url: null })
  const [cv, setCv] = useState<UploadState>({ uploading: false, url: null })
  const logoInputRef = useRef<HTMLInputElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogo({ uploading: true, url: null })
    try {
      const storageRef = ref(storage, 'assets/logo.png')
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setLogo({ uploading: false, url })
      toast.success('Logo uploaded successfully')
    } catch (err: unknown) {
      setLogo({ uploading: false, url: null })
      toast.error('Upload failed: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCv({ uploading: true, url: null })
    try {
      const storageRef = ref(storage, 'assets/resume.pdf')
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setCv({ uploading: false, url })
      toast.success('CV uploaded successfully')
    } catch (err: unknown) {
      setCv({ uploading: false, url: null })
      toast.error('Upload failed: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success('Copied to clipboard'))
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-heading text-xl font-semibold text-white mb-2">Assets Manager</h2>
        <p className="text-gray-400 text-sm">Upload logo and CV to Firebase Storage, or place files directly in the <code className="text-gold text-xs">public/</code> folder.</p>
      </div>

      <div className="glass rounded-xl p-5 border border-white/10">
        <h3 className="font-heading font-semibold text-white mb-1">Logo</h3>
        <p className="text-gray-500 text-xs mb-4">Uploads to Firebase Storage at <code className="text-gold">assets/logo.png</code></p>

        {logo.url && (
          <div className="mb-4 p-3 bg-background rounded-lg flex items-center gap-3">
            <img src={logo.url} alt="Logo preview" className="h-12 w-auto object-contain" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs truncate">{logo.url}</p>
            </div>
            <button
              onClick={() => copyToClipboard(logo.url!)}
              className="text-xs px-2 py-1 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 rounded transition whitespace-nowrap"
            >
              Copy URL
            </button>
          </div>
        )}

        <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
        <button
          onClick={() => logoInputRef.current?.click()}
          disabled={logo.uploading}
          className="btn-secondary text-sm py-2 disabled:opacity-50"
        >
          {logo.uploading ? 'Uploading...' : 'Upload Logo'}
        </button>
      </div>

      <div className="glass rounded-xl p-5 border border-white/10">
        <h3 className="font-heading font-semibold text-white mb-1">CV / Resume</h3>
        <p className="text-gray-500 text-xs mb-4">Uploads to Firebase Storage at <code className="text-gold">assets/resume.pdf</code></p>

        {cv.url && (
          <div className="mb-4 p-3 bg-background rounded-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">PDF</div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs truncate">{cv.url}</p>
            </div>
            <div className="flex gap-2">
              <a href={cv.url} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 rounded transition">View</a>
              <button
                onClick={() => copyToClipboard(cv.url!)}
                className="text-xs px-2 py-1 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 rounded transition whitespace-nowrap"
              >
                Copy URL
              </button>
            </div>
          </div>
        )}

        <input ref={cvInputRef} type="file" accept=".pdf" onChange={handleCvUpload} className="hidden" />
        <button
          onClick={() => cvInputRef.current?.click()}
          disabled={cv.uploading}
          className="btn-secondary text-sm py-2 disabled:opacity-50"
        >
          {cv.uploading ? 'Uploading...' : 'Upload CV'}
        </button>
      </div>

      <div className="glass rounded-xl p-5 border border-gold/10 bg-gold/5">
        <h3 className="font-heading font-semibold text-gold mb-2">Note: Static Files Alternative</h3>
        <p className="text-gray-400 text-sm">If Firebase Storage is not configured, you can place files directly in the <code className="text-gold">public/</code> folder:</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-500">
          <li>• <code className="text-gray-300">public/logo.svg</code> — site logo</li>
          <li>• <code className="text-gray-300">public/resume.pdf</code> — CV / resume</li>
        </ul>
        <p className="text-gray-500 text-xs mt-3">These will be served at <code className="text-gray-300">/logo.svg</code> and <code className="text-gray-300">/resume.pdf</code> respectively.</p>
      </div>
    </div>
  )
}
