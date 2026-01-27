"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Select slot, 2: Form
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAreasBox, setShowAreasBox] = useState(false)
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

  // Options based on property type
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

  // Areas data
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

  // Fetch all available slots on component mount
  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    setLoading(true)
    try {
      const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/booking/available-slots-all')
      const data = await response.json()

      console.log('📊 Raw API data:', data.data); // Debug

      if (data.success) {
        // Group slots by date
        const groupedByDate = data.data.reduce((acc, slot) => {
          if (!acc[slot.date]) {
            acc[slot.date] = []
          }
          acc[slot.date].push(slot)
          return acc
        }, {})

        // Convert to array and sort by date - FIXED DATE CREATION
        const slotsArray = Object.entries(groupedByDate)
          .map(([date, slots]) => {
            // FIX: Create date object without timezone issues
            const [year, month, day] = date.split('-').map(Number);
            const dateObj = new Date(year, month - 1, day); // month is 0-indexed
            
            return {
              date,
              dateObj: dateObj,
              slots: slots.sort((a, b) => a.startTime.localeCompare(b.startTime))
            }
          })
          .sort((a, b) => a.dateObj - b.dateObj)

        console.log('📅 Processed dates:', slotsArray.map(item => ({
          storedDate: item.date,
          displayDate: item.dateObj.toDateString()
        }))); // Debug

        setAvailableSlots(slotsArray)
        // Auto-select first date if available
        if (slotsArray.length > 0) {
          setSelectedDate(slotsArray[0])
        }
      } else {
        alert('Error fetching available slots')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Network error. Please try again.')
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
    
    // If property type changes, reset property details
    if (name === 'propertyType') {
      setFormData({
        ...formData,
        [name]: value,
        propertyDetails: '' // Reset property details when type changes
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookingData = {
        ...formData,
        preferredDate: `${selectedSlot.dateData.date}T${selectedSlot.startTime}`,
        slotId: selectedSlot.id
      }

      const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Booking created successfully! We will contact you soon.')
        router.push('/')
      } else {
        alert('Error creating booking: ' + data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Network error. Please try again.')
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

  const formatDate = (dateObj) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // FIX: Compare dates properly
    const inputDate = new Date(dateObj);
    inputDate.setHours(0, 0, 0, 0);
    
    if (inputDate.getTime() === today.getTime()) {
      return 'Today'
    } else if (inputDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow'
    } else {
      return inputDate.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  // FIX: Format date for display without timezone issues
  const formatDateDisplay = (dateObj) => {
    const date = new Date(dateObj);
    return date.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Get day of week
  const getDayOfWeek = (dateObj) => {
    const date = new Date(dateObj);
    return date.toLocaleDateString('en-GB', { weekday: 'short' });
  }

  // Get day number
  const getDayNumber = (dateObj) => {
    const date = new Date(dateObj);
    return date.getDate();
  }

  // Get month name
  const getMonthName = (dateObj) => {
    const date = new Date(dateObj);
    return date.toLocaleDateString('en-GB', { month: 'short' });
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
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">
            Book Your EPC Assessment
          </h1>
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

        {/* Areas Covered Popup Box */}
        {showAreasBox && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="bg-[#016837]  text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Areas We Cover</h2>
                <button
                  onClick={() => setShowAreasBox(false)}
                  className="text-white hover:text-gray-200 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  ×
                </button>
              </div>
              
              {/* Content */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {areas.map((area, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-[#F8F8F8] to-white border border-[#80C531]/20 rounded-xl hover:border-[#016837] hover:shadow-lg transition-all duration-300"
                    >
                      <span className="text-[#282828] font-semibold text-lg">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl text-xl font-bold transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-[#016837]  text-white shadow-lg' 
                    : 'bg-[#016837]   border border-[#80C531]/20 text-white opacity-90'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 2 && (
                  <div className={`w-24 h-0.5 transition-all duration-300 ${
                    step > stepNumber ? 'bg-gradient-to-r from-[#016837] to-[#80C531]' : 'bg-[#282828]'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-lg text-[#282828] opacity-90 max-w-xs mx-auto">
            <span className="font-semibold">Select Time Slot</span>
            <span className="font-semibold">Your Details</span>
          </div>
        </div>

        {/* Step 1: Slot Selection */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-lg border border-[#80C531]/20 p-8">
            <h2 className="text-2xl font-bold text-[#282828] mb-8">
              Available Time Slots
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#016837] mx-auto"></div>
                <p className="mt-6 text-lg text-[#282828] opacity-90">Loading available slots...</p>
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="space-y-8">
                {/* Calendar Style Date Selection */}
                <div className="mb-8">
                  <div className="flex overflow-x-auto pb-6 space-x-4 scrollbar-hide">
                    {availableSlots.map((dateData) => (
                      <button
                        key={dateData.date}
                        onClick={() => setSelectedDate(dateData)}
                        className={`flex flex-col items-center justify-center p-5 min-w-[100px] rounded-2xl border-2 transition-all duration-300 ${
                          selectedDate && selectedDate.date === dateData.date
                            ? 'border-[#016837] bg-gradient-to-br from-[#016837]/10 to-[#80C531]/5 text-[#016837] shadow-lg'
                            : 'border-[#80C531]/20 bg-white text-[#282828] hover:border-[#016837] hover:shadow-lg'
                        }`}
                      >
                        <div className="text-sm font-semibold uppercase tracking-wide">
                          {getDayOfWeek(dateData.dateObj)}
                        </div>
                        <div className="text-3xl font-bold mt-2">
                          {getDayNumber(dateData.dateObj)}
                        </div>
                        <div className="text-sm font-semibold mt-2">
                          {getMonthName(dateData.dateObj)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots for Selected Date */}
                {selectedDate && (
                  <div className="border border-[#80C531]/20 rounded-2xl overflow-hidden">
                    {/* Date Header */}
                    <div className="bg-gradient-to-r from-[#016837]/10 to-[#80C531]/10 px-8 py-6 border-b border-[#80C531]/20">
                      <h3 className="text-xl font-bold text-[#016837]">
                        {formatDate(selectedDate.dateObj)}
                      </h3>
                      <p className="text-lg text-[#282828] opacity-90 mt-1">
                        {formatDateDisplay(selectedDate.dateObj)}
                      </p>
                    </div>
                    
                    {/* Time Slots Grid */}
                    <div className="p-8">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {selectedDate.slots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot, selectedDate)}
                            className="flex flex-col items-center justify-center p-5 border-2 border-[#80C531]/30 bg-gradient-to-br from-white to-[#F8F8F8] rounded-xl hover:border-[#016837] hover:bg-gradient-to-br hover:from-[#016837]/5 hover:to-[#80C531]/5 hover:shadow-lg transition-all duration-300 group"
                          >
                            <div className="text-lg font-bold text-[#016837] group-hover:text-[#01572E]">
                              {formatTime(slot.startTime)}-{formatTime(slot.endTime)}
                            </div>
                            <div className="text-sm text-[#80C531] mt-2 font-semibold">
                              Available
                            </div>
                            {slot.currentBookings > 0 && (
                              <div className="text-xs text-[#282828] opacity-90 mt-2">
                                {slot.maxBookings - slot.currentBookings} slots left
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-[#80C531] text-8xl mb-6">📅</div>
                <h3 className="text-2xl font-bold text-[#282828] mb-4">
                  No Available Slots
                </h3>
                <p className="text-lg text-[#282828] opacity-90 mb-6">
                  There are no available time slots at the moment.
                </p>
                <p className="text-base text-[#282828] opacity-80 mb-8">
                  Please check back later or contact us for special arrangements.
                </p>
                <div className="space-y-3 text-lg text-[#282828] opacity-90 mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-full flex items-center justify-center text-white">
                      📞
                    </div>
                    <span className="font-semibold">+44 7469 340373</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-full flex items-center justify-center text-white">
                      📧
                    </div>
                    <span className="font-semibold">Primeepc.design@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={fetchAvailableSlots}
                  className="bg-gradient-to-r from-[#016837] to-[#80C531] text-white px-8 py-3 rounded-xl hover:from-[#01572E] hover:to-[#70B52B] transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  Refresh Availability
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Booking Form */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-lg border border-[#80C531]/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#282828]">
                Your Details
              </h2>
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

            {/* Selected Appointment Summary */}
            <div className="mb-8 p-6 bg-gradient-to-r from-[#016837]/10 to-[#80C531]/5 rounded-2xl border-2 border-[#80C531]/30">
              <p className="text-[#016837] font-bold text-lg mb-3">
                Selected Appointment
              </p>
              <p className="text-[#016837] text-2xl font-bold">
                {formatDateDisplay(selectedSlot.dateData.dateObj)}
              </p>
              <p className="text-[#016837] text-xl font-semibold mt-2">
                at {formatTime(selectedSlot.startTime)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-[#282828] mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-[#282828] mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold text-[#282828] mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="+44 1234 567890"
                  />
                </div>

                {/* NEW FIELD: Postcode */}
                <div>
                  <label htmlFor="postcode" className="block text-lg font-semibold text-[#282828] mb-3">
                    Postcode of the property *
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                    placeholder="e.g., M1 1AB"
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-lg font-semibold text-[#282828] mb-3">
                    Property Type *
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] bg-white"
                  >
                    <option value="domestic" className="text-[#282828]">Domestic Property</option>
                    <option value="commercial" className="text-[#282828]">Commercial Property</option>
                  </select>
                </div>

                {/* Conditional Property Details Field */}
                <div>
                  <label htmlFor="propertyDetails" className="block text-lg font-semibold text-[#282828] mb-3">
                    {formData.propertyType === 'domestic' ? 'Select Bedroom Option *' : 'Select Area Option *'}
                  </label>
                  <select
                    id="propertyDetails"
                    name="propertyDetails"
                    required
                    value={formData.propertyDetails}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] bg-white"
                  >
                    {formData.propertyType === 'domestic' ? (
                      domesticOptions.map((option, index) => (
                        <option key={index} value={option.value} className="text-[#282828]">
                          {option.label}
                        </option>
                      ))
                    ) : (
                      commercialOptions.map((option, index) => (
                        <option key={index} value={option.value} className="text-[#282828]">
                          {option.label}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="propertyAddress" className="block text-lg font-semibold text-[#282828] mb-3">
                  Property Address *
                </label>
                <textarea
                  id="propertyAddress"
                  name="propertyAddress"
                  required
                  rows={4}
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                  placeholder="Full address including street, city, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-[#282828] mb-3">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#80C531]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                  placeholder="Any special instructions or questions..."
                />
              </div>

              <div className="flex justify-end space-x-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-3 border-2 border-[#80C531]/30 text-[#282828] rounded-xl hover:border-[#016837] hover:bg-[#F8F8F8] transition-all duration-300 font-semibold shadow-lg"
                >
                  Back to Slots
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[#016837] to-[#80C531] text-white rounded-xl hover:from-[#01572E] hover:to-[#70B52B] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </div>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}