"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = 'https://primeepcdesign.co.uk'

export default function BookingPage() {
  const [availableSlots, setAvailableSlots] = useState([])   // slots from backend
  const [calendarDates, setCalendarDates] = useState([])     // all 30 days shown in strip
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAreasBox, setShowAreasBox] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'domestic',
    propertyDetails: '',
    postcode: '',
    propertyAddress: '',
    message: ''
  })

  const router = useRouter()

  const domesticOptions = [
    { value: 'EPC for 1 bedroom £50', label: 'EPC for 1 bedroom £50' },
    { value: 'EPC for 2 bedroom £50', label: 'EPC for 2 bedroom £50' },
    { value: 'EPC for 3 bedroom £60', label: 'EPC for 3 bedroom £60' },
    { value: 'EPC for 4 bedroom £70', label: 'EPC for 4 bedroom £70' },
    { value: 'EPC for 5 bedroom £80', label: 'EPC for 5 bedroom £80' },
    { value: 'EPC for 6 bedroom £80', label: 'EPC for 6 bedroom £80' }
  ]

  const commercialOptions = [
    { value: '0 -540 ft square (0 – 50 square metre) £144', label: '0 -540 ft square (0 – 50 square metre) £144' },
    { value: '540-1070 ft square (51 -100 square metres) £180', label: '540-1070 ft square (51 -100 square metres) £180' },
    { value: '1070-1610 ft square (101 – 150 square metres) £228', label: '1070-1610 ft square (101 – 150 square metres) £228' },
    { value: '1610 – 2150 ft square (151 - 200 square metres) £264', label: '1610 – 2150 ft square (151 - 200 square metres) £264' },
    { value: '2150-2690 ft square (201- 250 square metres) £312', label: '2150-2690 ft square (201- 250 square metres) £312' },
    { value: '2690 – 3230 ft square (251 – 300 square metres) £360', label: '2690 – 3230 ft square (251 – 300 square metres) £360' }
  ]

  const areas = [
    "EPC Altrincham", "EPC Ashton-in-Makerfield", "EPC Ashton-under-Lyne", "EPC Astley",
    "EPC Atherton", "EPC Bolton", "EPC Bramhall", "EPC Bury", "EPC Chadderton", "EPC Cheadle",
    "EPC Chorlton", "EPC Denton", "EPC Droylsden", "EPC Eccles", "EPC Farnworth", "EPC Gorton",
    "EPC Hale", "EPC Handforth", "EPC Harpurhey", "EPC Hazel Grove", "EPC Heywood", "EPC Hindley",
    "EPC Horwich", "EPC Ince", "EPC Leigh", "EPC Lymm", "EPC Levenshulme", "EPC Longsight",
    "EPC Lowton", "EPC Manchester", "EPC Middleton", "EPC Millbrook", "EPC Milnrow", "EPC Mossley",
    "EPC Oldham", "EPC Openshaw", "EPC Partington", "EPC Prestwich", "EPC Radcliffe", "EPC Reddish",
    "EPC Rochdale", "EPC Saddleworth", "EPC Salford", "EPC Stalybridge", "EPC Stockport",
    "EPC Stoneclough", "EPC Stretford", "EPC The Gay Village", "EPC Timperley", "EPC Tottington",
    "EPC Walshaw", "EPC Waterloo", "EPC Westhoughton", "EPC Whitefield", "EPC Wigan",
    "EPC Withington", "EPC Worsley", "EPC Wythenshawe"
  ]

  // Build dynamic 30-day calendar with slots mapped onto it
  const buildCalendar = (slotsFromBackend) => {
    // Build a lookup map: "YYYY-MM-DD" -> slot array
    const slotMap = {}
    slotsFromBackend.forEach(dateData => {
      slotMap[dateData.date] = dateData.slots
    })

    // Generate next 30 days starting from today
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 30; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`

      days.push({
        date: dateStr,
        dateObj: d,
        slots: slotMap[dateStr] || [],          // empty = no slots added by admin
        hasSlots: !!slotMap[dateStr]             // true = admin added slots for this date
      })
    }

    setCalendarDates(days)

    // Auto-select first date that has slots
    const firstWithSlots = days.find(d => d.hasSlots)
    if (firstWithSlots) {
      setSelectedDate(firstWithSlots)
    } else {
      setSelectedDate(days[0]) // fallback to today even if no slots
    }
  }

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/booking/available-slots-all`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()

      if (data.success) {
        // Group backend slots by date
        const groupedByDate = data.data.reduce((acc, slot) => {
          if (!acc[slot.date]) acc[slot.date] = []
          acc[slot.date].push(slot)
          return acc
        }, {})

        const slotsArray = Object.entries(groupedByDate).map(([date, slots]) => {
          const [year, month, day] = date.split('-').map(Number)
          return {
            date,
            dateObj: new Date(year, month - 1, day),
            slots: slots.sort((a, b) => a.startTime.localeCompare(b.startTime))
          }
        }).sort((a, b) => a.dateObj - b.dateObj)

        setAvailableSlots(slotsArray)
        buildCalendar(slotsArray)
      } else {
        alert('❌ Error fetching available slots: ' + data.message)
      }
    } catch (error) {
      console.error('❌ Error:', error)
      alert('❌ Network error. Please try again: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSlotSelect = (slot, dateData) => {
    setSelectedSlot({ ...slot, dateData })
    setStep(2)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'propertyType') {
      setFormData({ ...formData, [name]: value, propertyDetails: '' })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const bookingData = {
        ...formData,
        preferredDate: `${selectedSlot.dateData.date}T${selectedSlot.startTime}`,
        slotId: selectedSlot.id,
        paymentMethod
      }
      const response = await fetch(`${API_URL}/api/booking/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (data.success) {
        alert('✅ Booking created successfully! We will contact you soon.')
        router.push('/')
      } else {
        alert('❌ Error creating booking: ' + data.message)
      }
    } catch (error) {
      console.error('❌ Error:', error)
      alert('❌ Network error. Please try again: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  const formatDateDisplay = (dateObj) => {
    const date = new Date(dateObj)
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getDayOfWeek = (dateObj) => new Date(dateObj).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()
  const getDayNumber = (dateObj) => new Date(dateObj).getDate()
  const getMonthName = (dateObj) => new Date(dateObj).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()

  const getMonthYearLabel = () => {
    if (!selectedDate) return ''
    return new Date(selectedDate.dateObj).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F8F8] to-white font-sans py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
            <span className="text-[#016837] text-sm font-semibold tracking-wide bg-[#80C531]/10 backdrop-blur-sm px-4 py-2 rounded-full">
              BOOK YOUR EPC ASSESSMENT
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Book Your EPC Assessment</h1>
          <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
            Select from available time slots for your Energy Performance Certificate assessment.
          </p>
          <button
            onClick={() => setShowAreasBox(true)}
            className="mt-6 inline-flex items-center gap-2 text-[#016837] hover:text-[#01572E] font-medium text-lg border-b border-[#016837] pb-1 transition-colors duration-300 group"
          >
            <span>Check Your Area</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Areas Popup */}
        {showAreasBox && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="bg-[#016837] text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Areas We Cover</h2>
                <button onClick={() => setShowAreasBox(false)} className="text-white hover:text-gray-200 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300">×</button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {areas.map((area, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-[#F8F8F8] to-white border border-[#80C531]/20 rounded-xl hover:border-[#016837] hover:shadow-lg transition-all duration-300">
                      <span className="text-[#282828] font-semibold text-lg">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl text-xl font-bold transition-all duration-300 ${step >= stepNumber ? 'bg-[#016837] text-white shadow-lg' : 'bg-[#016837] border border-[#80C531]/20 text-white opacity-90'}`}>
                  {stepNumber}
                </div>
                {stepNumber < 2 && (
                  <div className={`w-24 h-0.5 transition-all duration-300 ${step > stepNumber ? 'bg-gradient-to-r from-[#016837] to-[#80C531]' : 'bg-[#282828]'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-lg text-[#282828] opacity-90 max-w-xs mx-auto">
            <span className="font-semibold">Select Time Slot</span>
            <span className="font-semibold">Your Details</span>
          </div>
        </div>

        {/* ── STEP 1: Dynamic Calendar ── */}
        {step === 1 && (
          <>
            <div className="bg-white rounded-3xl shadow-lg border border-[#80C531]/20 overflow-hidden">
              {/* Calendar header */}
              <div className="px-8 pt-8 pb-4">
                <h2 className="text-2xl font-bold text-[#282828] mb-1">Select a date &amp; time to book your appointment</h2>
                {selectedDate && <p className="text-base text-[#016837] font-semibold">{getMonthYearLabel()}</p>}
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#016837] mx-auto"></div>
                  <p className="mt-6 text-lg text-[#282828] opacity-90">Loading available slots...</p>
                </div>
              ) : (
                <div>
                  {/* ── Dynamic Date Strip — all 30 days, slots highlighted ── */}
                  <div className="px-8 pb-2">
                    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                      {calendarDates.map((dateData) => {
                        const isSelected = selectedDate && selectedDate.date === dateData.date
                        const hasSlots = dateData.hasSlots

                        return (
                          <button
                            key={dateData.date}
                            onClick={() => setSelectedDate(dateData)}
                            disabled={!hasSlots}
                            className={`flex flex-col items-center justify-center px-3 py-3 min-w-[70px] rounded-2xl border-2 transition-all duration-200 flex-shrink-0
                              ${isSelected && hasSlots
                                ? 'border-[#016837] bg-[#016837] text-white shadow-lg'
                                : isSelected && !hasSlots
                                ? 'border-gray-200 bg-gray-100 text-gray-400 shadow-sm'
                                : hasSlots
                                ? 'border-[#80C531]/50 bg-white text-[#282828] hover:border-[#016837] hover:shadow-md cursor-pointer'
                                : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                              }`}
                          >
                            <span className={`text-xs font-bold tracking-wider ${isSelected && hasSlots ? 'text-white/80' : hasSlots ? 'text-gray-500' : 'text-gray-300'}`}>
                              {getDayOfWeek(dateData.dateObj)}
                            </span>
                            <span className={`text-2xl font-extrabold mt-0.5 leading-none ${!hasSlots ? 'text-gray-300' : ''}`}>
                              {getDayNumber(dateData.dateObj)}
                            </span>
                            <span className={`text-xs font-semibold mt-0.5 ${isSelected && hasSlots ? 'text-white/80' : hasSlots ? 'text-gray-400' : 'text-gray-200'}`}>
                              {getMonthName(dateData.dateObj)}
                            </span>
                            {/* Badge: slot count if available, dash if not */}
                            {hasSlots ? (
                              <span className={`mt-1.5 text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#80C531]/15 text-[#016837]'}`}>
                                {dateData.slots.length} {dateData.slots.length === 1 ? 'slot' : 'slots'}
                              </span>
                            ) : (
                              <span className="mt-1.5 text-xs text-gray-200 font-medium">—</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* ── Time Slots for selected date ── */}
                  {selectedDate && selectedDate.hasSlots ? (
                    <div className="px-8 pb-8 pt-4">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                        Available times — {formatDateDisplay(selectedDate.dateObj)}
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {selectedDate.slots.map((slot) => {
                          const isChosen = selectedSlot && selectedSlot.id === slot.id
                          return (
                            <button
                              key={slot.id}
                              onClick={() => handleSlotSelect(slot, selectedDate)}
                              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 font-semibold transition-all duration-200 ${
                                isChosen
                                  ? 'border-[#016837] bg-[#016837] text-white shadow-lg scale-105'
                                  : 'border-[#80C531]/40 bg-white text-[#016837] hover:border-[#016837] hover:bg-[#016837]/5 hover:shadow-md'
                              }`}
                            >
                              <span className="text-sm font-bold">{formatTime(slot.startTime)}</span>
                              <span className={`text-xs mt-0.5 ${isChosen ? 'text-white/70' : 'text-gray-400'}`}>
                                – {formatTime(slot.endTime)}
                              </span>
                              {slot.currentBookings > 0 && (
                                <span className={`text-xs mt-1 font-medium ${isChosen ? 'text-white/60' : 'text-orange-500'}`}>
                                  {slot.maxBookings - slot.currentBookings} left
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : selectedDate && !selectedDate.hasSlots ? (
                    <div className="px-8 pb-8 pt-4 text-center">
                      <p className="text-gray-400 text-base font-medium">No slots available for this date.</p>
                      <p className="text-gray-300 text-sm mt-1">Please select a highlighted date above.</p>
                    </div>
                  ) : null}

                  {/* No slots at all fallback */}
                  {calendarDates.length > 0 && !calendarDates.some(d => d.hasSlots) && (
                    <div className="px-8 pb-12 text-center">
                      <div className="text-[#80C531] text-6xl mb-4">📅</div>
                      <h3 className="text-xl font-bold text-[#282828] mb-2">No Available Slots</h3>
                      <p className="text-[#282828] opacity-70 mb-6">Please check back later or contact us directly.</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-center gap-2 text-[#282828]">
                          <span>📞</span><span className="font-semibold">+44 7469 340373</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-[#282828]">
                          <span>📧</span><span className="font-semibold">Primeepc.design@gmail.com</span>
                        </div>
                      </div>
                      <button onClick={fetchAvailableSlots} className="bg-gradient-to-r from-[#016837] to-[#80C531] text-white px-8 py-3 rounded-xl font-semibold">
                        Refresh Availability
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Trust / Accreditation White Bar ── */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-5">
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">

                {/* Quidos Accredited Assessor */}
                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 60 28" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <text x="0" y="22" fontFamily="Georgia, serif" fontSize="26" fontWeight="700" fill="#1a1a2e">Q</text>
                      <text x="18" y="22" fontFamily="Georgia, serif" fontSize="18" fontWeight="600" fill="#1a1a2e">uidos</text>
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wide uppercase text-center leading-tight">Accredited<br/>Assessor</span>
                </div>

                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

                {/* Stroma Certified */}
                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div className="flex items-center gap-1.5">
                    {/* Stroma swirl icon */}
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#006B3C"/>
                      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 8v1M12 15v1M8 12H9M15 12h1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-bold text-gray-600 tracking-widest uppercase">STROMA</span>
                      <span className="text-[9px] font-bold text-[#006B3C] tracking-widest uppercase">CERTIFIED</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wide uppercase text-center leading-tight">Energy<br/>Assessor</span>
                </div>

                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

                {/* DBS Checked */}
                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-gray-800 tracking-tight">DBS</span>
                    {/* Checkbox tick icon */}
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="3" stroke="#333" strokeWidth="2"/>
                      <path d="M6 12l4 4 8-8" stroke="#006B3C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wide uppercase text-center leading-tight">Disclosure &<br/>Barring Service</span>
                </div>

                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

                {/* City & Guilds */}
                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-gray-800 leading-tight text-center">City&amp;<br/>Guilds</span>
                    {/* Shield/crest icon */}
                    <svg viewBox="0 0 20 22" className="h-7 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 1L2 4v8c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V4L10 1z" fill="#8B0000" stroke="#8B0000" strokeWidth="0.5"/>
                      <text x="10" y="14" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill="white">C&G</text>
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wide uppercase">Qualified</span>
                </div>

                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

                {/* Secure Payments / PayPal */}
                <div className="flex flex-col items-center gap-1 min-w-[100px]">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 80 24" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
                      {/* PayPal wordmark */}
                      <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" fill="#003087">Pay</text>
                      <text x="28" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" fill="#009cde">Pal</text>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-green-600" fill="currentColor">
                      <path d="M6 0C2.69 0 0 2.69 0 6s2.69 6 6 6 6-2.69 6-6S9.31 0 6 0zm-1 8.5L2.5 6l1.06-1.06L5 7.38l3.44-3.44L9.5 5 5 8.5z"/>
                    </svg>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide">Secure Payments</span>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Form + Payment ── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-lg border border-[#80C531]/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#282828]">Your Details</h2>
              <button
                onClick={() => setStep(1)}
                className="text-[#016837] hover:text-[#01572E] font-semibold text-lg flex items-center gap-2 group transition-colors duration-300"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Change Time Slot</span>
              </button>
            </div>

            {/* Appointment summary */}
            <div className="mb-8 p-6 bg-gradient-to-r from-[#016837]/10 to-[#80C531]/5 rounded-2xl border-2 border-[#80C531]/30">
              <p className="text-[#016837] font-bold text-lg mb-3">Selected Appointment</p>
              <p className="text-[#016837] text-2xl font-bold">{formatDateDisplay(selectedSlot.dateData.dateObj)}</p>
              <p className="text-[#016837] text-xl font-semibold mt-2">at {formatTime(selectedSlot.startTime)}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-[#282828] mb-3">Full Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="Enter your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-[#282828] mb-3">Email Address *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold text-[#282828] mb-3">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="+44 1234 567890" />
                </div>
                <div>
                  <label htmlFor="postcode" className="block text-lg font-semibold text-[#282828] mb-3">Postcode of the property *</label>
                  <input type="text" id="postcode" name="postcode" required value={formData.postcode} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="e.g., M1 1AB" />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-lg font-semibold text-[#282828] mb-3">Property Type *</label>
                  <select id="propertyType" name="propertyType" required value={formData.propertyType} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] bg-white">
                    <option value="domestic">Domestic Property</option>
                    <option value="commercial">Commercial Property</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="propertyDetails" className="block text-lg font-semibold text-[#282828] mb-3">
                    {formData.propertyType === 'domestic' ? 'Select Bedroom Option *' : 'Select Area Option *'}
                  </label>
                  <select id="propertyDetails" name="propertyDetails" required value={formData.propertyDetails} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] bg-white">
                    {formData.propertyType === 'domestic'
                      ? domesticOptions.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)
                      : commercialOptions.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)
                    }
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="propertyAddress" className="block text-lg font-semibold text-[#282828] mb-3">Property Address *</label>
                <textarea id="propertyAddress" name="propertyAddress" required rows={4} value={formData.propertyAddress} onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                  placeholder="Full address including street, city, etc." />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-[#282828] mb-3">Additional Message (Optional)</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                  placeholder="Any special instructions or questions..." />
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-lg font-semibold text-[#282828] mb-4">Payment Method *</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Card */}
                  <button type="button" onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${paymentMethod === 'card' ? 'border-[#016837] bg-[#016837]/5 shadow-lg' : 'border-gray-200 bg-white hover:border-[#016837]/40 hover:shadow-md'}`}>
                    <svg className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-[#016837]' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    <span className={`text-base font-bold ${paymentMethod === 'card' ? 'text-[#016837]' : 'text-gray-500'}`}>Card</span>
                    <span className={`text-xs text-center ${paymentMethod === 'card' ? 'text-[#016837]/70' : 'text-gray-400'}`}>Visa / Mastercard / Amex</span>
                    {paymentMethod === 'card' && <span className="mt-1 w-5 h-5 rounded-full bg-[#016837] flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>}
                  </button>

                  {/* PayPal */}
                  <button type="button" onClick={() => setPaymentMethod('paypal')}
                    className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${paymentMethod === 'paypal' ? 'border-[#016837] bg-[#016837]/5 shadow-lg' : 'border-gray-200 bg-white hover:border-[#016837]/40 hover:shadow-md'}`}>
                    <svg className={`w-8 h-8 ${paymentMethod === 'paypal' ? 'text-[#016837]' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.5 21H4.25L6.75 5.5H12c3.31 0 5.5 1.69 5.5 4.5 0 3.31-2.69 5.5-6 5.5H9L7.5 21ZM9.5 13h1.75c1.93 0 3.25-1.07 3.25-2.75 0-1.25-.93-2.25-2.75-2.25H9.25L9.5 13Z"/>
                    </svg>
                    <span className={`text-base font-bold ${paymentMethod === 'paypal' ? 'text-[#016837]' : 'text-gray-500'}`}>PayPal</span>
                    <span className={`text-xs text-center ${paymentMethod === 'paypal' ? 'text-[#016837]/70' : 'text-gray-400'}`}>Pay via PayPal account</span>
                    {paymentMethod === 'paypal' && <span className="mt-1 w-5 h-5 rounded-full bg-[#016837] flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>}
                  </button>

                  {/* Bank Transfer */}
                  <button type="button" onClick={() => setPaymentMethod('bank')}
                    className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${paymentMethod === 'bank' ? 'border-[#016837] bg-[#016837]/5 shadow-lg' : 'border-gray-200 bg-white hover:border-[#016837]/40 hover:shadow-md'}`}>
                    <svg className={`w-8 h-8 ${paymentMethod === 'bank' ? 'text-[#016837]' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" />
                    </svg>
                    <span className={`text-base font-bold ${paymentMethod === 'bank' ? 'text-[#016837]' : 'text-gray-500'}`}>Bank Transfer</span>
                    <span className={`text-xs text-center ${paymentMethod === 'bank' ? 'text-[#016837]/70' : 'text-gray-400'}`}>Direct bank transfer</span>
                    {paymentMethod === 'bank' && <span className="mt-1 w-5 h-5 rounded-full bg-[#016837] flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>}
                  </button>
                </div>

                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                    <strong>Bank Transfer:</strong> After booking confirmation, we will email you our bank details. Payment must be received before your assessment.
                  </div>
                )}
                {paymentMethod === 'paypal' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                    <strong>PayPal:</strong> You will receive a PayPal payment link via email after booking. Complete payment to confirm your assessment.
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                    <strong>Card Payment:</strong> You will receive a secure payment link via email. No card details stored on our servers.
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-6">
                <button type="button" onClick={() => setStep(1)}
                  className="px-8 py-3 border-2 border-[#80C531]/30 text-[#282828] rounded-xl hover:border-[#016837] hover:bg-[#F8F8F8] transition-all duration-300 font-semibold shadow-lg">
                  Back to Slots
                </button>
                <button type="submit" disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[#016837] to-[#80C531] text-white rounded-xl hover:from-[#01572E] hover:to-[#70B52B] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </div>
                  ) : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}