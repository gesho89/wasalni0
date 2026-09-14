'use client'
import { FormEvent, useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AuthButton, AuthShell, Field } from '@/components/auth/AuthShell'
import { authClient } from '@/lib/auth-client'

export default function LoginPage() {
  const router = useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [show,setShow]=useState(false); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  async function submit(e:FormEvent) { e.preventDefault(); setError(''); if (!email || !password) { setError('أدخل البريد الإلكتروني وكلمة المرور'); return } setLoading(true); const result=await authClient.signIn.email({ email, password }); setLoading(false); if (result.error) { setError('تعذر تسجيل الدخول. تحقق من البيانات وحاول مرة أخرى.'); return } router.push('/passenger'); router.refresh() }
  return <AuthShell title="مرحبًا بك من جديد" subtitle="سجّل دخولك لمتابعة رحلتك مع تك توكي" step={1}><form className="auth-form" onSubmit={submit}><Field label="البريد الإلكتروني" english="Email" icon={<Mail size={20}/>} value={email} onChange={setEmail} placeholder="name@example.com" type="email" required/><label className="auth-field"><span className="auth-field-icon"><LockKeyhole size={20}/></span><span className="auth-field-copy"><span>كلمة المرور</span><small>Password</small><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required /></span><button type="button" className="auth-field-icon" onClick={()=>setShow(!show)} aria-label={show?'إخفاء كلمة المرور':'إظهار كلمة المرور'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></label><div className="auth-link-row"><span/><button type="button" className="auth-link">نسيت كلمة المرور؟</button></div>{error&&<p className="auth-note" role="alert" style={{color:'#ff7777'}}>{error}</p>}<AuthButton disabled={loading}>{loading?'جار تسجيل الدخول...':<>تسجيل الدخول <ArrowLeft size={18}/></>}</AuthButton></form><p className="auth-switch">ليس لديك حساب؟ <button onClick={()=>router.push('/auth/register')}>إنشاء حساب جديد</button></p></AuthShell>
}
