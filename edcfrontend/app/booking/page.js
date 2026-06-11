"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = 'https://primeepcdesign.co.uk'

export default function BookingPage() {
  const [availableSlots, setAvailableSlots] = useState([])
  const [calendarDates, setCalendarDates] = useState([])
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

  const buildCalendar = (slotsFromBackend) => {
    const slotMap = {}
    slotsFromBackend.forEach(dateData => {
      slotMap[dateData.date] = dateData.slots
    })
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
        dateObj: new Date(d),
        slots: slotMap[dateStr] || [],
        hasSlots: !!slotMap[dateStr]
      })
    }
    setCalendarDates(days)
    const firstWithSlots = days.find(d => d.hasSlots)
    setSelectedDate(firstWithSlots || days[0])
  }

  useEffect(() => { fetchAvailableSlots() }, [])

  const fetchAvailableSlots = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/booking/available-slots-all`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (data.success) {
        const groupedByDate = data.data.reduce((acc, slot) => {
          if (!acc[slot.date]) acc[slot.date] = []
          acc[slot.date].push(slot)
          return acc
        }, {})
        const slotsArray = Object.entries(groupedByDate).map(([date, slots]) => {
          const [year, month, day] = date.split('-').map(Number)
          return { date, dateObj: new Date(year, month - 1, day), slots: slots.sort((a, b) => a.startTime.localeCompare(b.startTime)) }
        }).sort((a, b) => a.dateObj - b.dateObj)
        setAvailableSlots(slotsArray)
        buildCalendar(slotsArray)
      } else {
        alert('Error fetching slots: ' + data.message)
      }
    } catch (error) {
      alert('Network error: ' + error.message)
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
        alert('Booking created successfully! We will contact you soon.')
        router.push('/')
      } else {
        alert('Error creating booking: ' + data.message)
      }
    } catch (error) {
      alert('Network error: ' + error.message)
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

  const formatDateDisplay = (dateObj) =>
    new Date(dateObj).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })

  // For calendar: "June 2026" label
  const getMonthYearFromDates = () => {
    if (!calendarDates.length) return ''
    // Show month of currently selected date
    if (selectedDate) {
      return new Date(selectedDate.dateObj).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    }
    return new Date(calendarDates[0].dateObj).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F8F8] to-white font-sans py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
            <span className="text-[#016837] text-sm font-semibold tracking-wide bg-[#80C531]/10 px-4 py-2 rounded-full">
              BOOK YOUR EPC ASSESSMENT
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Book Your EPC Assessment</h1>
          <p className="text-lg text-[#282828]/80 max-w-2xl mx-auto">
            Select from available time slots for your Energy Performance Certificate assessment.
          </p>
          <button
            onClick={() => setShowAreasBox(true)}
            className="mt-6 inline-flex items-center gap-2 text-[#016837] hover:text-[#01572E] font-medium text-base border-b border-[#016837] pb-1 transition-colors duration-300 group"
          >
            <span>Check Your Area</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Areas Popup */}
        {showAreasBox && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="bg-[#016837] text-white p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">Areas We Cover</h2>
                <button onClick={() => setShowAreasBox(false)} className="text-white text-3xl font-light w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all">×</button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {areas.map((area, index) => (
                    <div key={index} className="p-3 bg-[#F8F8F8] border border-[#80C531]/20 rounded-xl hover:border-[#016837] transition-all">
                      <span className="text-[#282828] font-medium text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-base font-semibold transition-all duration-300 ${
                  step >= stepNumber ? 'bg-[#016837] text-white shadow-md' : 'bg-gray-100 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 2 && (
                  <div className={`w-20 h-px transition-all duration-300 ${step > stepNumber ? 'bg-[#016837]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-20 mt-4 text-sm text-[#282828]/70">
            <span className={step === 1 ? 'text-[#016837] font-semibold' : ''}>Select Time Slot</span>
            <span className={step === 2 ? 'text-[#016837] font-semibold' : ''}>Your Details</span>
          </div>
        </div>

        {/* ── STEP 1: myConstructor-style Calendar ── */}
        {step === 1 && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Calendar top bar */}
              <div className="px-6 pt-6 pb-3 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Select a date &amp; time to book your appointment</h2>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#016837] mx-auto"></div>
                  <p className="mt-4 text-gray-500 text-sm">Loading available slots...</p>
                </div>
              ) : (
                <div>
                  {/* Month label */}
                  <div className="px-6 pt-4 pb-2">
                    <span className="text-sm font-semibold text-gray-600">{getMonthYearFromDates()}</span>
                  </div>

                  {/* ── Date row — exactly like myConstructor ── */}
                  <div className="px-4 pb-2">
                    <div className="flex overflow-x-auto gap-1 pb-1" style={{scrollbarWidth: 'none'}}>
                      {calendarDates.map((dateData) => {
                        const isSelected = selectedDate && selectedDate.date === dateData.date
                        const hasSlots = dateData.hasSlots
                        const d = new Date(dateData.dateObj)
                        const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()
                        const dayNum = d.getDate()

                        return (
                          <button
                            key={dateData.date}
                            onClick={() => hasSlots && setSelectedDate(dateData)}
                            disabled={!hasSlots}
                            className={`flex flex-col items-center py-3 px-3 min-w-[64px] rounded-lg transition-all duration-150 flex-shrink-0 select-none
                              ${isSelected && hasSlots
                                ? 'bg-[#2563eb] text-white'
                                : hasSlots
                                ? 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                                : 'bg-white text-gray-300 cursor-default'
                              }`}
                          >
                            {/* Day name e.g. WED */}
                            <span className={`text-[11px] font-semibold tracking-wide mb-1 ${
                              isSelected && hasSlots ? 'text-white/80' : hasSlots ? 'text-gray-400' : 'text-gray-200'
                            }`}>
                              {dayName}
                            </span>
                            {/* Day number */}
                            <span className={`text-xl font-semibold leading-none ${
                              isSelected && hasSlots ? 'text-white' : hasSlots ? 'text-gray-800' : 'text-gray-200'
                            }`}>
                              {dayNum}
                            </span>
                            {/* Price / availability line — like myConstructor shows £69 */}
                            {hasSlots ? (
                              <span className={`text-[11px] font-semibold mt-1 ${
                                isSelected ? 'text-orange-300' : 'text-[#f97316]'
                              }`}>
                                Available
                              </span>
                            ) : (
                              <span className="text-[11px] text-gray-200 mt-1">—</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 mx-4"></div>

                  {/* ── Time slots grid for selected date ── */}
                  <div className="px-6 py-5">
                    {selectedDate && selectedDate.hasSlots ? (
                      <>
                        <p className="text-sm text-gray-500 mb-4">
                          {new Date(selectedDate.dateObj).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {selectedDate.slots.map((slot) => {
                            const isChosen = selectedSlot && selectedSlot.id === slot.id
                            return (
                              <button
                                key={slot.id}
                                onClick={() => handleSlotSelect(slot, selectedDate)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                                  isChosen
                                    ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-md'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#2563eb] hover:text-[#2563eb] hover:shadow-sm'
                                }`}
                              >
                                {formatTime(slot.startTime)}
                                {slot.currentBookings > 0 && (
                                  <span className={`ml-1.5 text-xs ${isChosen ? 'text-white/70' : 'text-orange-400'}`}>
                                    ({slot.maxBookings - slot.currentBookings} left)
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </>
                    ) : selectedDate && !selectedDate.hasSlots ? (
                      <p className="text-gray-400 text-sm py-4 text-center">
                        No slots available for this date. Please select a highlighted date.
                      </p>
                    ) : !calendarDates.some(d => d.hasSlots) ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500 font-medium mb-2">No slots available at the moment.</p>
                        <p className="text-gray-400 text-sm mb-5">Please contact us directly:</p>
                        <p className="text-gray-600 text-sm font-medium">📞 +44 7469 340373</p>
                        <p className="text-gray-600 text-sm font-medium mt-1">📧 Primeepc.design@gmail.com</p>
                        <button onClick={fetchAvailableSlots} className="mt-5 bg-[#016837] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#01572E] transition-colors">
                          Refresh
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* ── Trust / Accreditation White Bar ── */}
            <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">

                {/* 1. Quidos Accredited Assessor */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 110 42" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
                    {/* Dark background pill */}
                    <rect x="0" y="0" width="110" height="42" rx="4" fill="#1a1a3e"/>
                    {/* Q letter */}
                    <text x="8" y="30" fontFamily="Georgia, serif" fontSize="28" fontWeight="700" fill="white">Q</text>
                    {/* uidos in lighter weight */}
                    <text x="30" y="29" fontFamily="Georgia, serif" fontSize="18" fill="white">uidos</text>
                    {/* Accredited Assessor small text */}
                    <text x="8" y="39" fontFamily="Arial, sans-serif" fontSize="7" fill="#aab0cc" letterSpacing="0.5">Accredited Assessor</text>
                  </svg>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                {/* 2. Stroma Certified Energy Assessor */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 130 42" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
                    {/* Border box */}
                    <rect x="0.5" y="0.5" width="129" height="41" rx="4" fill="white" stroke="#cccccc" strokeWidth="1"/>
                    {/* STROMA text */}
                    <text x="8" y="14" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#555" letterSpacing="1">STROMA</text>
                    {/* CERTIFIED green */}
                    <text x="8" y="26" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="800" fill="#006B3C" letterSpacing="0.5">CERTIFIED</text>
                    {/* ENERGY ASSESSOR */}
                    <text x="8" y="37" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#006B3C" letterSpacing="0.3">ENERGY ASSESSOR</text>
                    {/* Stroma swirl/fan icon */}
                    <circle cx="113" cy="21" r="13" fill="#f0f0f0"/>
                    <path d="M113 11 C107 11 103 15 103 21 C103 27 107 31 113 31" stroke="#006B3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M113 14 C109 14 106 17 106 21 C106 25 109 28 113 28" stroke="#80C531" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M113 17 C111 17 109 19 109 21 C109 23 111 25 113 25" stroke="#006B3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                {/* 3. DBS Checked */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 130 42" className="h-9 w-auto" xmlns="http://www.w3.org/2000/svg">
                    {/* DBS bold */}
                    <text x="4" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" fill="#222">DBS</text>
                    {/* formerly CRB small */}
                    <text x="55" y="14" fontFamily="Arial, sans-serif" fontSize="7" fill="#555">(formerly CRB)</text>
                    {/* CHECKED bold */}
                    <text x="4" y="38" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="900" fill="#222">CHECKED</text>
                    {/* Checkbox icon */}
                    <rect x="55" y="16" width="20" height="20" rx="3" fill="white" stroke="#333" strokeWidth="1.5"/>
                    <path d="M59 26 L63 30 L72 21" stroke="#006B3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    {/* City & Guilds lion crest area — separate */}
                    <text x="82" y="18" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#333">City&amp;</text>
                    <text x="82" y="29" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#333">Guilds</text>
                    {/* Red lion/shield icon simplified */}
                    <path d="M118 8 L114 10 L114 24 C114 28 118 30 118 30 C118 30 122 28 122 24 L122 10 Z" fill="#cc0000"/>
                    <text x="118" y="22" fontFamily="serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">♛</text>
                    <text x="82" y="38" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#555">Qualified</text>
                  </svg>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                {/* 4. PayPal Secure Payments */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Secure Payments By</span>
                  <svg viewBox="0 0 90 26" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
                    {/* Pay - dark blue */}
                    <text x="0" y="21" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="#003087">Pay</text>
                    {/* Pal - light blue */}
                    <text x="37" y="21" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="#009cde">Pal</text>
                    {/* TM mark */}
                    <text x="76" y="9" fontFamily="Arial, sans-serif" fontSize="8" fill="#555">™</text>
                  </svg>
                  <div className="flex items-center gap-2 mt-0.5">
                    {/* Visa */}
                    <svg viewBox="0 0 38 12" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0" y="0" width="38" height="12" rx="2" fill="#1a1f71"/>
                      <text x="19" y="9" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="1">VISA</text>
                    </svg>
                    {/* Mastercard */}
                    <svg viewBox="0 0 32 20" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="10" r="9" fill="#eb001b"/>
                      <circle cx="21" cy="10" r="9" fill="#f79e1b"/>
                      <path d="M16 4.5 C18 6 19.5 8 19.5 10 C19.5 12 18 14 16 15.5 C14 14 12.5 12 12.5 10 C12.5 8 14 6 16 4.5Z" fill="#ff5f00"/>
                    </svg>
                    {/* Discover */}
                    <svg viewBox="0 0 38 12" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0" y="0" width="38" height="12" rx="2" fill="#fff" stroke="#ddd" strokeWidth="0.5"/>
                      <text x="5" y="9" fontFamily="Arial, sans-serif" fontSize="5.5" fontWeight="600" fill="#555">DISCOVER</text>
                      <circle cx="31" cy="6" r="4.5" fill="#f76f20"/>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Booking Form ── */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-[#282828]">Your Details</h2>
              <button
                onClick={() => setStep(1)}
                className="text-[#016837] hover:text-[#01572E] font-medium text-sm flex items-center gap-2 group transition-colors"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Change Time Slot
              </button>
            </div>

            {/* Appointment summary */}
            <div className="mb-8 p-5 bg-[#016837]/5 rounded-xl border border-[#80C531]/30">
              <p className="text-[#016837] font-semibold text-sm mb-1">Selected Appointment</p>
              <p className="text-[#016837] text-xl font-bold">{selectedSlot && formatDateDisplay(selectedSlot.dateData.dateObj)}</p>
              <p className="text-[#016837] font-medium mt-1">at {selectedSlot && formatTime(selectedSlot.startTime)}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#282828] mb-2">Full Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm placeholder-gray-400"
                    placeholder="Enter your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#282828] mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm placeholder-gray-400"
                    placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#282828] mb-2">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm placeholder-gray-400"
                    placeholder="+44 1234 567890" />
                </div>
                <div>
                  <label htmlFor="postcode" className="block text-sm font-semibold text-[#282828] mb-2">Postcode *</label>
                  <input type="text" id="postcode" name="postcode" required value={formData.postcode} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm placeholder-gray-400"
                    placeholder="e.g., M1 1AB" />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-semibold text-[#282828] mb-2">Property Type *</label>
                  <select id="propertyType" name="propertyType" required value={formData.propertyType} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm bg-white">
                    <option value="domestic">Domestic Property</option>
                    <option value="commercial">Commercial Property</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="propertyDetails" className="block text-sm font-semibold text-[#282828] mb-2">
                    {formData.propertyType === 'domestic' ? 'Select Bedroom Option *' : 'Select Area Option *'}
                  </label>
                  <select id="propertyDetails" name="propertyDetails" required value={formData.propertyDetails} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm bg-white">
                    {formData.propertyType === 'domestic'
                      ? domesticOptions.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)
                      : commercialOptions.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)
                    }
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="propertyAddress" className="block text-sm font-semibold text-[#282828] mb-2">Property Address *</label>
                <textarea id="propertyAddress" name="propertyAddress" required rows={3} value={formData.propertyAddress} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm placeholder-gray-400"
                  placeholder="Full address including street, city, etc." />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#282828] mb-2">Additional Message (Optional)</label>
                <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531]/50 focus:border-[#80C531] transition-all text-[#282828] text-sm placeholder-gray-400"
                  placeholder="Any special instructions or questions..." />
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm font-semibold text-[#282828] mb-3">Payment Method *</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Card', sub: 'Visa / Mastercard', icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                      </svg>
                    )},
                    { id: 'paypal', label: 'PayPal', sub: 'PayPal account', icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 21H4.25L6.75 5.5H12c3.31 0 5.5 1.69 5.5 4.5 0 3.31-2.69 5.5-6 5.5H9L7.5 21ZM9.5 13h1.75c1.93 0 3.25-1.07 3.25-2.75 0-1.25-.93-2.25-2.75-2.25H9.25L9.5 13Z"/>
                      </svg>
                    )},
                    { id: 'bank', label: 'Bank Transfer', sub: 'Direct transfer', icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/>
                      </svg>
                    )}
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border-2 transition-all text-center ${
                        paymentMethod === method.id
                          ? 'border-[#016837] bg-[#016837]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={paymentMethod === method.id ? 'text-[#016837]' : 'text-gray-400'}>
                        {method.icon}
                      </span>
                      <span className={`text-sm font-semibold ${paymentMethod === method.id ? 'text-[#016837]' : 'text-gray-600'}`}>
                        {method.label}
                      </span>
                      <span className="text-xs text-gray-400">{method.sub}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-600">
                  {paymentMethod === 'card' && <span><strong>Card:</strong> You will receive a secure payment link via email after booking.</span>}
                  {paymentMethod === 'paypal' && <span><strong>PayPal:</strong> A PayPal payment link will be sent to your email after booking.</span>}
                  {paymentMethod === 'bank' && <span><strong>Bank Transfer:</strong> Our bank details will be emailed after booking. Payment required before assessment.</span>}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-medium">
                  Back
                </button>
                <button type="submit" disabled={loading}
                  className="px-8 py-2.5 bg-[#016837] text-white rounded-xl hover:bg-[#01572E] transition-all shadow-sm text-sm font-semibold disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Booking...
                    </span>
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