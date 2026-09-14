'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, CarFront, Check, CircleDollarSign, Clock3, MapPin, Navigation, Phone, Star, ToggleRight, TrendingUp, X } from 'lucide-react'
import { mockDrivers, mockPassengers } from '@/lib/mockData'

const Map = dynamic(() => import('@/components/Map/LeafletMap').then((m) => m.LeafletMap), { ssr: false, loading: () => <div className="driver-map-loading">جاري تحميل الخريطة...</div> })

type RideStage = 'request' | 'accepted' | 'started' | 'completed'

export default function DriverPage() {
  const router = useRouter()
  const [online, setOnline] = useState(true)
  const [stage, setStage] = useState<RideStage>('request')
  const driver = mockDrivers[0]
  const passenger = mockPassengers[0]
  const stageCopy = {
    request: { title: 'طلب رحلة جديد', subtitle: 'طلب قريب من موقعك الآن', action: 'قبول الطلب' },
    accepted: { title: 'الرحلة مقبولة', subtitle: 'توجه إلى موقع الراكب', action: 'وصلت إلى الراكب' },
    started: { title: 'رحلة نشطة', subtitle: 'أوصل الراكب إلى الوجهة', action: 'إنهاء الرحلة' },
    completed: { title: 'اكتملت الرحلة', subtitle: 'تمت إضافة الأجرة إلى أرباحك', action: 'عرض الرحلات' },
  }[stage]
  const stats = useMemo(() => [
    { label: 'أرباح اليوم', value: stage === 'completed' ? '605.00 ر.س' : '580.00 ر.س', icon: CircleDollarSign, tone: 'green' },
    { label: 'رحلات اليوم', value: stage === 'completed' ? '13 رحلة' : '12 رحلة', icon: Navigation, tone: 'gold' },
    { label: 'ساعات العمل', value: '6 س 25 د', icon: Clock3, tone: 'blue' },
    { label: 'تقييمك', value: '4.9 / 5', icon: Star, tone: 'orange' },
  ], [stage])

  return <main className="driver-app" dir="rtl">
    <header className="driver-header"><div className="driver-brand"><span><CarFront size={21} /></span><div><strong>تك توكي</strong><small>لوحة السائق</small></div></div><div className="driver-header-actions"><button className="driver-icon-button" aria-label="الإشعارات" onClick={() => router.push('/notifications')}><Bell size={19} /><i>3</i></button><div className="driver-avatar"><img src={driver.avatar} alt={driver.name} /><span>{driver.name}</span></div></div></header>
    <div className="driver-container"><div className="driver-welcome"><div><p>الأربعاء، 03 سبتمبر 2026</p><h1>مرحباً، {driver.name.split(' ')[0]}</h1><span>جاهز لرحلتك التالية؟</span></div><button className={`driver-status ${online ? 'is-online' : ''}`} onClick={() => setOnline(!online)}><span />{online ? 'أنت متصل الآن' : 'أنت غير متصل'}<ToggleRight size={22} /></button></div>
      <section className="driver-stat-grid">{stats.map(({ label, value, icon: Icon, tone }) => <article className="driver-stat" key={label}><Icon className={`tone-${tone}`} size={21} /><small>{label}</small><strong>{value}</strong></article>)}</section>
      <div className="driver-layout"><section className="driver-map-card"><div className="driver-card-heading"><div><h2>منطقة العمل</h2><p>موقعك والطلبات القريبة</p></div><span className="driver-live"><b /> مباشر</span></div><div className="driver-map"><Map center={driver.currentLocation} drivers={online ? mockDrivers : []} /></div><div className="driver-map-footer"><span><MapPin size={16} /> حي النخيل، الرياض</span><span>3 طلبات قريبة</span></div></section>
        <aside className="driver-side"><section className="driver-request-card"><div className="driver-card-heading"><div><h2>{stageCopy.title}</h2><p>{stageCopy.subtitle}</p></div><span className={`request-badge ${stage === 'completed' ? 'done' : ''}`}>{stage === 'completed' ? 'مكتمل' : 'جديد'}</span></div>{stage === 'request' && <div className="driver-request-top"><img src={passenger.avatar} alt={passenger.name} /><div><strong>{passenger.name}</strong><small><Star size={12} fill="currentColor" /> 4.8 · راكب موثوق</small></div><b>25 ر.س</b></div>}{stage !== 'request' && <div className="driver-progress"><span className="progress-icon"><Check size={17} /></span><div><strong>{stage === 'accepted' ? 'في الطريق إلى الراكب' : stage === 'started' ? 'الرحلة جارية' : 'تم تحويل الأجرة'}</strong><small>{stageCopy.subtitle}</small></div></div>}<div className="driver-route"><p><span className="route-dot pickup" />حي النخيل، شارع الملك فهد</p><p><span className="route-dot dropoff" />مركز الرياض التجاري</p></div>{stage === 'request' && <div className="driver-request-meta"><span>12.5 كم</span><span>18 دقيقة</span><span><Star size={12} fill="currentColor" /> 4.9</span></div>}<div className="driver-action-row">{stage === 'request' && <button className="driver-dismiss" onClick={() => setStage('completed')} aria-label="رفض الطلب"><X size={18} /></button>}{stage !== 'completed' && <button className="driver-primary" onClick={() => setStage(stage === 'request' ? 'accepted' : stage === 'accepted' ? 'started' : 'completed')}>{stageCopy.action}<Navigation size={16} /></button>}{stage === 'completed' && <button className="driver-primary" onClick={() => setStage('request')}>طلب جديد <Navigation size={16} /></button>}</div>{stage === 'accepted' && <button className="driver-call"><Phone size={15} /> الاتصال بالراكب</button>}</section>
          <section className="driver-earnings-card"><div className="driver-card-heading"><div><h2>أداء هذا الأسبوع</h2><p>مقارنة بمتوسطك السابق</p></div><TrendingUp className="tone-green" size={19} /></div><div className="driver-bars">{[35,55,42,75,60,88,70].map((height, i) => <div key={i} className="driver-bar-wrap"><span style={{ height: `${height}%` }} /><small>{['س','ح','ن','ث','ر','خ','ج'][i]}</small></div>)}</div><div className="driver-earning-summary"><span>إجمالي الأسبوع <b>3,240 ر.س</b></span><span>+18.4%</span></div></section></aside>
      </div>
      <section className="driver-history"><div className="driver-card-heading"><div><h2>رحلات اليوم</h2><p>آخر الرحلات المكتملة</p></div><button>عرض الكل</button></div><div className="driver-history-row"><span className="history-icon"><Check size={16} /></span><div><strong>رحلة أحمد محمد</strong><small>حي النخيل ← مركز الرياض التجاري</small></div><b>25 ر.س</b></div><div className="driver-history-row"><span className="history-icon"><Check size={16} /></span><div><strong>رحلة فاطمة علي</strong><small>الملز ← طريق الملك فهد</small></div><b>32 ر.س</b></div></section>
    </div>
  </main>
}
