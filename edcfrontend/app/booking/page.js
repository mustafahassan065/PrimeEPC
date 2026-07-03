"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const API_URL = 'https://primeepcdesign.co.uk'

// ── Sandbox keys (swap for live keys when ready) ──────────────────────────


const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Tlnnu3jhQN3xMHf8TghdEx8F6oEWaW3RCahjLMA4KUrzarmrHTIe82Wyg9DIvrXLQNeVJmC3B8NAAJFrFgr1vtc00mQMz2loA'
const PAYPAL_CLIENT_ID       = 'AUqAOcibpxfE2IyWwQOYBn6ovFPQMeE-VjHXUDGikAh6Mul88fHALjeoYe-lca-8Y13tUa5Dyy3yt6Sw'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

// ── Price map (Option B — clean, no regex risk) ───────────────────────────
const PRICE_MAP = {
  'EPC for 1 bedroom £50': 50,
  'EPC for 2 bedroom £50': 50,
  'EPC for 3 bedroom £60': 60,
  'EPC for 4 bedroom £70': 70,
  'EPC for 5 bedroom £80': 80,
  'EPC for 6 bedroom £80': 80,
  '0 -540 ft square (0 – 50 square metre) £144': 144,
  '540-1070 ft square (51 -100 square metres) £180': 180,
  '1070-1610 ft square (101 – 150 square metres) £228': 228,
  '1610 – 2150 ft square (151 - 200 square metres) £264': 264,
  '2150-2690 ft square (201- 250 square metres) £312': 312,
  '2690 – 3230 ft square (251 – 300 square metres) £360': 360,
  '1 Bedroom Flat £110': 110,
  '2 Bedroom Flat £120': 120,
  '2 Bedroom House £130': 130,
  '3 Bedroom House £140': 140,
  '4 Bedroom House £160': 160,
  '5 Bedroom House £180': 180,
  '6+ Bedroom House Contact for Quote': 0,
}

