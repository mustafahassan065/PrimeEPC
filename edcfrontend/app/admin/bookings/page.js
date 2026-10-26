"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'https://primeepcdesign.co.uk'

const pad2 = n => String(n).padStart(2, '0')
const gbp  = n => '£' + (Number(n) || 0).toFixed(2)

const fmtDate = iso => {
  if (!iso) return ''
  const d = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}
const fmtTime = t => {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hh = h % 12 === 0 ? 12 : h % 12
  return `${hh}:${pad2(m)} ${ampm}`
}

// ── Invoice Preview — exactly the client-approved design ──────────────────
function InvoicePreview({ d }) {
  const subtotal = d.items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.unitPrice) || 0), 0)
  const vatAmt   = subtotal * (Number(d.vatRate) || 0) / 100
  const total    = subtotal + vatAmt
  const DARK = '#0B3D22', GREEN = '#0E6B38', LIGHT = '#8DC63F', BORDER = '#d7e8dc'

  return (
    <div style={{ width: 760, background: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', color: '#1a1a1a' }}>

      {/* ── Header: logo + INVOICE ── */}
      <div style={{ display: 'table', width: '100%', padding: '28px 36px 8px' }}>
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="/images/logo3.png" alt="Prime EPC" crossOrigin="anonymous" style={{ width: 90, height: 90, objectFit: 'contain', flexShrink: 0 }} />
            
          </div>
        </div>
        <div style={{ display: 'table-cell', verticalAlign: 'top', textAlign: 'right' }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: '#111', letterSpacing: 2 }}>INVOICE</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#333', marginTop: 6 }}>{d.invoiceNo}</div>
        </div>
      </div>

      {/* ── Company info + meta box ── */}
      <div style={{ display: 'table', width: '100%', padding: '14px 36px 0' }}>
        <div style={{ display: 'table-cell', verticalAlign: 'top', width: '48%' }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: DARK }}>{d.companyName}</div>
          {d.companyAddress.split('\n').map((l, i) => (
            <div key={i} style={{ fontSize: 13, color: '#444', lineHeight: 1.55 }}>{l}</div>
          ))}
          <div style={{ marginTop: 10, fontSize: 13 }}>
            <span style={{ fontWeight: 800, color: DARK }}>Phone:</span>
            <span style={{ color: '#16a34a', fontWeight: 700, marginLeft: 8 }}>{d.companyPhone}</span>
          </div>
          <div style={{ fontSize: 13, marginTop: 3 }}>
            <span style={{ fontWeight: 800, color: DARK }}>Email:</span>
            <span style={{ color: '#16a34a', fontWeight: 700, marginLeft: 8 }}>{d.companyEmail}</span>
          </div>
          <div style={{ fontSize: 13, marginTop: 3 }}>
            <span style={{ fontWeight: 800, color: DARK }}>Website:</span>
            <span style={{ color: '#16a34a', fontWeight: 700, marginLeft: 8 }}>{d.companyWebsite}</span>
          </div>
        </div>
        <div style={{ display: 'table-cell', verticalAlign: 'top', textAlign: 'right' }}>
          <div style={{ display: 'inline-block', border: '1px solid ' + BORDER, borderRadius: 10, padding: '16px 22px', textAlign: 'left', minWidth: 290 }}>
            {[
              ['Invoice Date:', fmtDate(d.invoiceDate)],
              ['Due Date:', fmtDate(d.dueDate)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'table', width: '100%', marginBottom: 8 }}>
                <div style={{ display: 'table-cell', fontSize: 14, fontWeight: 800, color: '#111' }}>{k}</div>
                <div style={{ display: 'table-cell', fontSize: 14, color: '#333', textAlign: 'right' }}>{v}</div>
              </div>
            ))}
            <div style={{ display: 'table', width: '100%', marginBottom: 8 }}>
              <div style={{ display: 'table-cell', fontSize: 14, fontWeight: 800, color: '#111' }}>Payment Status:</div>
              <div style={{ display: 'table-cell', fontSize: 14, fontWeight: 800, color: d.status === 'Paid' ? '#22c55e' : '#eab308', textAlign: 'right' }}>{d.status}</div>
            </div>
            <div style={{ display: 'table', width: '100%' }}>
              <div style={{ display: 'table-cell', fontSize: 14, fontWeight: 800, color: '#111' }}>Payment Method:</div>
              <div style={{ display: 'table-cell', fontSize: 14, color: '#333', textAlign: 'right' }}>{d.paymentMethod}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bill To + Appointment Details ── */}
      <div style={{ display: 'table', width: '100%', padding: '26px 36px 0' }}>
        <div style={{ display: 'table-cell', verticalAlign: 'top', width: '42%', paddingRight: 24 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 8 }}>Bill To:</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{d.billName}</div>
          {d.billAddress.split('\n').map((l, i) => (
            <div key={i} style={{ fontSize: 13, color: '#444', lineHeight: 1.55 }}>{l}</div>
          ))}
          <div style={{ marginTop: 10, fontSize: 13 }}>
            <span style={{ fontWeight: 800, color: DARK }}>Email:</span>
            <span style={{ color: '#16a34a', fontWeight: 700, marginLeft: 8 }}>{d.billEmail}</span>
          </div>
          <div style={{ fontSize: 13, marginTop: 3 }}>
            <span style={{ fontWeight: 800, color: DARK }}>Phone:</span>
            <span style={{ color: '#16a34a', fontWeight: 700, marginLeft: 8 }}>{d.billPhone}</span>
          </div>
        </div>
        <div style={{ display: 'table-cell', verticalAlign: 'top', borderLeft: '2px solid ' + LIGHT, paddingLeft: 24 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 8 }}>Appointment Details:</div>
          {[
            ['Service Type:', d.serviceType],
            ['Appointment Date:', fmtDate(d.apptDate)],
            ['Appointment Time:', fmtTime(d.apptTime)],
            ['Property Address:', d.propertyAddress],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'table', width: '100%', marginBottom: 7 }}>
              <div style={{ display: 'table-cell', fontSize: 13.5, fontWeight: 800, color: '#111' }}>{k}</div>
              <div style={{ display: 'table-cell', fontSize: 13.5, color: '#333', textAlign: 'right' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Items table ── */}
      <div style={{ padding: '26px 36px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid ' + BORDER, borderRadius: 10, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#eaf5ec' }}>
              <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: 13.5, fontWeight: 800, color: DARK, width: 40 }}>#</th>
              <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: 13.5, fontWeight: 800, color: DARK }}>Description</th>
              <th style={{ padding: '11px 14px', textAlign: 'center', fontSize: 13.5, fontWeight: 800, color: DARK, width: 60 }}>Qty</th>
              <th style={{ padding: '11px 14px', textAlign: 'right', fontSize: 13.5, fontWeight: 800, color: DARK, width: 110 }}>Unit Price</th>
              <th style={{ padding: '11px 14px', textAlign: 'right', fontSize: 13.5, fontWeight: 800, color: DARK, width: 110 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {d.items.map((it, i) => (
              <tr key={i} style={{ borderTop: '1px solid ' + BORDER }}>
                <td style={{ padding: '13px 14px', fontSize: 13 }}>{i + 1}</td>
                <td style={{ padding: '13px 14px', fontSize: 13.5 }}>{it.description}</td>
                <td style={{ padding: '13px 14px', fontSize: 13.5, textAlign: 'center' }}>{it.qty}</td>
                <td style={{ padding: '13px 14px', fontSize: 13.5, textAlign: 'right' }}>{gbp(it.unitPrice)}</td>
                <td style={{ padding: '13px 14px', fontSize: 13.5, textAlign: 'right' }}>{gbp((Number(it.qty) || 0) * (Number(it.unitPrice) || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Totals ── */}
      <div style={{ padding: '18px 36px 0' }}>
        <div style={{ display: 'table', width: '100%' }}>
          <div style={{ display: 'table-cell' }}/>
          <div style={{ display: 'table-cell', width: 280, textAlign: 'right' }}>
            <div style={{ display: 'table', width: '100%', marginBottom: 8 }}>
              <div style={{ display: 'table-cell', fontSize: 15, fontWeight: 800, color: DARK, textAlign: 'left' }}>Subtotal</div>
              <div style={{ display: 'table-cell', fontSize: 15, fontWeight: 800, color: DARK, textAlign: 'right' }}>{gbp(subtotal)}</div>
            </div>
            <div style={{ display: 'table', width: '100%', marginBottom: 12 }}>
              <div style={{ display: 'table-cell', fontSize: 15, fontWeight: 800, color: DARK, textAlign: 'left' }}>VAT ({Number(d.vatRate) || 0}%)</div>
              <div style={{ display: 'table-cell', fontSize: 15, fontWeight: 800, color: DARK, textAlign: 'right' }}>{gbp(vatAmt)}</div>
            </div>
            <div style={{ background: DARK, borderRadius: 8, padding: '14px 22px', display: 'table', width: '100%' }}>
              <div style={{ display: 'table-cell', fontSize: 19, fontWeight: 900, color: '#fff', textAlign: 'left' }}>Total</div>
              <div style={{ display: 'table-cell', fontSize: 22, fontWeight: 900, color: '#fff', textAlign: 'right' }}>{gbp(total)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notes + Thank you ── */}
      <div style={{ display: 'table', width: '100%', padding: '28px 36px 10px' }}>
        <div style={{ display: 'table-cell', verticalAlign: 'top' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 8 }}>Notes:</div>
          {d.notes.split('\n').map((l, i) => (
            <div key={i} style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{l}</div>
          ))}
        </div>
        <div style={{ display: 'table-cell', verticalAlign: 'bottom', textAlign: 'right', width: 260 }}>
          <div style={{ fontFamily: "'Brush Script MT','Segoe Script',cursive", fontSize: 42, color: GREEN, transform: 'rotate(-6deg)', display: 'inline-block' }}>Thank you!</div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ margin: '26px 36px 0', background: DARK, borderRadius: '10px 10px 0 0', padding: '20px 28px', display: 'table', width: 'calc(100% - 72px)' }}>
        <div style={{ display: 'table-cell', verticalAlign: 'middle', width: 44 }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 4 5.5V11c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5.5L12 2z" stroke={LIGHT} strokeWidth="1.8" fill="rgba(141,198,63,0.15)"/>
            <path d="m8.5 11.5 2.4 2.4 4.6-4.8" stroke={LIGHT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ display: 'table-cell', verticalAlign: 'middle', paddingLeft: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff' }}>Professional. Reliable. Certified.</div>
          <div style={{ fontSize: 12, color: '#cfe3d4', marginTop: 2 }}>Your home energy assessment partner for a more sustainable tomorrow.</div>
        </div>
      </div>
      <div style={{ margin: '0 36px 30px', background: DARK, borderTop: '1px solid rgba(141,198,63,0.5)', padding: '12px 28px 16px', textAlign: 'center', borderRadius: '0 0 10px 10px' }}>
        <span style={{ fontSize: 12, color: '#cfe3d4' }}>Privacy Policy</span>
        <span style={{ color: LIGHT, margin: '0 14px' }}>|</span>
        <span style={{ fontSize: 12, color: '#cfe3d4' }}>Terms &amp; Conditions</span>
      </div>
    </div>
  )
}

export default function AdminBookings() {
  const [bookings, setBookings]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [sessionExpired, setSessionExpired] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expanded, setExpanded]     = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [editBooking, setEditBooking]   = useState(null)
  const [editForm, setEditForm]         = useState({})
  const [editLoading, setEditLoading]   = useState(false)

  // ── Invoice editor state ──
  const [invBooking, setInvBooking] = useState(null)
  const [inv, setInv]               = useState(null)
  const [invSending, setInvSending] = useState(false)
  const [invTab, setInvTab]         = useState('edit')

  const router = useRouter()

  const handleAuthError = useCallback(() => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setSessionExpired(true)
    setLoading(false)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchBookings(token)
  }, [router])

  const fetchBookings = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/booking/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.status === 401 || res.status === 403) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) setBookings(data.data)
      else setError('Failed to fetch bookings')
    } catch { setError('Unable to connect to server.') }
    finally { setLoading(false) }
  }

  const updateStatus = async (bookingId, status) => {
    const token = localStorage.getItem('adminToken')
    try {
      const res = await fetch(`${API_URL}/api/booking/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({ status })
      })
      if (res.status === 401) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b))
    } catch { alert('Failed to update. Please try again.') }
  }

  const deleteBooking = async (bookingId, customerName) => {
    if (!confirm(`Delete booking for ${customerName}? This cannot be undone.`)) return
    const token = localStorage.getItem('adminToken')
    try {
      const res = await fetch(`${API_URL}/api/booking/admin/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization:`Bearer ${token}` }
      })
      if (res.status === 401) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) setBookings(bookings.filter(b => b.id !== bookingId))
      else alert('Failed to delete booking.')
    } catch { alert('Unable to connect. Please try again.') }
  }

  const openInvoice = (b) => {
    const d = b.preferredDate ? new Date(b.preferredDate) : new Date()
    const dateISO = d.toISOString().slice(0, 10)
    const timeISO = `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`
    const numericId = (String(b.id || '').replace(/\D/g, '').slice(-4)) || String(Date.now() % 10000)
    const invNo = `INV-${new Date().getFullYear()}-${numericId.padStart(4, '0')}`
    const addr = [b.propertyAddress, b.postcode].filter(Boolean).join(', ')

    setInv({
      invoiceNo: invNo,
      invoiceDate: new Date().toISOString().slice(0, 10),
      dueDate: dateISO,
      status: b.paymentStatus === 'paid' ? 'Paid' : 'Unpaid',
      paymentMethod: ({ cash:'Cash', stripe:'Bank Card', paypal:'PayPal', bank_transfer:'Bank Transfer' })[b.paymentMethod] || (b.paymentMethod || 'Bank Transfer'),
      companyName: 'Prime EPC & Design Consultant Ltd',
      companyAddress: '17 Bromwich Street, Bolton, BL2 1JF',
      companyPhone: '020 7946 0568',
      companyEmail: 'info@primeepcdesign.co.uk',
      companyWebsite: 'www.primeepcdesign.co.uk',
      billName:  b.name || '',
      billEmail: b.email || '',
      billPhone: b.phone || '',
      billAddress: addr,
      serviceType: b.propertyDetails || (b.propertyType ? `${b.propertyType.charAt(0).toUpperCase() + b.propertyType.slice(1)} EPC` : 'EPC (Domestic)'),
      apptDate: dateISO,
      apptTime: timeISO,
      propertyAddress: addr,
      items: [{
        description: b.propertyDetails || `${b.propertyType || 'Domestic'} EPC Assessment`,
        qty: 1,
        unitPrice: Number(b.amount) || 80
      }],
      vatRate: 0,
      notes: 'Thank you for choosing Prime EPC.\nIf you have any questions, please contact us.',
    })
    setInvBooking(b)
    setInvTab('edit')
  }

  const invSet = (k, v) => setInv(prev => ({ ...prev, [k]: v }))
  const invItemSet = (i, k, v) => setInv(prev => {
    const items = [...prev.items]
    items[i] = { ...items[i], [k]: (k === 'qty' || k === 'unitPrice') ? (Number(v) || 0) : v }
    return { ...prev, items }
  })
  const addItem    = () => setInv(prev => ({ ...prev, items: [...prev.items, { description: '', qty: 1, unitPrice: 0 }] }))
  const removeItem = i => setInv(prev => ({ ...prev, items: prev.items.filter((_, x) => x !== i) }))

  const invSubtotal = inv ? inv.items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.unitPrice) || 0), 0) : 0
  const invVat      = inv ? invSubtotal * (Number(inv.vatRate) || 0) / 100 : 0
  const invTotal    = invSubtotal + invVat

  const sendInvoicePdf = async () => {
    if (!inv || !invBooking) return
    if (!inv.billEmail) { alert('Customer email address is missing.'); return }
    if (!window.confirm(`Send invoice ${inv.invoiceNo} (${gbp(invTotal)}) to ${inv.billEmail}?`)) return
    setInvSending(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF }   = await import('jspdf')

      const el = document.getElementById('invoice-capture')
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false })

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pw = pdf.internal.pageSize.getWidth()
      const ph = pdf.internal.pageSize.getHeight()
      const imgW = pw
      const imgH = canvas.height * imgW / canvas.width

      if (imgH <= ph) {
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgW, imgH)
      } else {
        const pageH = Math.floor(canvas.width * ph / imgW)
        let rendered = 0, page = 0
        while (rendered < canvas.height) {
          const slice = document.createElement('canvas')
          slice.width  = canvas.width
          slice.height = Math.min(pageH, canvas.height - rendered)
          const ctx = slice.getContext('2d')
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, slice.width, slice.height)
          ctx.drawImage(canvas, 0, rendered, canvas.width, slice.height, 0, 0, canvas.width, slice.height)
          const sliceH = slice.height * imgW / slice.width
          if (page > 0) pdf.addPage()
          pdf.addImage(slice.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgW, sliceH)
          rendered += slice.height
          page++
        }
      }

      const pdfBase64 = pdf.output('datauristring').split(',')[1]

      const res = await fetch(`${API_URL}/api/email/send-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            inv.billName,
          email:           inv.billEmail,
          phone:           inv.billPhone,
          propertyType:    invBooking.propertyType,
          propertyDetails: inv.serviceType,
          propertyAddress: invBooking.propertyAddress,
          postcode:        invBooking.postcode,
          preferredDate:   invBooking.preferredDate,
          paymentMethod:   invBooking.paymentMethod || 'cash',
          paymentStatus:   inv.status === 'Paid' ? 'paid' : 'pending',
          amount:          invTotal,
          paymentRef:      invBooking.paymentRef || '',
          invoiceNo:       inv.invoiceNo,
          pdfBase64
        })
      })
      const data = await res.json()
      if (data.success) {
        alert(`✅ Invoice ${inv.invoiceNo} Sent: ${inv.billEmail}`)
        setInvBooking(null)
        setInv(null)
      } else {
        alert('❌ Failed to send invoice: ' + (data.message || 'unknown error'))
      }
    } catch (e) {
      console.error('Invoice PDF error:', e)
      alert('❌ Failed to generate the PDF. Please try again.')
    } finally { setInvSending(false) }
  }

  const openEdit = (b) => {
    setEditBooking(b)
    const d = new Date(b.preferredDate)
    const dateStr = d.toISOString().split('T')[0]
    const timeStr = d.toISOString().split('T')[1].slice(0,5)
    setEditForm({
      name: b.name || '',
      email: b.email || '',
      phone: b.phone || '',
      propertyType: b.propertyType || 'domestic',
      propertyDetails: b.propertyDetails || '',
      propertyAddress: b.propertyAddress || '',
      postcode: b.postcode || '',
      date: dateStr,
      time: timeStr,
      paymentMethod: b.paymentMethod || 'cash',
      amount: b.amount || 0,
      status: b.status || 'pending',
    })
  }

  const saveEdit = async () => {
    if (!editBooking) return
    setEditLoading(true)
    const token = localStorage.getItem('adminToken')
    try {
      const preferredDate = editForm.date && editForm.time
        ? `${editForm.date}T${editForm.time}`
        : editForm.date
      const res = await fetch(`${API_URL}/api/booking/admin/bookings/${editBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({
          name:            editForm.name,
          email:           editForm.email,
          phone:           editForm.phone,
          propertyType:    editForm.propertyType,
          propertyDetails: editForm.propertyDetails,
          propertyAddress: editForm.propertyAddress,
          postcode:        editForm.postcode,
          preferredDate,
          paymentMethod:   editForm.paymentMethod,
          amount:          editForm.amount,
          status:          editForm.status,
        })
      })
      if (res.status === 401) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) {
        setBookings(bookings.map(b => b.id === editBooking.id
          ? { ...b, ...editForm, preferredDate }
          : b
        ))
        setEditBooking(null)

        if (editForm.email) {
          try {
            await fetch(`${API_URL}/api/email/send-booking-update`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name:            editForm.name,
                email:           editForm.email,
                phone:           editForm.phone,
                propertyType:    editForm.propertyType,
                propertyDetails: editForm.propertyDetails,
                propertyAddress: editForm.propertyAddress,
                postcode:        editForm.postcode,
                preferredDate,
                paymentMethod:   editForm.paymentMethod,
                amount:          editForm.amount,
                status:          editForm.status,
              })
            })
          } catch { /* ignore email error */ }
        }

      } else alert('Failed to update: ' + data.message)
    } catch { alert('Unable to connect. Please try again.') }
    finally { setEditLoading(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  const sortedBookings = [...bookings].sort((a, b) => new Date(b.preferredDate) - new Date(a.preferredDate))
  const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000

  const filteredBookings = activeFilter === 'all'
    ? sortedBookings
    : activeFilter === 'total'
    ? sortedBookings
    : activeFilter === 'recent'
    ? sortedBookings.filter(b => new Date(b.preferredDate).getTime() >= twoDaysAgo)
    : sortedBookings.filter(b => b.status === activeFilter)

  const endTimeOf = (b) => b.slot?.endTime || b.endTime || null

  const statusColor = (s) => ({
    confirmed: 'bg-green-100 text-green-700',
    completed:  'bg-blue-100 text-blue-700',
    cancelled:  'bg-red-100 text-red-700',
    pending:    'bg-yellow-100 text-yellow-700'
  }[s] || 'bg-gray-100 text-gray-600')

  const avatarColor = (name) => {
    const colors = ['bg-green-500','bg-blue-500','bg-purple-500','bg-orange-500','bg-pink-500','bg-teal-500']
    return colors[(name?.charCodeAt(0) || 0) % colors.length]
  }

  const navItems = [
    { label:'Dashboard',  href:'/admin/dashboard',  icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label:'Bookings',   href:'/admin/bookings',   icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', active: true },
    { label:'Schedule',   href:'/admin/schedule',   icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label:'Blog Posts', href:'/admin/create-blog',icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ]

  if (sessionExpired) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow p-8 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Session Expired</h2>
        <p className="text-gray-500 text-sm mb-6">You need to login again.</p>
        <button onClick={() => router.push('/admin/login')} className="w-full bg-[#016837] text-white py-2.5 rounded-lg hover:bg-[#01572E] font-medium">Go to Login</button>
      </div>
    </div>
  )

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#016837] mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading bookings...</p>
      </div>
    </div>
  )

  const invField = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]'
  const invLabel = 'block text-xs text-gray-500 mb-1 font-medium'

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0a1628] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#016837] rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Prime EPC</p>
              <p className="text-white/50 text-xs">& Design Consultants</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Management</p>
          {navItems.map(item => (
            <Link key={item.label} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[#016837] text-white' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}
              onClick={() => setSidebarOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#016837] rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-white/40 text-xs">Administrator</p>
            </div>
            <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Booking Management</h1>
          </div>
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Dashboard
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
          )}

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            {[
              { label:'Total Bookings', value: bookings.length, color:'text-gray-800', filter:'all', ring:'ring-gray-400' },
              { label:'Recent Bookings', value: bookings.filter(b => new Date(b.preferredDate).getTime() >= Date.now() - 2*24*60*60*1000).length, color:'text-purple-600', filter:'recent', ring:'ring-purple-400' },
              { label:'Pending', value: bookings.filter(b=>b.status==='pending').length, color:'text-yellow-600', filter:'pending', ring:'ring-yellow-400' },
              { label:'Confirmed', value: bookings.filter(b=>b.status==='confirmed').length, color:'text-green-600', filter:'confirmed', ring:'ring-green-400' },
              { label:'Completed', value: bookings.filter(b=>b.status==='completed').length, color:'text-blue-600', filter:'completed', ring:'ring-blue-400' },
            ].map(s => (
              <button key={s.label} onClick={() => setActiveFilter(s.filter)}
                className={`bg-white rounded-xl px-4 py-3 shadow-sm text-left transition-all hover:shadow-md ${activeFilter === s.filter ? `ring-2 ${s.ring}` : ''}`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                {activeFilter === s.filter && <p className="text-xs font-medium mt-1">● Active filter</p>}
              </button>
            ))}
          </div>

          {/* Bookings table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">All Bookings <span className="text-gray-400 font-normal">({bookings.length})</span></h2>
            </div>

            {bookings.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No bookings found.</div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">CUSTOMER</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">SERVICE</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">FULL ADDRESS</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3 whitespace-nowrap">DATE & TIME</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">PAYMENT</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">STATUS</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(b.name)}`}>
                                {b.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{b.name}</p>
                                {b.email && <a href={`mailto:${b.email}`} className="text-xs text-blue-500 hover:underline block">{b.email}</a>}
                                {b.phone && <a href={`tel:${b.phone}`} className="text-xs text-green-600 hover:underline block">{b.phone}</a>}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <p className="text-gray-700 capitalize">{b.propertyType}</p>
                            <p className="text-xs text-gray-400">{b.propertyDetails}</p>
                          </td>
                          <td className="px-5 py-3">
                            <p className="text-gray-700 text-sm" style={{maxWidth:'200px', wordBreak:'break-word', whiteSpace:'normal'}}>{b.propertyAddress}</p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{b.postcode}</p>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            <p className="text-gray-700">{new Date(b.preferredDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric', timeZone:'UTC'})}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(b.preferredDate).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit', timeZone:'UTC', hour12:false})}
                              {endTimeOf(b) && ` – ${endTimeOf(b)}`}
                            </p>
                          </td>
                          <td className="px-5 py-3">
                            <p className="text-gray-700 capitalize text-xs">{b.paymentMethod || 'cash'}</p>
                            {b.amount > 0 && <p className="text-xs text-gray-400 font-medium">£{b.amount}</p>}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusColor(b.status)}`}>{b.status}</span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button onClick={() => openEdit(b)} title="Edit booking" className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                              </button>
                              <button onClick={() => deleteBooking(b.id, b.name)} title="Delete booking" className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                              </button>
                              <button onClick={() => openInvoice(b)} title="Create & Send Invoice (PDF)" className="p-1.5 text-[#016837] hover:text-[#01572E] hover:bg-green-50 rounded-lg transition-colors flex-shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden divide-y divide-gray-100">
                  {filteredBookings.map(b => (
                    <div key={b.id} className="px-4 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${avatarColor(b.name)}`}>
                            {b.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{b.name}</p>
                            {b.email && <a href={`mailto:${b.email}`} className="text-xs text-blue-500 hover:underline block">{b.email}</a>}
                            {b.phone && <a href={`tel:${b.phone}`} className="text-xs text-green-600 hover:underline block">{b.phone}</a>}
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${statusColor(b.status)}`}>{b.status}</span>
                      </div>

                      <div className="mt-3 space-y-1.5 pl-12">
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 w-16 flex-shrink-0">Service</span>
                          <span className="text-gray-700 capitalize">{b.propertyType} — {b.propertyDetails}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 w-16 flex-shrink-0">Address</span>
                          <span className="text-gray-700" style={{wordBreak:'break-word'}}>{b.propertyAddress}, {b.postcode}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 w-16 flex-shrink-0">Date</span>
                          <span className="text-gray-700">
                            {new Date(b.preferredDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric', timeZone:'UTC'})} at {new Date(b.preferredDate).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit', timeZone:'UTC', hour12:false})}
                            {endTimeOf(b) && ` – ${endTimeOf(b)}`}
                          </span>
                        </div>
                        {b.amount > 0 && (
                          <div className="flex gap-2 text-xs">
                            <span className="text-gray-400 w-16 flex-shrink-0">Payment</span>
                            <span className="text-gray-700 capitalize">{b.paymentMethod} — £{b.amount}</span>
                          </div>
                        )}
                        <div className="flex gap-2 text-xs items-center pt-1">
                          <span className="text-gray-400 w-16 flex-shrink-0">Update</span>
                          <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => openEdit(b)} title="Edit booking" className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => deleteBooking(b.id, b.name)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                          <button onClick={() => openInvoice(b)} className="p-1.5 text-[#016837] hover:text-[#01572E] hover:bg-green-50 rounded-lg transition-colors" title="Create & Send Invoice (PDF)">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Edit Booking Modal */}
      {editBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">Edit Booking</h2>
              <button onClick={() => setEditBooking(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {key:'name',  label:'Full Name'},
                  {key:'email', label:'Email'},
                  {key:'phone', label:'Phone'},
                  {key:'postcode', label:'Postcode'},
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                    <input type="text" value={editForm[f.key] || ''} onChange={e => setEditForm({...editForm, [f.key]: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Property Address</label>
                <input type="text" value={editForm.propertyAddress || ''} onChange={e => setEditForm({...editForm, propertyAddress: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Service Type</label>
                  <select value={editForm.propertyType || 'domestic'} onChange={e => setEditForm({...editForm, propertyType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                    <option value="domestic">Domestic</option>
                    <option value="commercial">Commercial</option>
                    <option value="eicr">EICR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Amount (£)</label>
                  <input type="number" value={editForm.amount || ''} onChange={e => setEditForm({...editForm, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Property Details</label>
                <input type="text" value={editForm.propertyDetails || ''} onChange={e => setEditForm({...editForm, propertyDetails: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date</label>
                  <input type="date" value={editForm.date || ''} onChange={e => setEditForm({...editForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Time</label>
                  <input type="time" value={editForm.time || ''} onChange={e => setEditForm({...editForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Payment Method</label>
                  <select value={editForm.paymentMethod || 'cash'} onChange={e => setEditForm({...editForm, paymentMethod: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                    <option value="cash">Cash</option>
                    <option value="stripe">Bank Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Status</label>
                  <select value={editForm.status || 'pending'} onChange={e => setEditForm({...editForm, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setEditBooking(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 text-sm transition-colors">
                Cancel
              </button>
              <button onClick={saveEdit} disabled={editLoading} className="flex-1 py-2.5 bg-[#016837] text-white rounded-lg hover:bg-[#01572E] text-sm font-medium disabled:opacity-50 transition-colors">
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Editor Modal */}
      {inv && invBooking && (
        <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-3 lg:p-6">
            <div className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
              <div className="bg-white px-5 py-3.5 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-bold text-gray-800">Invoice Editor</h2>
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">{inv.invoiceNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex lg:hidden bg-gray-100 rounded-lg p-0.5">
                    <button onClick={() => setInvTab('edit')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${invTab === 'edit' ? 'bg-white shadow text-[#016837]' : 'text-gray-500'}`}>Edit</button>
                    <button onClick={() => setInvTab('preview')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${invTab === 'preview' ? 'bg-white shadow text-[#016837]' : 'text-gray-500'}`}>Preview</button>
                  </div>
                  <button onClick={() => { setInvBooking(null); setInv(null) }} className="text-gray-400 hover:text-gray-600 text-2xl leading-none px-1">&times;</button>
                </div>
              </div>

              <div className="grid lg:grid-cols-[400px_1fr]">
                <div className={`bg-white border-r border-gray-200 p-5 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto ${invTab === 'preview' ? 'hidden lg:block' : ''}`}>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Invoice</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className={invLabel}>Invoice #</label>
                        <input type="text" value={inv.invoiceNo} onChange={e => invSet('invoiceNo', e.target.value)} className={invField}/>
                      </div>
                      <div>
                        <label className={invLabel}>Payment Status</label>
                        <select value={inv.status} onChange={e => invSet('status', e.target.value)} className={invField + ' bg-white'}>
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div>
                        <label className={invLabel}>Invoice Date</label>
                        <input type="date" value={inv.invoiceDate} onChange={e => invSet('invoiceDate', e.target.value)} className={invField}/>
                      </div>
                      <div>
                        <label className={invLabel}>Due Date</label>
                        <input type="date" value={inv.dueDate} onChange={e => invSet('dueDate', e.target.value)} className={invField}/>
                      </div>
                      <div className="col-span-2">
                        <label className={invLabel}>Payment Method</label>
                        <select value={inv.paymentMethod} onChange={e => invSet('paymentMethod', e.target.value)} className={invField + ' bg-white'}>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cash">Cash</option>
                          <option value="Bank Card">Bank Card</option>
                          <option value="PayPal">PayPal</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Company</p>
                    <div className="space-y-2.5">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <p className="text-xs font-bold text-gray-700">{inv.companyName}</p>
                        <p className="text-xs text-gray-500 mt-1">{inv.companyAddress}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className={invLabel}>Phone</label>
                          <input type="text" value={inv.companyPhone} onChange={e => invSet('companyPhone', e.target.value)} className={invField}/>
                        </div>
                        <div>
                          <label className={invLabel}>Email</label>
                          <input type="text" value={inv.companyEmail} onChange={e => invSet('companyEmail', e.target.value)} className={invField}/>
                        </div>
                        <div>
                          <label className={invLabel}>Website</label>
                          <input type="text" value={inv.companyWebsite} onChange={e => invSet('companyWebsite', e.target.value)} className={invField}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
                    <div className="space-y-2.5">
                      <div>
                        <label className={invLabel}>Customer Name</label>
                        <input type="text" value={inv.billName} onChange={e => invSet('billName', e.target.value)} className={invField}/>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={invLabel}>Email</label>
                          <input type="text" value={inv.billEmail} onChange={e => invSet('billEmail', e.target.value)} className={invField}/>
                        </div>
                        <div>
                          <label className={invLabel}>Phone</label>
                          <input type="text" value={inv.billPhone} onChange={e => invSet('billPhone', e.target.value)} className={invField}/>
                        </div>
                      </div>
                      <div>
                        <label className={invLabel}>Billing Address</label>
                        <textarea rows={2} value={inv.billAddress} onChange={e => invSet('billAddress', e.target.value)} className={invField}/>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Appointment</p>
                    <div className="space-y-2.5">
                      <div>
                        <label className={invLabel}>Service Type</label>
                        <input type="text" value={inv.serviceType} onChange={e => invSet('serviceType', e.target.value)} className={invField}/>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={invLabel}>Appointment Date</label>
                          <input type="date" value={inv.apptDate} onChange={e => invSet('apptDate', e.target.value)} className={invField}/>
                        </div>
                        <div>
                          <label className={invLabel}>Appointment Time</label>
                          <input type="time" value={inv.apptTime} onChange={e => invSet('apptTime', e.target.value)} className={invField}/>
                        </div>
                      </div>
                      <div>
                        <label className={invLabel}>Property Address</label>
                        <input type="text" value={inv.propertyAddress} onChange={e => invSet('propertyAddress', e.target.value)} className={invField}/>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items</p>
                      <button onClick={addItem} className="text-xs font-semibold text-[#016837] hover:text-[#01572E] flex items-center gap-1">Add Item</button>
                    </div>
                    <div className="space-y-2.5">
                      {inv.items.map((it, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
                          <div className="flex items-start gap-2">
                            <input type="text" placeholder="Description" value={it.description} onChange={e => invItemSet(i, 'description', e.target.value)} className={invField + ' flex-1 bg-white'}/>
                            {inv.items.length > 1 && (
                              <button onClick={() => removeItem(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0 mt-0.5">×</button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className={invLabel}>Qty</label>
                              <input type="number" min="1" value={it.qty} onChange={e => invItemSet(i, 'qty', e.target.value)} className={invField + ' bg-white'}/>
                            </div>
                            <div>
                              <label className={invLabel}>Unit Price (£)</label>
                              <input type="number" min="0" step="0.01" value={it.unitPrice} onChange={e => invItemSet(i, 'unitPrice', e.target.value)} className={invField + ' bg-white'}/>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2.5">
                      <label className={invLabel}>VAT Rate (%)</label>
                      <input type="number" min="0" step="0.01" value={inv.vatRate} onChange={e => invSet('vatRate', e.target.value)} className={invField}/>
                    </div>
                  </div>

                  <div>
                    <label className={invLabel}>Notes</label>
                    <textarea rows={3} value={inv.notes} onChange={e => invSet('notes', e.target.value)} className={invField}/>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-1">
                    <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-bold text-gray-800">{gbp(invSubtotal)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-600">VAT ({inv.vatRate}%)</span><span className="font-bold text-gray-800">{gbp(invVat)}</span></div>
                    <div className="flex justify-between text-base pt-1 border-t border-green-200"><span className="font-bold text-[#016837]">Total</span><span className="font-black text-[#016837]">{gbp(invTotal)}</span></div>
                  </div>

                  <button onClick={sendInvoicePdf} disabled={invSending} className="w-full py-3 bg-[#016837] text-white rounded-xl hover:bg-[#01572E] font-bold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {invSending ? 'Loading ...' : `Send Invoice Email (PDF) — ${gbp(invTotal)}`}
                  </button>
                </div>

                <div className={`p-4 lg:p-6 bg-gray-200/70 overflow-hidden ${invTab === 'edit' ? 'hidden lg:block' : ''}`}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Live Preview</p>
                  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 190px)' }}>
                    <div style={{ width: 760, transform: 'scale(0.72)', transformOrigin: 'top left' }}>
                      <InvoicePreview d={inv}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: 'fixed', left: -10000, top: 0, pointerEvents: 'none' }}>
            <div id="invoice-capture">
              <InvoicePreview d={inv}/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}