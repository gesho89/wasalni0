'use client'
import { FormEvent, useState } from 'react'
import { Mail, Phone, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AuthButton, AuthShell, Field } from '@/components/auth/AuthShell'
export default function ForgotPasswordPage(){const router=useRouter();const [value,setValue]=useState('');const [sent,setSent]=useState(false);function submit(e:FormEvent){e.preventDefault();if(value)setSent(true)}return <AuthShell title="استعادة كلمة المرور" subtitle="أدخل رقم هاتفك أو بريدك لإرسال رمز الاستعادة" step={1}><form className="auth-form" onSubmit={submit}><Field label="رقم الهاتف أو البريد" english="Phone or Email" icon={value.includes('@')?<Mail size={20}/>:<Phone size={20}/>} value={value} onChange={setValue} placeholder="01XXXXXXXXX أو name@example.com" required/><AuthButton>إرسال رمز الاستعادة <ArrowLeft size={18}/></AuthButton>{sent&&<p className="auth-note" style={{color:'#72d996'}}>تم الإرسال. تحقق من هاتفك للمتابعة.</p>}</form><p className="auth-switch"><button onClick={()=>router.push('/auth/login')}>العودة لتسجيل الدخول</button></p></AuthShell>}
