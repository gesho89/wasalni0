'use client'

import { useState } from 'react'
import { Bell, Check, CheckCheck, ChevronRight, CircleDollarSign, Gift, ShieldCheck, Star, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Notification = { id: number; title: string; body: string; time: string; type: 'ride' | 'wallet' | 'offer' | 'safety'; unread: boolean }
const initialNotifications: Notification[] = [
  { id: 1, title: 'السائق في الطريق إليك', body: 'أحمد محمد سيصل خلال 4 دقائق. يمكنك التواصل معه الآن.', time: 'منذ 2 دقيقة', type: 'ride', unread: true },
  { id: 2, title: 'تم شحن محفظتك بنجاح', body: 'تمت إضافة 100 ر.س إلى رصيد محفظتك.', time: 'منذ ساعة', type: 'wallet', unread: true },
  { id: 3, title: 'عرض خاص لك', body: 'استخدم الكود TK20 واحصل على خصم 20% على رحلتك القادمة.', time: 'أمس', type: 'offer', unread: true },
  { id: 4, title: 'حسابك آمن', body: 'تم تحديث إعدادات الأمان والخصوصية بنجاح.', time: 'الأحد', type: 'safety', unread: false },
]

const icons = { ride: Bell, wallet: CircleDollarSign, offer: Gift, safety: ShieldCheck }

export default function NotificationsPage() {
  const router = useRouter()
  const [items, setItems] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')
  const visible = items.filter((item) => filter === 'all' || item.unread)
  const unreadCount = items.filter((item) => item.unread).length
  function markOne(id: number) { setItems((current) => current.map((item) => item.id === id ? { ...item, unread: false } : item)) }
  function markAll() { setItems((current) => current.map((item) => ({ ...item, unread: false }))) }

  return <main className="communication-page" dir="rtl"><header className="communication-header"><button className="back-button" onClick={() => router.back()} aria-label="رجوع"><ChevronRight size={20} /></button><div><strong>الإشعارات</strong><small>ابقَ على اطلاع دائم</small></div><span className="notification-count">{unreadCount} جديد</span></header><section className="notifications-shell"><div className="communication-title"><div><span className="eyebrow">مركز التنبيهات</span><h1>كل الإشعارات</h1></div><button className="text-button" onClick={markAll}><CheckCheck size={15} /> قراءة الكل</button></div><div className="communication-tabs"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>الكل <b>{items.length}</b></button><button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>غير مقروءة <b>{unreadCount}</b></button></div><div className="notifications-list">{visible.map((item) => { const Icon = icons[item.type]; return <button key={item.id} className={`notification-row ${item.unread ? 'unread' : ''}`} onClick={() => markOne(item.id)}><span className={`notification-icon ${item.type}`}><Icon size={19} /></span><span className="notification-copy"><strong>{item.title}</strong><small>{item.body}</small><em>{item.time}</em></span>{item.unread ? <span className="unread-dot" aria-label="غير مقروء" /> : <Check size={15} className="read-check" />}</button> })}{visible.length === 0 && <div className="empty-communication"><Check size={30} /><strong>أنت على اطلاع</strong><span>لا توجد إشعارات غير مقروءة</span></div>}</div><div className="notification-tip"><ShieldCheck size={18} /><span><strong>إشعارات آمنة</strong><small>لن نطلب منك أبداً كلمات المرور أو رموز التحقق عبر الإشعارات.</small></span><X size={16} /></div></section></main>
}
