'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Car, Clock3, MapPin, Star } from 'lucide-react'
import { mockRides, mockDrivers } from '@/lib/mockData'

export default function PassengerRidesPage() {
  const router = useRouter()
  const rides = mockRides.filter((ride) => ride.passengerId === 'p1')

  return (
    <main className="min-h-screen bg-background">
      <header className="flex h-20 items-center gap-4 border-b bg-card px-5 lg:px-10">
        <button aria-label="العودة" onClick={() => router.push('/passenger')} className="rounded-lg p-2 hover:bg-secondary"><ArrowRight size={20} /></button>
        <div><p className="font-bold text-xl text-primary">رحلاتي</p><p className="text-xs text-muted-foreground">سجل الرحلات السابقة والقادمة</p></div>
      </header>
      <section className="mx-auto max-w-3xl p-5 lg:p-10">
        <div className="mb-6"><h1 className="text-3xl font-bold">سجل الرحلات</h1><p className="mt-2 text-muted-foreground">راجع تفاصيل رحلاتك وتقييماتك.</p></div>
        <div className="space-y-4">{rides.map((ride) => { const driver = mockDrivers.find((item) => item.id === ride.driverId); return <article key={ride.id} className="rounded-2xl border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary"><Car size={22} /></div><div><h2 className="font-bold">رحلة مع {driver?.name ?? 'سائق وصلني'}</h2><p className="mt-1 text-sm text-muted-foreground">{ride.serviceType}</p></div></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">مكتملة</span></div><div className="mt-5 grid gap-3 border-t pt-4 text-sm text-muted-foreground sm:grid-cols-3"><span className="flex items-center gap-2"><Clock3 size={16} />{ride.requestedAt}</span><span className="flex items-center gap-2"><MapPin size={16} />{ride.distance} كم</span><span className="flex items-center gap-2 text-yellow-600"><Star size={16} fill="currentColor" />{ride.rating?.rating ?? '—'} / 5</span></div><div className="mt-4 flex justify-between text-sm"><span className="text-muted-foreground">التكلفة النهائية</span><strong>{ride.actualFare} ر.س</strong></div></article> })}</div>
      </section>
    </main>
  )
}
