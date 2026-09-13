'use client'
import { FormEvent, useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Phone, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AuthButton, AuthShell, Field } from '@/components/auth/AuthShell'

export default function LoginPage(){
 const router=useRouter(); const [phone,setPhone]=useState(''); const [password,setPassword]=useState(''); const [show,setShow]=useState(false); const [error,setError]=useState('')
 function submit(e:FormEvent){e.preventDefault(); if(!phone||!password){setError('أدخل رقم الهاتف وكلمة المرور للمتابعة');return} router.push('/auth/verify?next=/passenger')}
 return <AuthShell title="مرحبًا بك من جديد" subtitle="سجّل دخولك لمتابعة رحلتك مع تك توكي" step={1}><form className="auth-form" onSubmit={submit}>
  <Field label="رقم الهاتف" english="Phone Number" icon={<Phone size={20}/>} value={phone} onChange={setPhone} placeholder="01XXXXXXXXX" error={!phone&&error?'رقم الهاتف مطلوب':''} required/>
  <label className="auth-field"><span className="auth-field-icon"><LockKeyhole size={20}/></span><span className="auth-field-copy"><span>كلمة المرور</span><small>Password</small><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" /></span><button type="button" className="auth-field-icon" onClick={()=>setShow(!show)} aria-label={show?'إخفاء كلمة المرور':'إظهار كلمة المرور'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></label>
  <div className="auth-link-row"><label className="auth-check"><input type="checkbox"/> تذكرني</label><button type="button" className="auth-link" onClick={()=>router.push('/auth/forgot-password')}>نسيت كلمة المرور؟</button></div>
  {error&&<p className="auth-note" role="alert" style={{color:'#ff7777'}}>{error}</p>}<AuthButton>تسجيل الدخول <ArrowLeft size={18}/></AuthButton>
 </form><div className="auth-divider">أو سجّل باستخدام</div><div className="social-row"><button className="social-button" type="button">Google</button><button className="social-button" type="button">Facebook</button><button className="social-button" type="button">Apple</button></div><p className="auth-switch">ليس لديك حساب؟ <button onClick={()=>router.push('/auth/register')}>إنشاء حساب جديد</button></p></AuthShell>
}
