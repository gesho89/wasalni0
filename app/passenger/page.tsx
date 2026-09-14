'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, CarFront, Clock3, Home, MapPin, Menu, Navigation, Package, Search, ShieldCheck, Star, UserRound, WalletCards, Bike, ChevronLeft, LocateFixed, MessageCircle } from 'lucide-react'
import { mockDrivers, mockPassengers, mockServices } from '@/lib/mockData'

const Map = dynamic(() => import('@/components/Map/LeafletMap').then((m) => m.LeafletMap), { ssr: false, loading: () => <div className="h-full grid place-items-center bg-[#111920] text-[#b5b7b8]">جاري تحميل الخريطة...</div> })

export default function PassengerPage() {
  const router = useRouter()
  const passenger = mockPassengers[0]
  const [service, setService] = useState('ride')
  const [destination, setDestination] = useState('')
  const [requested, setRequested] = useState(false)
  const services = [{ ...mockServices[0], icon: CarFront, label: 'تك توك عادي' }, { ...mockServices[1], icon: Package, label: 'تك توك مشترك' }, { ...mockServices[2], icon: Bike, label: 'تك توك VIP' }]

  return <main className="passenger-app">
    <header className="passenger-header"><button className="icon-button mobile-only" aria-label="القائمة"><Menu size={21}/></button><div className="brand-lockup"><div className="brand-mark"><CarFront size={22}/></div><div><strong>تك توكي</strong><small>TUKTUKY</small></div></div><nav className="passenger-nav"><button className="active"><Home size={16}/>الرئيسية</button><button onClick={() => router.push('/passenger/rides')}><Clock3 size={16}/>رحلاتي</button><button onClick={() => router.push('/messages')}><MessageCircle size={16}/>الرسائل</button><button onClick={() => router.push('/passenger/wallet')}><WalletCards size={16}/>المحفظة</button></nav><div className="passenger-actions"><button className="icon-button" aria-label="الإشعارات" onClick={() => router.push('/notifications')}><Bell size={19}/><i>3</i></button><button className="passenger-profile" onClick={() => router.push('/passenger/rides')}><span>{passenger.name}</span><div className="avatar"><UserRound size={17}/></div></button></div></header>

    <section className="passenger-canvas"><div className="map-layer"><Map drivers={mockDrivers}/><div className="map-location"><LocateFixed size={18}/><span>موقعك الحالي</span></div></div>
      <div className="ride-panel">{!requested ? <><div className="panel-eyebrow">أهلاً {passenger.name.split(' ')[0]}</div><h1>إلى أين تريد الذهاب؟</h1><p className="panel-subtitle">اطلب تك توكك بسهولة وأمان</p><div className="location-stack"><label><span className="location-dot pickup"/><span><small>موقع الانطلاق</small><b>حي النخيل، الرياض</b></span><LocateFixed size={17}/></label><div className="route-dash"/><label className="destination-field"><MapPin size={18}/><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="إلى أين تريد الذهاب؟"/><Search size={17}/></label></div><div className="saved-places"><button><Home size={16}/><span>المنزل<small>حي النخيل</small></span></button><button><MapPin size={16}/><span>العمل<small>وسط الرياض</small></span></button><button><span>+</span><span>إضافة مكان</span></button></div><div className="panel-section-title"><b>اختر نوع الرحلة</b><span>الأسعار تقديرية</span></div><div className="service-grid">{services.map((item) => { const Icon = item.icon; return <button key={item.type} onClick={() => setService(item.type)} className={service === item.type ? 'selected' : ''}><Icon size={26}/><b>{item.label}</b><small>من {item.basePrice} ج.م</small></button>})}</div><button className="gold-button" onClick={() => setRequested(true)}>اطلب تك توك الآن <ChevronLeft size={18}/></button></> : <><button className="back-link" onClick={() => setRequested(false)}><ChevronLeft size={17}/> تعديل الطلب</button><div className="panel-eyebrow">أفضل سائقين بالقرب منك</div><h1>اختر سائقك</h1><p className="panel-subtitle">وصلنا إلى {mockDrivers.length} سائقين متاحين الآن</p><div className="driver-list">{mockDrivers.map((driver) => <button key={driver.id} className="driver-card" onClick={() => router.push('/passenger/ride-details')}><img src={driver.avatar} alt={driver.name}/><span className="driver-copy"><b>{driver.name}</b><small>{driver.carModel} · {driver.carColor}</small><em><Star size={12} fill="currentColor"/> {driver.rating} · يصل خلال {driver.id === 'd1' ? 3 : driver.id === 'd2' ? 5 : 7} دقائق</em></span><strong>{driver.id === 'd1' ? '22' : driver.id === 'd2' ? '18' : '25'} ج.م</strong></button>)}</div></>}</div>
      <div className="trust-card"><ShieldCheck size={21}/><span><b>رحلتك آمنة معنا</b><small>سائقون موثقون وتقييمات حقيقية</small></span><Star size={17} fill="currentColor"/></div>
    </section><footer className="passenger-bottom-nav"><button className="active"><Home size={19}/>الرئيسية</button><button onClick={() => router.push('/passenger/rides')}><Clock3 size={19}/>رحلاتي</button><button onClick={() => setRequested(true)} className="center-action"><CarFront size={24}/>اطلب الآن</button><button onClick={() => router.push('/passenger/wallet')}><WalletCards size={19}/>المحفظة</button><button><UserRound size={19}/>حسابي</button></footer>
  </main>
}