// ── Stripe card form (inner component — needs Elements context) ───────────
function StripeCardForm({ amount, bookingData, onSuccess, onError }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [cardError, setCardError] = useState('')

  const handleStripeSubmit = async () => {
    if (!stripe || !elements) return
    setProcessing(true)
    setCardError('')
    try {
      // 1. Create PaymentIntent on backend
      const intentRes = await fetch(`${API_URL}/api/payment/stripe/create-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'gbp', bookingData })
      })
      const intentData = await intentRes.json()
      if (!intentData.success) throw new Error(intentData.message || 'Failed to create payment intent')

      // 2. Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      })
      if (error) throw new Error(error.message)
      if (paymentIntent.status === 'succeeded') {
        // 3. Save booking with payment ref
        onSuccess({ paymentRef: paymentIntent.id, paymentMethod: 'stripe' })
      }
    } catch (err) {
      setCardError(err.message)
      onError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="mt-3">
      <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white">
        <CardElement options={{
          style: {
            base: { fontSize: '14px', color: '#374151', '::placeholder': { color: '#9ca3af' } }
          }
        }} />
      </div>
      {cardError && <p className="text-red-500 text-xs mt-1">{cardError}</p>}
      <button
        type="button"
        onClick={handleStripeSubmit}
        disabled={processing || !stripe}
        className="mt-3 w-full py-2.5 bg-[#016837] text-white rounded-lg text-sm font-medium hover:bg-[#01572E] disabled:opacity-50 transition-all"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
            Processing...
          </span>
        ) : `Pay £${amount} with Card`}
      </button>
    </div>
  )
}

// ── Main booking page ─────────────────────────────────────────────────────
export default function BookingPage() {
  const [calendarDates, setCalendarDates]   = useState([])
  const [selectedSlot, setSelectedSlot]     = useState(null)
  const [loading, setLoading]               = useState(false)
  const [step, setStep]                     = useState(1)
  const [selectedDate, setSelectedDate]     = useState(null)
  const [currentMonth, setCurrentMonth]     = useState(new Date())
  const [showAreasBox, setShowAreasBox]     = useState(false)
  const [paymentMethod, setPaymentMethod]   = useState('cash')
  const [bookingDone, setBookingDone]       = useState(false)
  const [paymentError, setPaymentError]     = useState('')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    propertyType: 'domestic', propertyDetails: '',
    postcode: '', propertyAddress: '', message: ''
  })

  const router = useRouter()

  const domesticOptions = [
    { value: 'EPC for 1 bedroom £50',  label: 'EPC for 1 bedroom — £50'  },
    { value: 'EPC for 2 bedroom £50',  label: 'EPC for 2 bedroom — £50'  },
    { value: 'EPC for 3 bedroom £60',  label: 'EPC for 3 bedroom — £60'  },
    { value: 'EPC for 4 bedroom £70',  label: 'EPC for 4 bedroom — £70'  },
    { value: 'EPC for 5 bedroom £80',  label: 'EPC for 5 bedroom — £80'  },
    { value: 'EPC for 6 bedroom £80',  label: 'EPC for 6 bedroom — £80'  },
  ]
  const commercialOptions = [
    { value: '0 -540 ft square (0 – 50 square metre) £144',        label: '0–540 ft² (0–50m²) — £144'   },
    { value: '540-1070 ft square (51 -100 square metres) £180',     label: '540–1070 ft² (51–100m²) — £180'  },
    { value: '1070-1610 ft square (101 – 150 square metres) £228',  label: '1070–1610 ft² (101–150m²) — £228' },
    { value: '1610 – 2150 ft square (151 - 200 square metres) £264',label: '1610–2150 ft² (151–200m²) — £264' },
    { value: '2150-2690 ft square (201- 250 square metres) £312',   label: '2150–2690 ft² (201–250m²) — £312' },
    { value: '2690 – 3230 ft square (251 – 300 square metres) £360',label: '2690–3230 ft² (251–300m²) — £360' },
  ]
  const eicrOptions = [
    { value: '1 Bedroom Flat £110',              label: '1 Bedroom Flat — £110'              },
    { value: '2 Bedroom Flat £120',              label: '2 Bedroom Flat — £120'              },
    { value: '2 Bedroom House £130',             label: '2 Bedroom House — £130'             },
    { value: '3 Bedroom House £140',             label: '3 Bedroom House — £140'             },
    { value: '4 Bedroom House £160',             label: '4 Bedroom House — £160'             },
    { value: '5 Bedroom House £180',             label: '5 Bedroom House — £180'             },
    { value: '6+ Bedroom House Contact for Quote', label: '6+ Bedroom House — Contact for Quote' },
  ]

  const areas = [
    "EPC Altrincham","EPC Ashton-in-Makerfield","EPC Ashton-under-Lyne","EPC Astley",
    "EPC Atherton","EPC Bolton","EPC Bramhall","EPC Bury","EPC Chadderton","EPC Cheadle",
    "EPC Chorlton","EPC Denton","EPC Droylsden","EPC Eccles","EPC Farnworth","EPC Gorton",
    "EPC Hale","EPC Handforth","EPC Harpurhey","EPC Hazel Grove","EPC Heywood","EPC Hindley",
    "EPC Horwich","EPC Ince","EPC Leigh","EPC Lymm","EPC Levenshulme","EPC Longsight",
    "EPC Lowton","EPC Manchester","EPC Middleton","EPC Millbrook","EPC Milnrow","EPC Mossley",
    "EPC Oldham","EPC Openshaw","EPC Partington","EPC Prestwich","EPC Radcliffe","EPC Reddish",
    "EPC Rochdale","EPC Saddleworth","EPC Salford","EPC Stalybridge","EPC Stockport",
    "EPC Stoneclough","EPC Stretford","EPC The Gay Village","EPC Timperley","EPC Tottington",
    "EPC Walshaw","EPC Waterloo","EPC Westhoughton","EPC Whitefield","EPC Wigan",
    "EPC Withington","EPC Worsley","EPC Wythenshawe"
  ]

  // ── Derived price ──────────────────────────────────────────────────────
  const selectedPrice = PRICE_MAP[formData.propertyDetails] || 0

  // ── Calendar build ─────────────────────────────────────────────────────
  const buildCalendar = (slotsFromBackend) => {
    const slotMap = {}
    slotsFromBackend.forEach(d => { slotMap[d.date] = d.slots })
    const today = new Date(); today.setHours(0,0,0,0)
    const days = []
    for (let i = 0; i < 60; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const y   = d.getFullYear()
      const mo  = String(d.getMonth()+1).padStart(2,'0')
      const day = String(d.getDate()).padStart(2,'0')
      const dateStr = `${y}-${mo}-${day}`
      days.push({ date: dateStr, dateObj: new Date(d), slots: slotMap[dateStr] || [], hasSlots: !!slotMap[dateStr], isPast: false })
    }
    setCalendarDates(days)
    const first = days.find(d => d.hasSlots)
    if (first) { setSelectedDate(first); setCurrentMonth(new Date(first.dateObj.getFullYear(), first.dateObj.getMonth(), 1)) }
    else { const t = new Date(); setCurrentMonth(new Date(t.getFullYear(), t.getMonth(), 1)) }
  }

  useEffect(() => { fetchAvailableSlots() }, [])

  const fetchAvailableSlots = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/booking/available-slots-all`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (data.success) {
        const grouped = data.data.reduce((acc, slot) => {
          if (!acc[slot.date]) acc[slot.date] = []
          acc[slot.date].push(slot)
          return acc
        }, {})
        const arr = Object.entries(grouped).map(([date, slots]) => {
          const [y,m,d] = date.split('-').map(Number)
          return { date, dateObj: new Date(y,m-1,d), slots: slots.sort((a,b) => a.startTime.localeCompare(b.startTime)) }
        }).sort((a,b) => a.dateObj - b.dateObj)
        buildCalendar(arr)
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const handleSlotSelect = (slot, dateData) => { setSelectedSlot({ ...slot, dateData }); setStep(2) }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'propertyType') setFormData({ ...formData, [name]: value, propertyDetails: '' })
    else setFormData({ ...formData, [name]: value })
  }

  // ── Save booking to backend ────────────────────────────────────────────
  const saveBooking = async ({ paymentRef = '', paymentMethod: pm = 'cash', paymentStatus = 'pending' }) => {
    const bookingData = {
      ...formData,
      preferredDate: `${selectedSlot.dateData.date}T${selectedSlot.startTime}`,
      slotId: selectedSlot.id,
      paymentMethod: pm,
      paymentRef,
      paymentStatus,
      amount: selectedPrice,
    }
    const res = await fetch(`${API_URL}/api/booking/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    return data
  }

  // ── Cash submit ────────────────────────────────────────────────────────
  const handleCashSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPaymentError('')
    try {
      await saveBooking({ paymentMethod: 'cash', paymentStatus: 'pay_on_arrival' })
      setBookingDone(true)
    } catch (err) { setPaymentError(err.message) }
    finally { setLoading(false) }
  }

  // ── Stripe success callback ────────────────────────────────────────────
  const handleStripeSuccess = async ({ paymentRef }) => {
    setLoading(true)
    try {
      await saveBooking({ paymentMethod: 'stripe', paymentRef, paymentStatus: 'paid' })
      setBookingDone(true)
    } catch (err) { setPaymentError(err.message) }
    finally { setLoading(false) }
  }

  // ── PayPal success callback ────────────────────────────────────────────
  const handlePayPalSuccess = async (details) => {
    setLoading(true)
    try {
      await saveBooking({ paymentMethod: 'paypal', paymentRef: details.id, paymentStatus: 'paid' })
      setBookingDone(true)
    } catch (err) { setPaymentError(err.message) }
    finally { setLoading(false) }
  }

  // ── Helpers ────────────────────────────────────────────────────────────
  const formatTime = (t) => {
    const [h, m] = t.split(':')
    const hour = parseInt(h)
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
  }
  const formatDateDisplay = (dateObj) =>
    new Date(dateObj).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
  const formatDateShort = (dateObj) =>
    new Date(dateObj).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })

  const getCalendarGrid = () => {
    const year  = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay    = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month+1, 0).getDate()
    const lookup = {}
    calendarDates.forEach(d => { lookup[d.date] = d })
    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const mo      = String(month+1).padStart(2,'0')
      const day     = String(d).padStart(2,'0')
      const dateStr = `${year}-${mo}-${day}`
      const todayTs = new Date(); todayTs.setHours(0,0,0,0)
      const dateObj = new Date(year, month, d)
      cells.push(lookup[dateStr] || { date: dateStr, dateObj, slots: [], hasSlots: false, isPast: dateObj < todayTs })
    }
    return cells
  }

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 1))

  const monthLabel = currentMonth.toLocaleDateString('en-GB', { month:'long', year:'numeric' })
  const weekDays   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const todayDate  = new Date(); todayDate.setHours(0,0,0,0)

  // Booking success screen
  if (bookingDone) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#016837]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#016837]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 text-sm mb-6">We will contact you shortly to confirm your assessment details.</p>
          <button onClick={() => router.push('/')} className="px-6 py-2.5 bg-[#016837] text-white rounded-lg text-sm font-medium hover:bg-[#01572E] transition-all">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#80C531] rounded-full animate-pulse"></div>
            <span className="text-[#016837] text-xs font-medium tracking-widest uppercase">Book Your EPC Assessment</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">Book Your Assessment</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Select a date and time slot for your Energy Performance Certificate assessment.
          </p>
          <button
            onClick={() => setShowAreasBox(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-[#016837] text-sm font-medium border-b border-[#016837]/40 pb-0.5 hover:border-[#016837] transition-colors"
          >
            Check your area
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Areas Popup */}
        {showAreasBox && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full max-h-[80vh] overflow-hidden">
              <div className="bg-[#016837] text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-base font-medium">Areas We Cover</h2>
                <button onClick={() => setShowAreasBox(false)} className="text-white/80 hover:text-white text-2xl leading-none">×</button>
              </div>
              <div className="p-5 overflow-y-auto max-h-[65vh]">
                <div className="grid grid-cols-2 gap-2">
                  {areas.map((area, i) => (
                    <div key={i} className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">{area}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1,2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-all ${step >= s ? 'bg-[#016837] text-white' : 'bg-gray-200 text-gray-400'}`}>{s}</div>
              {s < 2 && <div className={`w-16 h-px ${step > s ? 'bg-[#016837]' : 'bg-gray-200'}`}/>}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-20 -mt-5 mb-8 text-xs text-gray-400">
          <span className={step === 1 ? 'text-[#016837]' : ''}>Select slot</span>
          <span className={step === 2 ? 'text-[#016837]' : ''}>Your details</span>
        </div>

        {/* ── STEP 1: Calendar ── */}
        {step === 1 && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Month nav */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <span className="text-sm font-medium text-gray-700">{monthLabel}</span>
                <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>

              {loading ? (
                <div className="py-16 flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#016837]"></div>
                  <p className="text-gray-400 text-sm">Loading slots...</p>
                </div>
              ) : (
                <div className="px-4 py-4">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 mb-1">
                    {weekDays.map(d => (
                      <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {getCalendarGrid().map((cell, i) => {
                      if (!cell) return <div key={i}/>
                      const isSelected = selectedDate && selectedDate.date === cell.date
                      const isPast     = cell.dateObj < todayDate
                      const isToday    = cell.dateObj.getTime() === todayDate.getTime()

                      return (
                        <button
                          key={cell.date}
                          disabled={!cell.hasSlots || isPast}
                          onClick={() => cell.hasSlots && !isPast && setSelectedDate(cell)}
                          className={`
                            relative flex flex-col items-center justify-center py-2 rounded-xl text-sm transition-all
                            ${isSelected
                              ? 'bg-[#014d28] text-white ring-2 ring-[#014d28] ring-offset-1'
                              : cell.hasSlots && !isPast
                              ? 'bg-[#016837] text-white hover:bg-[#014d28] cursor-pointer'
                              : isPast
                              ? 'cursor-default text-gray-200'
                              : 'cursor-default text-gray-300'
                            }
                          `}
                        >
                          <span className={`text-sm font-medium leading-none ${
                            isSelected ? 'text-white' :
                            cell.hasSlots && !isPast ? 'text-white' :
                            isToday ? 'text-[#016837]' : ''
                          }`}>
                            {cell.dateObj.getDate()}
                          </span>
                          {/* White dot indicator for available dates */}
                          {cell.hasSlots && !isPast && (
                            <span className="w-1 h-1 rounded-full mt-0.5 bg-white/70"></span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-5 mt-4 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-lg bg-[#016837] inline-block"></span>
                      <span className="text-xs text-gray-400">Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-lg bg-[#014d28] ring-2 ring-[#014d28] ring-offset-1 inline-block"></span>
                      <span className="text-xs text-gray-400">Selected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-lg bg-gray-100 inline-block"></span>
                      <span className="text-xs text-gray-400">Unavailable</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Time slots */}
              {selectedDate && (
                <div className="border-t border-gray-100 px-6 py-5">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">
                    {formatDateDisplay(selectedDate.dateObj)}
                  </p>
                  {selectedDate.hasSlots ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedDate.slots.map((slot) => {
                        const isChosen = selectedSlot && selectedSlot.id === slot.id
                        return (
                          <button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot, selectedDate)}
                            className={`px-4 py-2.5 rounded-lg text-sm border transition-all font-medium ${
                              isChosen
                                ? 'bg-[#016837] text-white border-[#016837] shadow-sm'
                                : 'bg-[#016837]/8 text-[#016837] border-[#016837]/30 hover:bg-[#016837] hover:text-white'
                            }`}
                          >
                            {/* Start & end time both shown */}
                            {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                            {slot.currentBookings > 0 && (
                              <span className={`ml-1.5 text-xs font-normal ${isChosen ? 'text-white/60' : 'text-orange-500'}`}>
                                ({slot.maxBookings - slot.currentBookings} left)
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No slots available for this date.</p>
                  )}
                </div>
              )}

              {/* No slots fallback */}
              {!loading && calendarDates.length > 0 && !calendarDates.some(d => d.hasSlots) && (
                <div className="px-6 py-10 text-center border-t border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">No slots available at the moment.</p>
                  <p className="text-gray-400 text-xs mb-4">Please contact us or check back later.</p>
                  <p className="text-gray-500 text-sm">📞 07308658247</p>
                  <p className="text-gray-500 text-sm mt-1">📧 info@primeepcdesign.co.uk</p>
                  <button onClick={fetchAvailableSlots} className="mt-4 px-5 py-2 bg-[#016837] text-white rounded-lg text-sm hover:bg-[#01572E] transition-colors">
                    Refresh
                  </button>
                </div>
              )}
            </div>

            {/* Trust bar */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-5">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex flex-col items-center">
                  <span style={{fontSize:'9px', color:'#888', marginBottom:'3px', letterSpacing:'0.5px'}}>SECURE PAYMENTS BY</span>
                  <div style={{display:'flex', alignItems:'baseline', gap:'1px'}}>
                    <span style={{fontSize:'22px', fontWeight:900, color:'#003087', fontFamily:'Arial,sans-serif', lineHeight:1}}>Pay</span>
                    <span style={{fontSize:'22px', fontWeight:900, color:'#009cde', fontFamily:'Arial,sans-serif', lineHeight:1}}>Pal</span>
                    <span style={{fontSize:'9px', color:'#888', alignSelf:'flex-start', marginTop:'2px'}}>™</span>
                  </div>
                  <span style={{fontSize:'8px', color:'#e53e3e', fontWeight:600, marginTop:'2px', letterSpacing:'0.3px'}}>NO PAYPAL ACCOUNT NEEDED!</span>
                </div>
                <div className="h-10 w-px bg-gray-100"></div>
                <div style={{background:'#1a1f71', borderRadius:'4px', padding:'5px 12px'}}>
                  <span style={{fontSize:'14px', fontWeight:800, color:'white', fontFamily:'Arial,sans-serif', letterSpacing:'1px'}}>VISA</span>
                </div>
                <div style={{position:'relative', width:'42px', height:'28px'}}>
                  <div style={{position:'absolute', left:0, top:0, width:'28px', height:'28px', borderRadius:'50%', background:'#eb001b'}}></div>
                  <div style={{position:'absolute', right:0, top:0, width:'28px', height:'28px', borderRadius:'50%', background:'#f79e1b'}}></div>
                  <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:'14px', height:'28px', background:'#ff5f00'}}></div>
                </div>
                <div style={{background:'#fff', border:'1px solid #ddd', borderRadius:'4px', padding:'4px 10px', display:'flex', alignItems:'center', gap:'4px'}}>
                  <span style={{fontSize:'10px', fontWeight:700, color:'#555', fontFamily:'Arial,sans-serif', letterSpacing:'0.3px'}}>DISCOVER</span>
                  <div style={{width:'14px', height:'14px', borderRadius:'50%', background:'#f76f20'}}></div>
                </div>
                <div style={{background:'#016fd0', borderRadius:'4px', padding:'5px 12px'}}>
                  <span style={{fontSize:'11px', fontWeight:700, color:'white', fontFamily:'Arial,sans-serif', letterSpacing:'0.5px'}}>AMEX</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Form + Payment ── */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-800">Your Details</h2>
              <button onClick={() => setStep(1)} className="text-sm text-[#016837] hover:underline flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                Change slot
              </button>
            </div>

            {/* Appointment summary */}
            {selectedSlot && (
              <div className="mb-6 p-4 bg-[#016837]/5 rounded-xl border border-[#016837]/10">
                <p className="text-xs text-[#016837] font-medium uppercase tracking-wide mb-1">Selected appointment</p>
                <p className="text-gray-800 font-medium">{formatDateShort(selectedSlot.dateData.dateObj)}</p>
                <p className="text-gray-600 text-sm">at {formatTime(selectedSlot.startTime)} – {formatTime(selectedSlot.endTime)}</p>
              </div>
            )}

            {/* Error */}
            {paymentError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {paymentError}
              </div>
            )}

            <div className="space-y-5">
              {/* Personal details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {id:'name',    label:'Full Name',         type:'text',  placeholder:'Your full name'},
                  {id:'email',   label:'Email Address',     type:'email', placeholder:'your@email.com'},
                  {id:'phone',   label:'Phone Number',      type:'tel',   placeholder:'+44 1234 567890'},
                  {id:'postcode',label:'Property Postcode', type:'text',  placeholder:'e.g. M1 1AB'},
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm text-gray-600 mb-1.5">{f.label} *</label>
                    <input type={f.type} id={f.id} name={f.id} required value={formData[f.id]} onChange={handleInputChange}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 placeholder-gray-300 transition-all" />
                  </div>
                ))}

                <div>
                  <label htmlFor="propertyType" className="block text-sm text-gray-600 mb-1.5">Service Type *</label>
                  <select id="propertyType" name="propertyType" required value={formData.propertyType} onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 bg-white transition-all">
                    <option value="domestic">Domestic Property (EPC)</option>
                    <option value="commercial">Commercial Property (EPC)</option>
                    <option value="eicr">EICR (Electrical Inspection)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyDetails" className="block text-sm text-gray-600 mb-1.5">
                    {formData.propertyType === 'domestic' ? 'Bedrooms / Price *' : formData.propertyType === 'eicr' ? 'Property Size / Price *' : 'Area / Price *'}
                  </label>
                  <select id="propertyDetails" name="propertyDetails" required value={formData.propertyDetails} onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 bg-white transition-all">
                    <option value="">Select option</option>
                    {(formData.propertyType === 'domestic' ? domesticOptions : formData.propertyType === 'eicr' ? eicrOptions : commercialOptions).map((o,i) => (
                      <option key={i} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price display */}
              {selectedPrice > 0 && (
                <div className="flex items-center justify-between p-3 bg-[#016837]/5 rounded-lg border border-[#016837]/10">
                  <span className="text-sm text-gray-600">Assessment fee</span>
                  <span className="text-lg font-semibold text-[#016837]">£{selectedPrice}</span>
                </div>
              )}

              <div>
                <label htmlFor="propertyAddress" className="block text-sm text-gray-600 mb-1.5">Property Address *</label>
                <textarea id="propertyAddress" name="propertyAddress" required rows={3} value={formData.propertyAddress} onChange={handleInputChange}
                  placeholder="Full address including street and city"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 placeholder-gray-300 transition-all resize-none" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-600 mb-1.5">Additional Notes <span className="text-gray-400">(optional)</span></label>
                <textarea id="message" name="message" rows={2} value={formData.message} onChange={handleInputChange}
                  placeholder="Any special instructions or questions..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 placeholder-gray-300 transition-all resize-none" />
              </div>

              {/* ── Payment Method ── */}
              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">Payment Method *</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id:'cash',   label:'Cash',      sub:'Pay on arrival',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg> },
                    { id:'stripe', label:'Bank Card',  sub:'Visa / Mastercard',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
                    { id:'paypal', label:'PayPal',     sub:'Pay via PayPal',
                      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 21H4.25L6.75 5.5H12c3.31 0 5.5 1.69 5.5 4.5 0 3.31-2.69 5.5-6 5.5H9L7.5 21ZM9.5 13h1.75c1.93 0 3.25-1.07 3.25-2.75 0-1.25-.93-2.25-2.75-2.25H9.25L9.5 13Z"/></svg> },
                  ].map(m => (
                    <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-center ${
                        paymentMethod === m.id ? 'border-[#016837] bg-[#016837]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <span className={paymentMethod === m.id ? 'text-[#016837]' : 'text-gray-400'}>{m.icon}</span>
                      <span className={`text-xs font-semibold ${paymentMethod === m.id ? 'text-[#016837]' : 'text-gray-600'}`}>{m.label}</span>
                      <span className="text-xs text-gray-400">{m.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Cash info */}
                {paymentMethod === 'cash' && (
                  <div className="mt-3 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                    💵 Payment will be collected in cash on the day of your assessment. No payment is required now.
                  </div>
                )}

                {/* Stripe card form */}
                {paymentMethod === 'stripe' && selectedPrice > 0 && (
                  <Elements stripe={stripePromise}>
                    <StripeCardForm
                      amount={selectedPrice}
                      bookingData={{ ...formData, preferredDate: `${selectedSlot?.dateData?.date}T${selectedSlot?.startTime}`, slotId: selectedSlot?.id }}
                      onSuccess={handleStripeSuccess}
                      onError={(msg) => setPaymentError(msg)}
                    />
                  </Elements>
                )}
                {paymentMethod === 'stripe' && !selectedPrice && (
                  <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg text-xs text-blue-600">
                    Please select a service option above to see the price before paying by card.
                  </div>
                )}

                {/* PayPal buttons */}
                {paymentMethod === 'paypal' && selectedPrice > 0 && (
                  <div className="mt-3">
                    <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID, currency: 'GBP' }}>
                      <PayPalButtons
                        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{
                              amount: { value: selectedPrice.toFixed(2), currency_code: 'GBP' },
                              description: formData.propertyDetails || 'EPC Assessment'
                            }]
                          })
                        }}
                        onApprove={async (data, actions) => {
                          const details = await actions.order.capture()
                          await handlePayPalSuccess(details)
                        }}
                        onError={(err) => setPaymentError('PayPal error: ' + err.message)}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
                {paymentMethod === 'paypal' && !selectedPrice && (
                  <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg text-xs text-blue-600">
                    Please select a service option above to see the price before paying via PayPal.
                  </div>
                )}
              </div>

              {/* Submit — only for cash (stripe/paypal have their own buttons) */}
              {paymentMethod === 'cash' && (
                <div className="flex justify-end gap-3 pt-1">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all text-sm">
                    Back
                  </button>
                  <button
                    onClick={handleCashSubmit}
                    disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.propertyDetails || !formData.propertyAddress || !formData.postcode}
                    className="px-6 py-2.5 bg-[#016837] text-white rounded-lg hover:bg-[#01572E] transition-all text-sm font-medium disabled:opacity-50">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
                        Booking...
                      </span>
                    ) : 'Confirm Booking'}
                  </button>
                </div>
              )}
              {paymentMethod !== 'cash' && (
                <div className="flex justify-start pt-1">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all text-sm">
                    ← Back
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}