"use client"

import { useState } from "react"
import { ArrowRight, Check, ChevronLeft, KeyRound, LockKeyhole, ShieldCheck, Smartphone, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"

const sessions = [
  { device: "هذا الجهاز", browser: "Chrome على Android", location: "الرياض، السعودية", current: true },
  { device: "iPhone 14", browser: "Safari على iOS", location: "الرياض، السعودية", current: false },
]

export default function SecurityPage() {
  const router = useRouter()
  const [twoFactor, setTwoFactor] = useState(false)
  const [biometric, setBiometric] = useState(true)
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  return (
    <main className="account-page">
      <header className="account-header">
        <button className="account-back" onClick={() => router.back()} aria-label="العودة"><ArrowRight size={19} /></button>
        <div><span>حسابي</span><h1>الأمان</h1></div>
        <span className="account-shield"><ShieldCheck size={20} /></span>
      </header>
      <section className="account-content">
        <div className="account-hero security-hero"><div className="hero-icon"><LockKeyhole size={26} /></div><div><h2>حافظ على حسابك آمنًا</h2><p>تحكم في إعدادات الدخول والأجهزة المرتبطة بحسابك.</p></div></div>
        <section className="account-section"><div className="section-label"><KeyRound size={16} /><span>تسجيل الدخول</span></div>
          <button className="account-row" onClick={() => setPasswordUpdated(true)}><span className="row-icon"><KeyRound size={17} /></span><span><b>تغيير كلمة المرور</b><small>{passwordUpdated ? "تم تحديث كلمة المرور بنجاح" : "آخر تغيير منذ 3 أشهر"}</small></span><ChevronLeft size={17} /></button>
          <button className="account-row"><span className="row-icon"><Smartphone size={17} /></span><span><b>التحقق بخطوتين</b><small>أضف طبقة حماية إضافية لحسابك</small></span><button className={`toggle ${twoFactor ? "on" : ""}`} onClick={(event) => { event.stopPropagation(); setTwoFactor(!twoFactor) }} aria-label="التحقق بخطوتين"><i /></button></button>
          <button className="account-row"><span className="row-icon"><UserRound size={17} /></span><span><b>الدخول بالبصمة</b><small>{biometric ? "مفعّل على هذا الجهاز" : "غير مفعّل"}</small></span><button className={`toggle ${biometric ? "on" : ""}`} onClick={(event) => { event.stopPropagation(); setBiometric(!biometric) }} aria-label="الدخول بالبصمة"><i /></button></button>
        </section>
        <section className="account-section"><div className="section-label"><Smartphone size={16} /><span>الأجهزة والجلسات</span></div>{sessions.map((session) => <div className="session-row" key={session.device}><span className="session-icon"><Smartphone size={18} /></span><span><b>{session.device}{session.current && <em>الجلسة الحالية</em>}</b><small>{session.browser} · {session.location}</small></span>{session.current ? <Check size={17} className="success-check" /> : <button className="text-danger">تسجيل الخروج</button>}</div>)}</section>
        <div className="privacy-link" onClick={() => router.push("/passenger/privacy")}><ShieldCheck size={18} /><span><b>إعدادات الخصوصية</b><small>تحكم في بياناتك ومشاركة موقعك</small></span><ChevronLeft size={17} /></div>
      </section>
    </main>
  )
}
