"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = 'https://primeepcdesign.co.uk'

export default function BookingPage() {
  const [calendarDates, setCalendarDates] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showAreasBox, setShowAreasBox] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    propertyType: 'domestic', propertyDetails: '',
    postcode: '', propertyAddress: '', message: ''
  })

  const router = useRouter()

  const domesticOptions = [
    { value: 'EPC for 1 bedroom £50', label: 'EPC for 1 bedroom £50' },
    { value: 'EPC for 2 bedroom £50', label: 'EPC for 2 bedroom £50' },
    { value: 'EPC for 3 bedroom £60', label: 'EPC for 3 bedroom £60' },
    { value: 'EPC for 4 bedroom £70', label: 'EPC for 4 bedroom £70' },
    { value: 'EPC for 5 bedroom £80', label: 'EPC for 5 bedroom £80' },
    { value: 'EPC for 6 bedroom £80', label: 'EPC for 6 bedroom £80' },
  ]

  const commercialOptions = [
    { value: '0 -540 ft square (0 – 50 square metre) £144', label: '0 -540 ft square (0 – 50 square metre) £144' },
    { value: '540-1070 ft square (51 -100 square metres) £180', label: '540-1070 ft square (51 -100 square metres) £180' },
    { value: '1070-1610 ft square (101 – 150 square metres) £228', label: '1070-1610 ft square (101 – 150 square metres) £228' },
    { value: '1610 – 2150 ft square (151 - 200 square metres) £264', label: '1610 – 2150 ft square (151 - 200 square metres) £264' },
    { value: '2150-2690 ft square (201- 250 square metres) £312', label: '2150-2690 ft square (201- 250 square metres) £312' },
    { value: '2690 – 3230 ft square (251 – 300 square metres) £360', label: '2690 – 3230 ft square (251 – 300 square metres) £360' },
  ]

  const eicrOptions = [
    { value: '1 Bedroom Flat £110', label: '1 Bedroom Flat — £110' },
    { value: '2 Bedroom Flat £120', label: '2 Bedroom Flat — £120' },
    { value: '2 Bedroom House £130', label: '2 Bedroom House — £130' },
    { value: '3 Bedroom House £140', label: '3 Bedroom House — £140' },
    { value: '4 Bedroom House £160', label: '4 Bedroom House — £160' },
    { value: '5 Bedroom House £180', label: '5 Bedroom House — £180' },
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

  const buildCalendar = (slotsFromBackend) => {
    const slotMap = {}
    slotsFromBackend.forEach(dateData => {
      slotMap[dateData.date] = dateData.slots
    })
    const today = new Date()
    today.setHours(0,0,0,0)
    const days = []
    for (let i = 0; i < 60; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const y = d.getFullYear()
      const m = String(d.getMonth()+1).padStart(2,'0')
      const day = String(d.getDate()).padStart(2,'0')
      const dateStr = `${y}-${m}-${day}`
      days.push({
        date: dateStr,
        dateObj: new Date(d),
        slots: slotMap[dateStr] || [],
        hasSlots: !!slotMap[dateStr],
        isPast: false,
      })
    }
    setCalendarDates(days)
    const first = days.find(d => d.hasSlots)
    if (first) {
      setSelectedDate(first)
      setCurrentMonth(new Date(first.dateObj.getFullYear(), first.dateObj.getMonth(), 1))
    } else {
      const t = new Date()
      setCurrentMonth(new Date(t.getFullYear(), t.getMonth(), 1))
    }
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
          const [y,m,d] = date.split('-').map(Number)
          return { date, dateObj: new Date(y,m-1,d), slots: slots.sort((a,b) => a.startTime.localeCompare(b.startTime)) }
        }).sort((a,b) => a.dateObj - b.dateObj)
        buildCalendar(slotsArray)
      }
    } catch (error) {
      console.error(error)
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
        alert('Error: ' + data.message)
      }
    } catch (error) {
      alert('Network error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (t) => {
    const [h, m] = t.split(':')
    const hour = parseInt(h)
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
  }

  const formatDateDisplay = (dateObj) =>
    new Date(dateObj).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })

  const formatDateShort = (dateObj) =>
    new Date(dateObj).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })

  // Calendar grid helpers
  const getCalendarGrid = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay() // 0=Sun
    const daysInMonth = new Date(year, month+1, 0).getDate()
    // Build lookup from calendarDates
    const lookup = {}
    calendarDates.forEach(d => { lookup[d.date] = d })

    const cells = []
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const y = year
      const mo = String(month+1).padStart(2,'0')
      const day = String(d).padStart(2,'0')
      const dateStr = `${y}-${mo}-${day}`
      const today = new Date(); today.setHours(0,0,0,0)
      const dateObj = new Date(year, month, d)
      if (lookup[dateStr]) {
        cells.push(lookup[dateStr])
      } else {
        cells.push({
          date: dateStr,
          dateObj,
          slots: [],
          hasSlots: false,
          isPast: dateObj < today
        })
      }
    }
    return cells
  }

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 1))

  const monthLabel = currentMonth.toLocaleDateString('en-GB', { month:'long', year:'numeric' })
  const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const today = new Date(); today.setHours(0,0,0,0)

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
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-all ${
                step >= s ? 'bg-[#016837] text-white' : 'bg-gray-200 text-gray-400'
              }`}>{s}</div>
              {s < 2 && <div className={`w-16 h-px ${step > s ? 'bg-[#016837]' : 'bg-gray-200'}`}/>}
            </div>
          ))}
          <div className="flex gap-16 absolute text-xs text-gray-400 mt-10 pointer-events-none opacity-0">
          </div>
        </div>
        <div className="flex justify-center gap-20 -mt-5 mb-8 text-xs text-gray-400">
          <span className={step === 1 ? 'text-[#016837]' : ''}>Select slot</span>
          <span className={step === 2 ? 'text-[#016837]' : ''}>Your details</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Calendar header */}
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
                  {/* Day name headers */}
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
                      const isPast = cell.dateObj < today
                      const isToday = cell.dateObj.getTime() === today.getTime()

                      return (
                        <button
                          key={cell.date}
                          disabled={!cell.hasSlots || isPast}
                          onClick={() => cell.hasSlots && !isPast && setSelectedDate(cell)}
                          className={`
                            relative flex flex-col items-center justify-center py-2 rounded-xl text-sm transition-all
                            ${isSelected
                              ? 'bg-[#016837] text-white'
                              : cell.hasSlots && !isPast
                              ? 'hover:bg-[#016837]/8 cursor-pointer text-gray-700'
                              : 'cursor-default text-gray-300'
                            }
                          `}
                        >
                          <span className={`text-sm font-medium ${isSelected ? 'text-white' : isToday && !isSelected ? 'text-[#016837]' : ''}`}>
                            {cell.dateObj.getDate()}
                          </span>
                          {cell.hasSlots && !isPast && (
                            <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white/60' : 'bg-[#80C531]'}`}></span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-4 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#80C531]"></span>
                      <span className="text-xs text-gray-400">Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-lg bg-[#016837] inline-block"></span>
                      <span className="text-xs text-gray-400">Selected</span>
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
                            className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                              isChosen
                                ? 'bg-[#016837] text-white border-[#016837]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#016837] hover:text-[#016837]'
                            }`}
                          >
                            {formatTime(slot.startTime)}
                            {slot.currentBookings > 0 && (
                              <span className={`ml-1 text-xs ${isChosen ? 'text-white/60' : 'text-orange-400'}`}>
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

              {/* No slots at all */}
              {!loading && calendarDates.length > 0 && !calendarDates.some(d => d.hasSlots) && (
                <div className="px-6 py-10 text-center border-t border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">No slots available at the moment.</p>
                  <p className="text-gray-400 text-xs mb-4">Please contact us or check back later.</p>
                  <p className="text-gray-500 text-sm">📞 +44 7469 340373</p>
                  <p className="text-gray-500 text-sm mt-1">📧 Primeepc.design@gmail.com</p>
                  <button onClick={fetchAvailableSlots} className="mt-4 px-5 py-2 bg-[#016837] text-white rounded-lg text-sm hover:bg-[#01572E] transition-colors">
                    Refresh
                  </button>
                </div>
              )}
            </div>

            {/* Payment Trust Bar */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-5">
              <div className="flex flex-wrap items-center justify-center gap-8">

                {/* Secure Payments label */}
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

                {/* Visa */}
                <div style={{background:'#1a1f71', borderRadius:'4px', padding:'5px 12px'}}>
                  <span style={{fontSize:'14px', fontWeight:800, color:'white', fontFamily:'Arial,sans-serif', letterSpacing:'1px'}}>VISA</span>
                </div>

                {/* Mastercard */}
                <div style={{position:'relative', width:'42px', height:'28px'}}>
                  <div style={{position:'absolute', left:0, top:0, width:'28px', height:'28px', borderRadius:'50%', background:'#eb001b'}}></div>
                  <div style={{position:'absolute', right:0, top:0, width:'28px', height:'28px', borderRadius:'50%', background:'#f79e1b'}}></div>
                  <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:'14px', height:'28px', background:'#ff5f00'}}></div>
                </div>

                {/* Discover */}
                <div style={{background:'#fff', border:'1px solid #ddd', borderRadius:'4px', padding:'4px 10px', display:'flex', alignItems:'center', gap:'4px'}}>
                  <span style={{fontSize:'10px', fontWeight:700, color:'#555', fontFamily:'Arial,sans-serif', letterSpacing:'0.3px'}}>DISCOVER</span>
                  <div style={{width:'14px', height:'14px', borderRadius:'50%', background:'#f76f20'}}></div>
                </div>

                {/* Amex */}
                <div style={{background:'#016fd0', borderRadius:'4px', padding:'5px 12px'}}>
                  <span style={{fontSize:'11px', fontWeight:700, color:'white', fontFamily:'Arial,sans-serif', letterSpacing:'0.5px'}}>AMEX</span>
                </div>

              </div>
            </div>
          </>
        )}

        {/* STEP 2 */}
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
                <p className="text-gray-600 text-sm">at {formatTime(selectedSlot.startTime)}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {id:'name', label:'Full Name', type:'text', placeholder:'Your full name'},
                  {id:'email', label:'Email Address', type:'email', placeholder:'your@email.com'},
                  {id:'phone', label:'Phone Number', type:'tel', placeholder:'+44 1234 567890'},
                  {id:'postcode', label:'Property Postcode', type:'text', placeholder:'e.g. M1 1AB'},
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm text-gray-600 mb-1.5">{f.label} *</label>
                    <input type={f.type} id={f.id} name={f.id} required value={formData[f.id]} onChange={handleInputChange}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 placeholder-gray-300 transition-all" />
                  </div>
                ))}

                <div>
                  <label htmlFor="propertyType" className="block text-sm text-gray-600 mb-1.5">Property Type *</label>
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

              <div>
                <label htmlFor="propertyAddress" className="block text-sm text-gray-600 mb-1.5">Property Address *</label>
                <textarea id="propertyAddress" name="propertyAddress" required rows={3} value={formData.propertyAddress} onChange={handleInputChange}
                  placeholder="Full address including street and city"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 placeholder-gray-300 transition-all resize-none" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-600 mb-1.5">Additional Notes <span className="text-gray-400">(optional)</span></label>
                <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleInputChange}
                  placeholder="Any special instructions or questions..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#016837] focus:border-[#016837] text-sm text-gray-700 placeholder-gray-300 transition-all resize-none" />
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Payment Method *</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id:'card', label:'Card', sub:'Visa / Mastercard',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
                    { id:'paypal', label:'PayPal', sub:'PayPal account',
                      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 21H4.25L6.75 5.5H12c3.31 0 5.5 1.69 5.5 4.5 0 3.31-2.69 5.5-6 5.5H9L7.5 21ZM9.5 13h1.75c1.93 0 3.25-1.07 3.25-2.75 0-1.25-.93-2.25-2.75-2.25H9.25L9.5 13Z"/></svg> },
                    { id:'bank', label:'Bank Transfer', sub:'Direct transfer',
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg> },
                  ].map(m => (
                    <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all text-center ${
                        paymentMethod === m.id ? 'border-[#016837] bg-[#016837]/5' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <span className={paymentMethod === m.id ? 'text-[#016837]' : 'text-gray-400'}>{m.icon}</span>
                      <span className={`text-xs font-medium ${paymentMethod === m.id ? 'text-[#016837]' : 'text-gray-600'}`}>{m.label}</span>
                      <span className="text-xs text-gray-400">{m.sub}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 px-3 py-2 bg-blue-50 rounded-lg text-xs text-blue-600">
                  {paymentMethod === 'card' && 'A secure payment link will be emailed to you after booking.'}
                  {paymentMethod === 'paypal' && 'A PayPal payment request will be sent to your email after booking.'}
                  {paymentMethod === 'bank' && 'Bank details will be emailed after booking. Payment required before assessment.'}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all text-sm">
                  Back
                </button>
                <button type="submit" disabled={loading}
                  className="px-6 py-2.5 bg-[#016837] text-white rounded-lg hover:bg-[#01572E] transition-all text-sm font-medium disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
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