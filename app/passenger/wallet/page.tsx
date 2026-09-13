'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, ChevronLeft, CreditCard, Gift, Plus, WalletCards, X } from 'lucide-react'

const transactions = [
  { label: 'رحلة تك توك', detail: 'اليوم، 10:30 ص', amount: '-45.00', type: 'out' },
  { label: 'شحن المحفظة', detail: 'أمس، 06:20 م', amount: '+100.00', type: 'in' },
  { label: 'رحلة تك توك', detail: 'أمس، 11:15 ص', amount: '-35.00', type: 'out' },
]

export default function WalletPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(250)
  const [topUp, setTopUp] = useState('')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [message, setMessage] = useState('')

  function addFunds(amount: number) {
    setBalance((value) => value + amount)
    setMessage(`تمت إضافة ${amount.toFixed(2)} ج.م إلى محفظتك`)
    setTimeout(() => setMessage(''), 3000)
  }

  return <main className="passenger-app">
    <header className="passenger-header"><button aria-label="العودة" onClick={() => router.back()} className="icon-button"><ArrowRight size={19}/></button><div className="brand-lockup"><div className="brand-mark"><WalletCards size={21}/></div><div><strong>تك توكي</strong><small>TUKTUKY</small></div></div><span className="rides-header-title">المحفظة والدفع</span></header>
    <section className="wallet-page">
      <div className="page-intro"><div><div className="panel-eyebrow">حسابك المالي</div><h1>المحفظة</h1><p>تحكم في رصيدك وطرق الدفع بسهولة وأمان</p></div><div className="wallet-mark"><WalletCards size={25}/></div></div>
      {message && <div className="wallet-toast"><Check size={17}/>{message}</div>}
      <div className="wallet-grid">
        <section className="balance-card"><div><span>الرصيد الحالي</span><strong>{balance.toFixed(2)}</strong><small>جنيه مصري</small></div><WalletCards size={39}/><div className="balance-actions"><button onClick={() => addFunds(50)}>+ 50 ج.م</button><button onClick={() => addFunds(100)}>+ 100 ج.م</button><button onClick={() => addFunds(250)}>+ 250 ج.م</button></div></section>
        <section className="wallet-card"><div className="section-heading"><div><b>شحن المحفظة</b><small>اختر المبلغ المناسب لك</small></div><Plus size={19}/></div><div className="amount-grid">{[50,100,250,500].map((amount) => <button key={amount} onClick={() => addFunds(amount)}>{amount} <small>ج.م</small></button>)}</div><div className="custom-amount"><input value={topUp} onChange={(e) => setTopUp(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" placeholder="مبلغ مخصص"/><button disabled={!topUp} onClick={() => { addFunds(Number(topUp)); setTopUp('') }}>شحن الآن</button></div></section>
      </div>
      <div className="wallet-grid lower-grid">
        <section className="wallet-card"><div className="section-heading"><div><b>طرق الدفع</b><small>اختر طريقة الدفع الافتراضية</small></div><CreditCard size={19}/></div><button className="payment-method active"><span className="card-icon">VISA</span><span><b>بطاقة بنكية</b><small>تنتهي بـ 4242</small></span><Check size={17}/></button><button className="payment-method"><span className="cash-icon">ج.م</span><span><b>الدفع نقدًا</b><small>ادفع للسائق مباشرة</small></span></button><button className="add-payment"><Plus size={16}/>إضافة طريقة دفع</button></section>
        <section className="wallet-card"><div className="section-heading"><div><b>العروض والكوبونات</b><small>وفّر أكثر في رحلاتك القادمة</small></div><Gift size={19}/></div><div className="coupon-input"><input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="أدخل كود الخصم"/><button onClick={() => setCouponApplied(coupon.length > 2)}>{couponApplied ? <Check size={16}/> : 'تطبيق'}</button></div>{couponApplied ? <div className="coupon-success"><Check size={16}/>تم تطبيق خصم 20% على الرحلة القادمة</div> : <div className="offer-row"><Gift size={19}/><span><b>خصم 20%</b><small>استخدم الكود TK20</small></span><button onClick={() => { setCoupon('TK20'); setCouponApplied(true) }}>نسخ الكود</button></div>}</section>
      </div>
      <section className="wallet-card transactions-card"><div className="section-heading"><div><b>آخر العمليات</b><small>سجل معاملات محفظتك</small></div><button className="text-action">عرض الكل <ChevronLeft size={15}/></button></div>{transactions.map((item) => <div className="transaction-row" key={`${item.label}-${item.detail}`}><span className={`transaction-icon ${item.type}`}>{item.type === 'in' ? '+' : '−'}</span><span><b>{item.label}</b><small>{item.detail}</small></span><strong className={item.type}>{item.amount} ج.م</strong></div>)}</section>
    </section>
  </main>
}
