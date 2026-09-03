'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Car, Clock3, MapPin, Menu, Navigation, Package, Search, Star, UserRound, Bike, ChevronLeft } from 'lucide-react'
import { mockDrivers, mockServices } from '@/lib/mockData'

const Map = dynamic(() => import('@/components/Map/LeafletMap').then((m) => m.LeafletMap), { ssr: false, loading: () => <div className="h-full bg-[#dbe8e5] flex items-center justify-center text-muted-foreground">جاري تحميل الخريطة...</div> })

export default function PassengerPage() {
  const router = useRouter()
  const [service, setService] = useState('ride')
  const [destination, setDestination] = useState('')
  const [requested, setRequested] = useState(false)
  const services = [{ ...mockServices[0], icon: Car }, { ...mockServices[1], icon: Package }, { ...mockServices[2], icon: Bike }]

  return (
    <main className="min-h-screen bg-background">
      <header className="h-20 bg-card border-b flex items-center justify-between px-5 lg:px-10 sticky top-0 z-20">
        <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center"><Car className="text-primary-foreground" size={24} /></div><div><p className="font-bold text-xl text-primary">وصلني</p><p className="text-xs text-muted-foreground">رحلتك تبدأ هنا</p></div></div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium"><span className="text-primary border-b-2 border-primary py-7">الرئيسية</span><button onClick={() => router.push('/passenger/rides')}>رحلاتي</button><button>المحفظة</button><button>المساعدة</button></div>
        <div className="flex items-center gap-3"><button className="p-2 rounded-lg hover:bg-secondary"><Bell size={20}/></button><div className="hidden sm:flex items-center gap-2 border-r pr-3"><div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"><UserRound size={18}/></div><span className="font-semibold">أحمد محمد</span></div><button className="md:hidden"><Menu/></button></div>
      </header>

      <section className="relative h-[calc(100vh-5rem)] min-h-[650px] overflow-hidden">
        <div className="absolute inset-0"><Map drivers={mockDrivers} /></div>
        <div className="absolute inset-y-0 right-0 w-full sm:w-[430px] lg:w-[470px] p-4 lg:p-7 z-10 pointer-events-none">
          <div className="bg-card rounded-2xl shadow-2xl p-5 pointer-events-auto animate-rise">
            {!requested ? <>
              <div className="flex items-center justify-between mb-5"><div><h1 className="text-2xl font-bold">إلى أين تريد الذهاب؟</h1><p className="text-muted-foreground text-sm mt-1">اختر وجهتك وسنوصلك بأفضل سائق</p></div><div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center"><Navigation className="text-yellow-600" /></div></div>
              <div className="space-y-3 mb-6"><label className="flex items-center gap-3 p-3 rounded-xl bg-secondary"><div className="w-3 h-3 rounded-full bg-primary ring-4 ring-blue-100"/><input className="bg-transparent outline-none w-full text-sm" placeholder="موقع الانطلاق: حي النخيل" /></label><div className="mr-6 h-5 border-r-2 border-dashed border-primary/30"/><label className="flex items-center gap-3 p-3 rounded-xl border bg-card"><MapPin className="text-yellow-600" size={18}/><input value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-transparent outline-none w-full text-sm" placeholder="إلى أين؟" /></label></div>
              <h2 className="font-bold mb-3">اختر نوع الخدمة</h2><div className="grid grid-cols-3 gap-2 mb-6">{services.map((item) => { const Icon = item.icon; return <button key={item.type} onClick={() => setService(item.type)} className={`p-3 rounded-xl border text-center transition ${service === item.type ? 'border-primary bg-blue-50 text-primary' : 'hover:bg-secondary'}`}><Icon className="mx-auto mb-1" size={23}/><span className="text-xs font-medium">{item.name}</span><span className="block text-[11px] text-muted-foreground mt-1">من {item.basePrice} ر.س</span></button> })}</div>
              <button onClick={() => setRequested(true)} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition">عرض السائقين القريبين</button>
            </> : <>
              <button onClick={() => setRequested(false)} className="flex items-center gap-2 text-muted-foreground text-sm mb-4"><ChevronLeft size={18}/> تعديل الطلب</button><h2 className="text-xl font-bold mb-2">سائقون قريبون منك</h2><p className="text-sm text-muted-foreground mb-4">وجدنا {mockDrivers.length} سائقين متاحين</p><div className="space-y-3">{mockDrivers.map((driver) => <button key={driver.id} onClick={() => router.push('/passenger/ride-details')} className="w-full flex items-center gap-3 p-3 rounded-xl border hover:border-primary hover:bg-blue-50/50 text-right transition"><img src={driver.avatar} alt={driver.name} className="w-12 h-12 rounded-full bg-secondary"/><div className="flex-1"><div className="flex justify-between"><b>{driver.name}</b><span className="text-sm font-bold">{driver.rating} <Star size={12} fill="#f5b800" className="inline text-yellow-500"/></span></div><p className="text-xs text-muted-foreground mt-1">{driver.carModel} · {driver.carColor}</p><p className="text-xs text-primary mt-1">يصل خلال {driver.id === 'd1' ? 3 : driver.id === 'd2' ? 5 : 7} دقائق</p></div></button>)}</div></>}
          </div>
          <div className="mt-4 bg-card rounded-2xl shadow-lg p-4 pointer-events-auto"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary"><Clock3 size={19}/></div><div><p className="font-bold text-sm">رحلاتك الآمنة</p><p className="text-xs text-muted-foreground">24 رحلة مكتملة هذا الشهر</p></div><span className="mr-auto text-primary font-bold">4.9 <Star size={13} fill="currentColor" className="inline"/></span></div></div>
        </div>
      </section>
    </main>
  )
}
