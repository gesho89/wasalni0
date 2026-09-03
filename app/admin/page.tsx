'use client'

import { useState } from 'react'
import { Activity, BarChart3, Bell, Car, CheckCircle2, ChevronDown, CircleDollarSign, LayoutDashboard, MapPin, Menu, MessageSquareWarning, Settings, ShieldCheck, Star, Users, XCircle } from 'lucide-react'
import { mockDrivers, mockPassengers, mockRides } from '@/lib/mockData'

const stats = [
  { label: 'إجمالي الرحلات', value: '45,230', delta: '+12.8%', icon: Car, tone: 'text-primary' },
  { label: 'الإيرادات', value: '125,330 ر.س', delta: '+8.4%', icon: CircleDollarSign, tone: 'text-yellow-600' },
  { label: 'المستخدمون', value: '12,458', delta: '+16.2%', icon: Users, tone: 'text-green-600' },
  { label: 'الشكاوى المفتوحة', value: '12', delta: '-24.5%', icon: MessageSquareWarning, tone: 'text-red-500' },
]

export default function AdminPage() {
  const [section, setSection] = useState('dashboard')
  const [notice, setNotice] = useState('')
  const menu = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'drivers', label: 'السائقون', icon: Users },
    { id: 'rides', label: 'الرحلات', icon: Car },
    { id: 'complaints', label: 'الشكاوى', icon: MessageSquareWarning },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ]

  const action = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#071a35] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-l border-white/10 bg-[#0b2345] p-5 lg:block">
          <div className="mb-12 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5b800] text-[#071a35]"><Car size={25} /></div><div><b className="text-xl">وصلني</b><p className="text-xs text-blue-200">لوحة التحكم الإدارية</p></div></div>
          <nav className="space-y-2">{menu.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setSection(id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${section === id ? 'bg-primary text-white shadow-lg shadow-blue-950/30' : 'text-blue-100 hover:bg-white/10'}`}><Icon size={19} />{label}</button>)}</nav>
          <div className="mt-12 rounded-2xl border border-green-400/20 bg-green-400/10 p-4"><div className="mb-2 flex items-center gap-2 text-green-300"><ShieldCheck size={18} /><span className="text-sm font-bold">النظام يعمل</span></div><p className="text-xs leading-5 text-blue-100">جميع الخدمات متاحة وتعمل بشكل طبيعي.</p></div>
        </aside>
        <section className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0b2345]/80 px-5 backdrop-blur lg:px-10"><div className="flex items-center gap-3"><button className="lg:hidden"><Menu /></button><div><p className="text-sm text-blue-200">الأربعاء، 03 سبتمبر 2026</p><h1 className="text-xl font-bold">مرحباً بك في لوحة التحكم</h1></div></div><div className="flex items-center gap-4"><button className="relative rounded-xl p-2 hover:bg-white/10"><Bell size={20} /><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-400" /></button><div className="flex items-center gap-2 border-r border-white/10 pr-4"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold">م</div><span className="hidden text-sm font-semibold sm:block">المسؤول</span><ChevronDown size={16} className="text-blue-200" /></div></div></header>
          <div className="p-5 lg:p-10">
            {notice && <div className="mb-5 rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-200">{notice}</div>}
            <div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-sm font-semibold text-blue-300">نظرة عامة</p><h2 className="text-3xl font-bold">أداء المنصة</h2></div><button onClick={() => action('تم تحديث بيانات لوحة التحكم')} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">تحديث البيانات</button></div>
            <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">{stats.map(({ label, value, delta, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-white/10 bg-[#0d294d] p-5"><div className="mb-5 flex items-center justify-between"><Icon className={tone} size={22} /><span className="rounded-full bg-green-400/10 px-2 py-1 text-xs text-green-300">{delta}</span></div><p className="text-xs text-blue-200">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>)}</div>
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-white/10 bg-[#0d294d] p-5"><div className="mb-6 flex items-center justify-between"><div><h3 className="font-bold">نشاط الرحلات</h3><p className="mt-1 text-xs text-blue-200">آخر 7 أيام</p></div><BarChart3 className="text-primary" size={20} /></div><div className="flex h-56 items-end gap-3 border-b border-white/10 px-2">{[48, 62, 50, 78, 68, 92, 74].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-primary/80 transition hover:bg-primary" style={{ height: `${height}%` }} /><span className="text-[10px] text-blue-200">{['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'][index]}</span></div>)}</div></div>
              <div className="rounded-2xl border border-white/10 bg-[#0d294d] p-5"><div className="mb-5 flex items-center justify-between"><h3 className="font-bold">السائقون النشطون</h3><Activity className="text-green-400" size={20} /></div><div className="space-y-4">{mockDrivers.map((driver) => <div key={driver.id} className="flex items-center gap-3"><img src={driver.avatar} alt={driver.name} className="h-10 w-10 rounded-full bg-white/10" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{driver.name}</p><p className="text-xs text-blue-200">{driver.carModel}</p></div><span className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>)}</div><button onClick={() => setSection('drivers')} className="mt-5 w-full rounded-xl border border-white/10 py-2 text-sm text-blue-100 hover:bg-white/10">عرض كل السائقين</button></div></div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d294d] p-5"><div className="mb-5 flex items-center justify-between"><h3 className="font-bold">آخر الرحلات</h3><button onClick={() => setSection('rides')} className="text-sm text-blue-300">عرض الكل</button></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-right text-sm"><thead className="text-xs text-blue-200"><tr><th className="pb-3">الراكب</th><th className="pb-3">السائق</th><th className="pb-3">الحالة</th><th className="pb-3">القيمة</th><th className="pb-3">التقييم</th></tr></thead><tbody>{mockRides.slice(0, 4).map((ride) => { const passenger = mockPassengers.find((item) => item.id === ride.passengerId); const driver = mockDrivers.find((item) => item.id === ride.driverId); return <tr key={ride.id} className="border-t border-white/10"><td className="py-4">{passenger?.name}</td><td>{driver?.name}</td><td><span className="inline-flex items-center gap-1 text-green-300"><CheckCircle2 size={15}/> مكتملة</span></td><td>{ride.actualFare} ر.س</td><td className="text-yellow-300">{ride.rating?.rating} <Star size={13} fill="currentColor" className="inline" /></td></tr> })}</tbody></table></div></div>
          </div>
        </section>
      </div>
    </main>
  )
}
