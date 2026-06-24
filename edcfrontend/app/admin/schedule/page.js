"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = 'https://primeepcdesign.co.uk'

// Each day can have its own list of time slots
const DEFAULT_DAY_SLOTS = { startTime: '09:00', endTime: '10:00' }
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function AdminSchedule() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showBulkAdd, setShowBulkAdd] = useState(false)
  const [showBulkUnavailable, setShowBulkUnavailable] = useState(false)
  const [bulkProgress, setBulkProgress] = useState({ active: false, done: 0, total: 0, errors: 0 })

  // Single add
  const [formData, setFormData] = useState({
    date: '', startTime: '09:00', endTime: '10:00', isAvailable: true, maxBookings: 1
  })

  // Bulk add — per-day slots
  // daySlots: { 0: [{startTime, endTime}], 1: [...], ... }
  // dayEnabled: { 0: false, 1: true, ... }
  const [bulkStartDate, setBulkStartDate] = useState('')
  const [bulkEndDate, setBulkEndDate] = useState('')
  const [bulkMaxBookings, setBulkMaxBookings] = useState(1)
  const [dayEnabled, setDayEnabled] = useState({
    0: false, 1: true, 2: true, 3: true, 4: true, 5: true, 6: false
  })
  const [daySlots, setDaySlots] = useState({
    0: [{ startTime: '09:00', endTime: '10:00' }],
    1: [{ startTime: '09:00', endTime: '10:00' }],
    2: [{ startTime: '09:00', endTime: '10:00' }],
    3: [{ startTime: '09:00', endTime: '10:00' }],
    4: [{ startTime: '09:00', endTime: '10:00' }],
    5: [{ startTime: '09:00', endTime: '10:00' }],
    6: [{ startTime: '09:00', endTime: '10:00' }],
  })

  // Bulk unavailable
  const [bulkUnavailData, setBulkUnavailData] = useState({ startDate: '', endDate: '' })

  const router = useRouter()

  useEffect(() => { checkAuth(); fetchSchedules() }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) router.push('/admin/login')
  }

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/api/booking/admin/schedules`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setSchedules(data.data)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  // ── Single Add ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/api/booking/admin/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        setSchedules(prev => [...prev, data.data])
        setShowForm(false)
        setFormData({ date: '', startTime: '09:00', endTime: '10:00', isAvailable: true, maxBookings: 1 })
      } else alert('❌ ' + data.message)
    } catch (e) { alert('❌ ' + e.message) }
  }

  // ── Day slot helpers ──
  const addDaySlot = (dayIdx) => {
    setDaySlots(prev => ({ ...prev, [dayIdx]: [...prev[dayIdx], { startTime: '09:00', endTime: '10:00' }] }))
  }
  const removeDaySlot = (dayIdx, slotIdx) => {
    setDaySlots(prev => ({ ...prev, [dayIdx]: prev[dayIdx].filter((_, i) => i !== slotIdx) }))
  }
  const updateDaySlot = (dayIdx, slotIdx, field, val) => {
    setDaySlots(prev => {
      const slots = [...prev[dayIdx]]
      slots[slotIdx] = { ...slots[slotIdx], [field]: val }
      return { ...prev, [dayIdx]: slots }
    })
  }
  const toggleDay = (dayIdx) => {
    setDayEnabled(prev => ({ ...prev, [dayIdx]: !prev[dayIdx] }))
  }

  // ── Bulk Add ──
  const handleBulkAdd = async () => {
    if (!bulkStartDate || !bulkEndDate) return alert('Please select start and end dates.')
    if (!Object.values(dayEnabled).some(Boolean)) return alert('Enable at least one day.')

    // Generate all slots
    const slotsToAdd = []
    const start = new Date(bulkStartDate)
    const end = new Date(bulkEndDate)
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dow = d.getDay() // 0=Sun
      if (!dayEnabled[dow]) continue
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const dateStr = `${y}-${m}-${day}`
      for (const slot of daySlots[dow]) {
        slotsToAdd.push({ date: dateStr, startTime: slot.startTime, endTime: slot.endTime, isAvailable: true, maxBookings: bulkMaxBookings })
      }
    }

    if (!slotsToAdd.length) return alert('No matching dates found.')
    setShowBulkAdd(false)
    setBulkProgress({ active: true, done: 0, total: slotsToAdd.length, errors: 0 })

    const token = localStorage.getItem('adminToken')
    let done = 0, errors = 0
    const newSchedules = []
    for (const slot of slotsToAdd) {
      try {
        const res = await fetch(`${API_URL}/api/booking/admin/schedules`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(slot)
        })
        const data = await res.json()
        if (data.success) newSchedules.push(data.data); else errors++
      } catch { errors++ }
      done++
      setBulkProgress({ active: true, done, total: slotsToAdd.length, errors })
    }
    setSchedules(prev => [...prev, ...newSchedules])
    setBulkProgress({ active: false, done, total: slotsToAdd.length, errors })
    alert(`✅ Done! Added ${done - errors} slots.${errors ? ` ${errors} skipped (already exist).` : ''}`)
  }

  // ── Bulk Unavailable ──
  const handleBulkUnavailable = async () => {
    const { startDate, endDate } = bulkUnavailData
    if (!startDate || !endDate) return alert('Please select a date range.')
    const inRange = schedules.filter(s => s.date >= startDate && s.date <= endDate && s.isAvailable)
    if (!inRange.length) return alert('No available slots found in that range.')
    if (!confirm(`Mark ${inRange.length} slots unavailable (${startDate} → ${endDate})?`)) return
    setShowBulkUnavailable(false)
    setBulkProgress({ active: true, done: 0, total: inRange.length, errors: 0 })
    const token = localStorage.getItem('adminToken')
    let done = 0, errors = 0
    for (const s of inRange) {
      try {
        const res = await fetch(`${API_URL}/api/booking/admin/schedules/${s.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ isAvailable: false })
        })
        const data = await res.json()
        if (data.success) setSchedules(prev => prev.map(x => x.id === s.id ? { ...x, isAvailable: false } : x))
        else errors++
      } catch { errors++ }
      done++
      setBulkProgress({ active: true, done, total: inRange.length, errors })
    }
    setBulkProgress({ active: false, done, total: inRange.length, errors })
    alert(`✅ Done! ${done - errors} slots marked unavailable.`)
  }

  // ── Single Toggle ──
  const toggleAvailability = async (scheduleId, currentStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/api/booking/admin/schedules/${scheduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ isAvailable: !currentStatus })
      })
      const data = await res.json()
      if (data.success) setSchedules(schedules.map(s => s.id === scheduleId ? data.data : s))
    } catch (e) { console.error(e) }
  }

  // ── Delete ──
  const deleteSchedule = async (scheduleId) => {
    if (!confirm('Delete this slot?')) return
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/api/booking/admin/schedules/${scheduleId}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setSchedules(schedules.filter(s => s.id !== scheduleId))
      else alert('❌ ' + data.message)
    } catch (e) { alert('❌ ' + e.message) }
  }

  const formatTime = (t) => {
    const [h, m] = t.split(':')
    const hour = parseInt(h)
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
  }
  const formatDateDisplay = (ds) => {
    const [y, m, d] = ds.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }
  const getTodayDate = () => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Progress Overlay */}
      {bulkProgress.active && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="font-semibold text-gray-800 mb-1">Processing...</p>
            <p className="text-gray-500 text-sm">{bulkProgress.done} / {bulkProgress.total} slots</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${(bulkProgress.done / bulkProgress.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Schedule Management</h1>
              <span className="text-xs text-gray-500 sm:ml-2">Prime EPC &amp; Design Consultants</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 text-sm font-medium">
                + Single Slot
              </button>
              <button onClick={() => setShowBulkAdd(true)} className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                ⚡ Bulk Add
              </button>
              <button onClick={() => setShowBulkUnavailable(true)} className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 text-sm font-medium">
                🚫 Bulk Unavailable
              </button>
              <button onClick={() => router.push('/admin/dashboard')} className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 text-sm font-medium">
                ← Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-4 sm:py-6 px-4 sm:px-6">

        {/* ── Single Add Modal ── */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Add Single Slot</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input type="date" required min={getTodayDate()} value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                    <input type="time" required value={formData.startTime}
                      onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                    <input type="time" required value={formData.endTime}
                      onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Bookings</label>
                  <input type="number" min="1" value={formData.maxBookings}
                    onChange={e => setFormData({ ...formData, maxBookings: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isAvail" checked={formData.isAvailable}
                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-green-600" />
                  <label htmlFor="isAvail" className="text-sm text-gray-700">Available for booking</label>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Add Slot</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Bulk Add Modal — per-day slots ── */}
        {showBulkAdd && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-5 w-full max-w-xl max-h-[92vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">⚡ Bulk Add Slots</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Set date range — each day can have its own time slots</p>
                </div>
                <button onClick={() => setShowBulkAdd(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>

              <div className="space-y-5">
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                    <input type="date" min={getTodayDate()} value={bulkStartDate}
                      onChange={e => setBulkStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                    <input type="date" min={bulkStartDate || getTodayDate()} value={bulkEndDate}
                      onChange={e => setBulkEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                {/* Max Bookings */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Max Bookings per Slot:</label>
                  <input type="number" min="1" value={bulkMaxBookings}
                    onChange={e => setBulkMaxBookings(parseInt(e.target.value))}
                    className="w-20 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>

                {/* Per-day slots */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Days &amp; Time Slots</p>
                  <div className="space-y-3">
                    {DAY_NAMES.map((name, dayIdx) => (
                      <div key={dayIdx} className={`border rounded-lg overflow-hidden transition-all ${dayEnabled[dayIdx] ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 bg-gray-50'}`}>
                        {/* Day header */}
                        <div className="flex items-center gap-3 px-3 py-2">
                          <button type="button" onClick={() => toggleDay(dayIdx)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                              dayEnabled[dayIdx] ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-300'
                            }`}>
                            {name}
                          </button>
                          {dayEnabled[dayIdx] ? (
                            <span className="text-xs text-blue-600 font-medium">{daySlots[dayIdx].length} slot{daySlots[dayIdx].length > 1 ? 's' : ''}</span>
                          ) : (
                            <span className="text-xs text-gray-400">Off — click to enable</span>
                          )}
                          {dayEnabled[dayIdx] && (
                            <button type="button" onClick={() => addDaySlot(dayIdx)}
                              className="ml-auto text-xs text-blue-600 hover:underline font-medium">
                              + Add time
                            </button>
                          )}
                        </div>
                        {/* Time slots for this day */}
                        {dayEnabled[dayIdx] && (
                          <div className="px-3 pb-3 space-y-2">
                            {daySlots[dayIdx].map((slot, slotIdx) => (
                              <div key={slotIdx} className="flex items-center gap-2">
                                <input type="time" value={slot.startTime}
                                  onChange={e => updateDaySlot(dayIdx, slotIdx, 'startTime', e.target.value)}
                                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
                                <span className="text-gray-400 text-xs">to</span>
                                <input type="time" value={slot.endTime}
                                  onChange={e => updateDaySlot(dayIdx, slotIdx, 'endTime', e.target.value)}
                                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
                                {daySlots[dayIdx].length > 1 && (
                                  <button type="button" onClick={() => removeDaySlot(dayIdx, slotIdx)}
                                    className="text-red-400 hover:text-red-600 text-lg leading-none w-5 text-center">×</button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setShowBulkAdd(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="button" onClick={handleBulkAdd} className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                    ⚡ Generate All Slots
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Bulk Unavailable Modal ── */}
        {showBulkUnavailable && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-5 w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">🚫 Bulk Unavailable</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Mark all slots in a date range as unavailable</p>
                </div>
                <button onClick={() => setShowBulkUnavailable(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input type="date" value={bulkUnavailData.startDate}
                    onChange={e => setBulkUnavailData(p => ({ ...p, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <input type="date" min={bulkUnavailData.startDate} value={bulkUnavailData.endDate}
                    onChange={e => setBulkUnavailData(p => ({ ...p, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-700">
                  All <strong>available</strong> slots in this range will be marked unavailable. Existing bookings are not affected. You can re-enable them one by one from the table.
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                  <button type="button" onClick={() => setShowBulkUnavailable(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="button" onClick={handleBulkUnavailable} className="px-5 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600">
                    🚫 Mark Unavailable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Time Slots</h3>
            <p className="mt-1 text-sm text-gray-500">
              {schedules.length} total — {schedules.filter(s => s.isAvailable).length} available
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 text-sm">Loading...</p>
            </div>
          ) : schedules.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-gray-500 mb-4">No schedules yet.</p>
              <button onClick={() => setShowBulkAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">⚡ Bulk Add Slots</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap min-w-[150px]">Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap min-w-[140px]">Time</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap min-w-[90px]">Bookings</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap min-w-[100px]">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap min-w-[180px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">{formatDateDisplay(schedule.date)}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">{formatTime(schedule.startTime)} – {formatTime(schedule.endTime)}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">{schedule.currentBookings} / {schedule.maxBookings}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${schedule.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {schedule.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleAvailability(schedule.id, schedule.isAvailable)}
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                              schedule.isAvailable
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}>
                            {schedule.isAvailable ? 'Make Unavailable' : 'Make Available'}
                          </button>
                          <button onClick={() => deleteSchedule(schedule.id)}
                            className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {schedules.length > 0 && (
          <div className="mt-3 text-center sm:hidden">
            <p className="text-xs text-gray-400">← Scroll to see more →</p>
          </div>
        )}
      </main>
    </div>
  )
}