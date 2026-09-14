'use client'

import { useMemo, useState } from 'react'
import { Bell, CheckCheck, ChevronRight, MessageCircle, MoreVertical, Search, Send, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Chat = { id: string; name: string; role: string; preview: string; time: string; unread: number; tone: string }

const initialChats: Chat[] = [
  { id: 'driver', name: 'أحمد محمد', role: 'سائق الرحلة الحالية', preview: 'أنا في انتظارك عند نقطة الانطلاق', time: 'الآن', unread: 2, tone: 'gold' },
  { id: 'support', name: 'دعم تك توكي', role: 'مساعدة العملاء', preview: 'مرحباً، كيف يمكننا مساعدتك؟', time: 'منذ 12 د', unread: 1, tone: 'green' },
  { id: 'fawzi', name: 'فوزي السيد', role: 'سائق سابق', preview: 'شكراً لاستخدامك تك توكي', time: 'أمس', unread: 0, tone: 'blue' },
  { id: 'fatma', name: 'فاطمة أحمد', role: 'سائقة موثقة', preview: 'تم تأكيد تفاصيل الرحلة', time: 'الأحد', unread: 0, tone: 'purple' },
]

export default function MessagesPage() {
  const router = useRouter()
  const [chats, setChats] = useState(initialChats)
  const [activeId, setActiveId] = useState('driver')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const active = chats.find((chat) => chat.id === activeId) ?? chats[0]
  const visibleChats = useMemo(() => chats.filter((chat) => chat.name.includes(query) && (filter === 'all' || chat.unread > 0)), [chats, filter, query])

  function openChat(id: string) { setActiveId(id); setChats((current) => current.map((chat) => chat.id === id ? { ...chat, unread: 0 } : chat)) }
  function sendMessage() { if (!draft.trim()) return; setDraft('') }
  function markAllRead() { setChats((current) => current.map((chat) => ({ ...chat, unread: 0 }))) }

  return <main className="communication-page" dir="rtl">
    <header className="communication-header"><button className="back-button" onClick={() => router.back()} aria-label="رجوع"><ChevronRight size={20} /></button><div><strong>الرسائل</strong><small>تواصل بسهولة وأمان</small></div><button className="header-icon" onClick={() => router.push('/notifications')} aria-label="الإشعارات"><Bell size={19} /></button></header>
    <div className="communication-shell">
      <section className="inbox-panel"><div className="communication-title"><div><span className="eyebrow">مركز التواصل</span><h1>رسائلك</h1></div><button className="text-button" onClick={markAllRead}><CheckCheck size={15} /> قراءة الكل</button></div><div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في الرسائل" /></div><div className="communication-tabs"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>الكل <b>{chats.length}</b></button><button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>غير مقروءة <b>{chats.filter((chat) => chat.unread).length}</b></button></div><div className="chat-list">{visibleChats.map((chat) => <button key={chat.id} className={`chat-row ${chat.id === activeId ? 'selected' : ''}`} onClick={() => openChat(chat.id)}><span className={`chat-avatar ${chat.tone}`}><UserRound size={19} /></span><span className="chat-copy"><strong>{chat.name}</strong><small>{chat.role}</small><em>{chat.preview}</em></span><span className="chat-meta"><small>{chat.time}</small>{chat.unread > 0 && <b>{chat.unread}</b>}</span></button>)}{visibleChats.length === 0 && <div className="empty-communication"><MessageCircle size={28} /><strong>لا توجد رسائل</strong><span>ستظهر محادثاتك هنا</span></div>}</div></section>
      <section className="conversation-panel"><div className="conversation-heading"><span className={`chat-avatar ${active.tone}`}><UserRound size={18} /></span><div><strong>{active.name}</strong><small>{active.role}</small></div><button className="header-icon" aria-label="خيارات المحادثة"><MoreVertical size={18} /></button></div><div className="conversation-body"><div className="conversation-date">اليوم</div><div className="message received">مرحباً بك في تك توكي، كيف يمكنني مساعدتك؟<small>10:24 ص</small></div><div className="message received">{active.preview}<small>10:25 ص</small></div><div className="message sent">شكراً، وصلتني الرسالة وسأكون عند نقطة الانطلاق.<small>10:26 ص</small></div><div className="safety-banner"><Bell size={15} /><span>لا تشارك بياناتك الشخصية أو معلومات الدفع داخل المحادثة.</span></div></div><form className="message-composer" onSubmit={(event) => { event.preventDefault(); sendMessage() }}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="اكتب رسالتك هنا..." /><button type="submit" aria-label="إرسال الرسالة"><Send size={17} /></button></form></section>
    </div>
  </main>
}
