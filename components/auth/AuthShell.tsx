'use client'

import { ReactNode } from 'react'
import { ArrowRight, CarFront, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AuthShell({ children, title, subtitle, step = 1, back = true }: { children: ReactNode; title: string; subtitle: string; step?: number; back?: boolean }) {
  const router = useRouter()
  return (
    <main className="auth-page" dir="rtl">
      <div className="auth-glow" aria-hidden="true" />
      <div className="auth-shell">
        <header className="auth-header">
          {back ? <button className="auth-back" onClick={() => router.back()} aria-label="رجوع"><ArrowRight size={20} /></button> : <span className="auth-spacer" />}
          <button className="auth-brand" onClick={() => router.push('/')} aria-label="العودة للرئيسية"><span className="auth-brand-mark"><CarFront size={20} /></span><span><strong>تك توكي</strong><small>TukTuky</small></span></button>
          <span className="auth-lang">EN</span>
        </header>
        <div className="auth-progress" aria-label={`الخطوة ${step} من 3`}><span style={{ width: `${Math.min(step / 3 * 100, 100)}%` }} /></div>
        <section className="auth-card"><div className="auth-heading"><span className="auth-kicker">خطوة بسيطة وتبدأ رحلتك</span><h1>{title}</h1><p>{subtitle}</p></div>{children}</section>
        <footer className="auth-footer"><ShieldCheck size={15} /> بياناتك محمية وآمنة معنا</footer>
      </div>
    </main>
  )
}

export function Field({ label, english, icon, type = 'text', value, onChange, placeholder, error, required = false }: { label: string; english: string; icon: ReactNode; type?: string; value: string; onChange: (value: string) => void; placeholder?: string; error?: string; required?: boolean }) {
  return <label className="auth-field"><span className="auth-field-icon">{icon}</span><span className="auth-field-copy"><span>{label}{required && <b> *</b>}</span><small>{english}</small><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} /></span>{error && <em className="auth-error">{error}</em>}</label>
}

export function AuthButton({ children, type = 'submit', disabled = false }: { children: ReactNode; type?: 'button' | 'submit'; disabled?: boolean }) { return <button className="auth-submit" type={type} disabled={disabled}>{children}</button> }
