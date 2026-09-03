'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import { Car, Package, Bike } from 'lucide-react'

export default function Page() {
  const router = useRouter()
  const { loginAsPassenger, loginAsDriver, loginAsAdmin } = useApp()

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                <Car className="w-12 h-12 text-blue-900" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-2">وصلني</h1>
            <p className="text-xl text-blue-100">خدمة نقل آمنة وموثوقة</p>
          </div>

          {/* Role Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
            <h2 className="text-2xl font-bold mb-8 text-center">اختر دورك</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Passenger Option */}
              <button
                onClick={() => {
                  loginAsPassenger('p1')
                  router.push('/passenger')
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Car className="w-12 h-12 text-yellow-400" />
                <span className="font-semibold text-lg">الراكب</span>
                <span className="text-sm text-blue-100">ابحث عن رحلة</span>
              </button>

              {/* Driver Option */}
              <button
                onClick={() => {
                  loginAsDriver('d1')
                  router.push('/driver')
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Package className="w-12 h-12 text-yellow-400" />
                <span className="font-semibold text-lg">السائق</span>
                <span className="text-sm text-blue-100">قبل الطلبات</span>
              </button>

              {/* Admin Option */}
              <button
                onClick={() => {
                  loginAsAdmin()
                  router.push('/admin')
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Bike className="w-12 h-12 text-yellow-400" />
                <span className="font-semibold text-lg">الإدارة</span>
                <span className="text-sm text-blue-100">لوحة التحكم</span>
              </button>
            </div>

            {/* Test Accounts Info */}
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <p className="text-sm text-blue-100 mb-4">حسابات اختبار متاحة:</p>
              <div className="space-y-2 text-sm text-blue-100">
                <p>• الراكب: أحمد محمد (p1) - راكب نشط</p>
                <p>• السائق: محمود السيد (d1) - سائق موثوق</p>
                <p>• الإدارة: لوحة التحكم الإدارية</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-blue-100">
            <p className="text-sm">تطبيق وصلني - منصة توصيل وخدمات النقل</p>
          </div>
        </div>
      </div>
    </main>
  )
}
