'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import { ArrowLeft, Bell, CarFront, ChevronLeft, MapPin, Menu, ShieldCheck, WalletCards, Wrench } from 'lucide-react'

const roles = [
  { label: 'راكب', english: 'Passenger', icon: CarFront, description: 'اطلب تك توك بأمان', tone: 'gold' },
  { label: 'سائق', english: 'Driver', icon: Wrench, description: 'ابدأ مشاويرك واربح', tone: 'dark' },
  { label: 'متجر', english: 'Shop Owner', icon: WalletCards, description: 'وصّل طلبات متجرك', tone: 'dark' },
]

export default function Page() {
  const router = useRouter()
  const { loginAsPassenger, loginAsDriver, loginAsAdmin } = useApp()

  return (
    <main className="min-h-screen overflow-hidden bg-[#080a0b] text-white">
      <div className="tuktuky-shell relative min-h-screen">
        <div className="gold-dust absolute inset-0" aria-hidden="true" />
        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <button aria-label="فتح القائمة" className="icon-button"><Menu size={22} /></button>
          <div className="brand-lockup">
            <div className="brand-mark"><CarFront size={25} strokeWidth={2.4} /></div>
            <div><div className="brand-ar">تك توكي</div><div className="brand-en">TukTuky</div></div>
          </div>
          <button aria-label="الإشعارات" className="icon-button relative"><Bell size={21} /><span className="notification-dot">3</span></button>
        </header>

        <section className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-10 px-5 pb-10 pt-4 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pt-0" dir="rtl">
          <div className="order-2 lg:order-1">
            <div className="eyebrow"><span /> تجربة تك توكي <span /></div>
            <h1 className="hero-title">رحلتك أسهل،<br /><strong>أسرع وأكثر أمانًا.</strong></h1>
            <p className="hero-copy">اطلب تك توكك في ثواني، وتابع رحلتك لحظة بلحظة مع تجربة مصممة لك.</p>
            <div className="hero-actions">
              <button onClick={() => router.push('/auth/register')} className="primary-cta">ابدأ رحلتك الآن <ArrowLeft size={19} /></button>
              <button onClick={() => router.push('/auth/login')} className="secondary-cta">تسجيل الدخول <ChevronLeft size={17} /></button>
            </div>
            <div className="trust-row"><ShieldCheck size={17} /><span>سائقون موثوقون</span><span className="trust-divider" /><MapPin size={17} /><span>متاح في كل مكان</span></div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="hero-visual">
              <div className="city-glow" />
              <div className="route-line route-one" /><div className="route-line route-two" />
              <div className="hero-tuk"><div className="tuk-roof" /><div className="tuk-cabin"><span /><span /></div><div className="tuk-wheel wheel-left" /><div className="tuk-wheel wheel-right" /><div className="tuk-lamp" /></div>
              <div className="floating-card floating-card-top"><span className="status-pulse" /> السائقون متاحون الآن</div>
              <div className="floating-card floating-card-bottom"><MapPin size={15} /> رحلتك تبدأ من هنا</div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-12">
          <div className="section-heading"><div><span className="section-kicker">كل ما تحتاجه</span><h2>خدماتك في مكان واحد</h2></div><span className="section-line" /></div>
          <div className="service-grid">
            <button onClick={() => router.push('/auth/register')} className="service-card service-card-featured"><CarFront size={27} /><span>طلب تك توك</span><small>Request TukTuky</small></button>
            <button onClick={() => router.push('/passenger')} className="service-card"><MapPin size={27} /><span>الخريطة</span><small>Map</small></button>
            <button onClick={() => router.push('/passenger/rides')} className="service-card"><WalletCards size={27} /><span>رحلاتي</span><small>My Rides</small></button>
            <button onClick={() => router.push('/admin')} className="service-card"><ShieldCheck size={27} /><span>الأمان والدعم</span><small>Safety & Support</small></button>
          </div>
          <div className="roles-strip"><div><span className="section-kicker">انضم إلى مجتمعنا</span><h2>اختر تجربتك</h2></div><div className="roles-grid">{roles.map(({ label, english, icon: Icon, description, tone }) => <button key={label} onClick={() => { if (label === 'راكب') { loginAsPassenger('p1'); router.push('/passenger') } else if (label === 'سائق') { loginAsDriver('d1'); router.push('/driver') } else router.push('/admin') }} className={`role-card role-${tone}`}><Icon size={20} /><strong>{label}</strong><small>{english}</small><em>{description}</em></button>)}</div></div>
          <p className="footer-note">تك توكي — أقرب لك دائمًا</p>
        </section>
      </div>
    </main>
  )
}
