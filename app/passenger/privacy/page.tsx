"use client"

import { useState } from "react"
import { ArrowRight, ChevronLeft, Eye, Info, MapPin, ShieldCheck, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacyPage() {
  const router = useRouter()
  const [location, setLocation] = useState(true)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [saved, setSaved] = useState(false)
  const toggle = (value: boolean, setValue: (value: boolean) => void) => { setValue(!value); setSaved(false) }
  return <main className="account-page"><header className="account-header"><button className="account-back" onClick={() => router.back()} aria-label="العودة"><ArrowRight size={19} /></button><div><span>حسابي</span><h1>الخصوصية</h1></div><span className="account-shield"><ShieldCheck size={20} /></span></header><section className="account-content"><div className="account-hero privacy-hero"><div className="hero-icon"><Eye size={26} /></div><div><h2>بياناتك تحت سيطرتك</h2><p>نستخدم بياناتك لتقديم تجربة آمنة ومناسبة لك فقط.</p></div></div><section className="account-section"><div className="section-label"><MapPin size={16} /><span>مشاركة الموقع</span></div><div className="privacy-setting"><span className="row-icon location"><MapPin size={17} /></span><span><b>الموقع أثناء الرحلة</b><small>يساعد السائق على الوصول إليك وتتبع رحلتك</small></span><button className={`toggle ${location ? "on" : ""}`} onClick={() => toggle(location, setLocation)} aria-label="الموقع أثناء الرحلة"><i /></button></div><div className="info-note"><Info size={15} /><span>لا تتم مشاركة موقعك إلا أثناء الرحلة النشطة.</span></div></section><section className="account-section"><div className="section-label"><Eye size={16} /><span>استخدام البيانات</span></div><div className="privacy-setting"><span className="row-icon"><Eye size={17} /></span><span><b>تحسين تجربة TukTuky</b><small>بيانات مجهّلة لتحسين الخرائط والخدمات</small></span><button className={`toggle ${analytics ? "on" : ""}`} onClick={() => toggle(analytics, setAnalytics)} aria-label="تحسين التجربة"><i /></button></div><div className="privacy-setting"><span className="row-icon"><ShieldCheck size={17} /></span><span><b>العروض والتحديثات</b><small>استقبل عروضًا مخصصة وتحديثات الخدمة</small></span><button className={`toggle ${marketing ? "on" : ""}`} onClick={() => toggle(marketing, setMarketing)} aria-label="العروض والتحديثات"><i /></button></div></section><button className="save-settings" onClick={() => setSaved(true)}>{saved ? "تم حفظ تفضيلاتك" : "حفظ التفضيلات"}</button><div className="danger-zone"><Trash2 size={17} /><span><b>حذف بيانات الحساب</b><small>سيتم حذف بياناتك بعد تأكيد الطلب. هذا الإجراء لا يمكن التراجع عنه.</small></span><ChevronLeft size={17} /></div></section></main>
}
