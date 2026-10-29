"use client"

import { useState } from 'react'
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

// ── Invoice Preview — same design as bookings invoice ─────────────────────
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

export default function CreateInvoicePage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [invTab, setInvTab] = useState('edit')

  const [inv, setInv] = useState(() => ({
    invoiceNo: `INV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`,
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
    status: 'Unpaid',
    paymentMethod: 'Bank Transfer',
    companyName: 'Prime EPC & Design Consultant Ltd',
    companyAddress: '17 Bromwich Street, Bolton, BL2 1JF',
    companyPhone: '020 7946 0568',
    companyEmail: 'info@primeepcdesign.co.uk',
    companyWebsite: 'www.primeepcdesign.co.uk',
    billName: '',
    billEmail: '',
    billPhone: '',
    billAddress: '',
    serviceType: 'EPC (Domestic)',
    apptDate: new Date().toISOString().slice(0, 10),
    apptTime: '09:00',
    propertyAddress: '',
    items: [{ description: 'Domestic EPC Assessment', qty: 1, unitPrice: 80 }],
    vatRate: 0,
    notes: 'Thank you for choosing Prime EPC.\nIf you have any questions, please contact us.',
  }))

  const invSet = (k, v) => setInv(prev => ({ ...prev, [k]: v }))
  const invItemSet = (i, k, v) => setInv(prev => {
    const items = [...prev.items]
    items[i] = { ...items[i], [k]: (k === 'qty' || k === 'unitPrice') ? (Number(v) || 0) : v }
    return { ...prev, items }
  })
  const addItem    = () => setInv(prev => ({ ...prev, items: [...prev.items, { description: '', qty: 1, unitPrice: 0 }] }))
  const removeItem = i => setInv(prev => ({ ...prev, items: prev.items.filter((_, x) => x !== i) }))

  const invSubtotal = inv.items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.unitPrice) || 0), 0)
  const invVat      = invSubtotal * (Number(inv.vatRate) || 0) / 100
  const invTotal    = invSubtotal + invVat

  const sendInvoicePdf = async () => {
    if (!inv.billEmail) { alert('Please enter the customer email address.'); return }
    if (!inv.billName)  { alert('Please enter the customer name.'); return }
    if (!window.confirm(`Send invoice ${inv.invoiceNo} (${gbp(invTotal)}) to ${inv.billEmail}?`)) return
    setSending(true)
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
          propertyType:    'manual',
          propertyDetails: inv.serviceType,
          propertyAddress: inv.propertyAddress,
          postcode:        '',
          preferredDate:   inv.apptDate ? `${inv.apptDate}T${inv.apptTime || '09:00'}:00` : '',
          paymentMethod:   'bank_transfer',
          paymentStatus:   inv.status === 'Paid' ? 'paid' : 'pending',
          amount:          invTotal,
          paymentRef:      '',
          invoiceNo:       inv.invoiceNo,
          pdfBase64
        })
      })
      const data = await res.json()
      if (data.success) {
        alert(`✅ Invoice ${inv.invoiceNo} sent to ${inv.billEmail}`)
      } else {
        alert('❌ Failed to send invoice: ' + (data.message || 'unknown error'))
      }
    } catch (e) {
      console.error('Invoice PDF error:', e)
      alert('❌ Failed to generate the PDF. Please try again.')
    } finally { setSending(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard',   href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Bookings',    href: '/admin/bookings',  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Schedule',    href: '/admin/schedule',  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Blog Posts',  href: '/admin/create-blog', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Add Booking', href: '/admin/add-booking',  icon: 'M12 4v16m8-8H4' },
    { label: 'Bulk Orders', href: '/admin/bulk-orders',  icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7' },
    { label: 'Create Invoice', href: '/admin/create-invoice', active: true, icon: 'M9 14l2 2 4-4M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ]

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

        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Create Invoice</h1>
            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">{inv.invoiceNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex lg:hidden bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setInvTab('edit')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${invTab === 'edit' ? 'bg-white shadow text-[#016837]' : 'text-gray-500'}`}>Edit</button>
              <button onClick={() => setInvTab('preview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${invTab === 'preview' ? 'bg-white shadow text-[#016837]' : 'text-gray-500'}`}>Preview</button>
            </div>
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              Dashboard
            </Link>
          </div>
        </header>

        <main className="flex-1 p-3 lg:p-6">
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[400px_1fr]">

              {/* ── LEFT: Edit form ── */}
              <div className={`bg-white border-r border-gray-200 p-5 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto ${invTab === 'preview' ? 'hidden lg:block' : ''}`}>

                {/* Invoice meta */}
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

                {/* Company (fixed) */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Company</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-700">{inv.companyName}</p>
                    <p className="text-xs text-gray-500 mt-1">{inv.companyAddress}</p>
                    <p className="text-[10px] text-gray-400 mt-1.5 italic">Company name and address are fixed on every invoice.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2.5">
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

                {/* Bill To */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
                  <div className="space-y-2.5">
                    <div>
                      <label className={invLabel}>Customer Name</label>
                      <input type="text" value={inv.billName} onChange={e => invSet('billName', e.target.value)} className={invField}/>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={invLabel}>Email *</label>
                        <input type="text" value={inv.billEmail} onChange={e => invSet('billEmail', e.target.value)} className={invField} placeholder="customer@email.com"/>
                      </div>
                      <div>
                        <label className={invLabel}>Phone</label>
                        <input type="text" value={inv.billPhone} onChange={e => invSet('billPhone', e.target.value)} className={invField}/>
                      </div>
                    </div>
                    <div>
                      <label className={invLabel}>Billing Address (one per line)</label>
                      <textarea rows={2} value={inv.billAddress} onChange={e => invSet('billAddress', e.target.value)} className={invField}/>
                    </div>
                  </div>
                </div>

                {/* Appointment */}
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

                {/* Items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items</p>
                    <button onClick={addItem}
                      className="text-xs font-semibold text-[#016837] hover:text-[#01572E] flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                      Add Item
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {inv.items.map((it, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
                        <div className="flex items-start gap-2">
                          <input type="text" placeholder="Description" value={it.description}
                            onChange={e => invItemSet(i, 'description', e.target.value)}
                            className={invField + ' flex-1 bg-white'}/>
                          {inv.items.length > 1 && (
                            <button onClick={() => removeItem(i)} title="Remove item"
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className={invLabel}>Qty</label>
                            <input type="number" min="1" value={it.qty}
                              onChange={e => invItemSet(i, 'qty', e.target.value)}
                              className={invField + ' bg-white'}/>
                          </div>
                          <div>
                            <label className={invLabel}>Unit Price (£)</label>
                            <input type="number" min="0" step="0.01" value={it.unitPrice}
                              onChange={e => invItemSet(i, 'unitPrice', e.target.value)}
                              className={invField + ' bg-white'}/>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5">
                    <label className={invLabel}>VAT Rate (%)</label>
                    <input type="number" min="0" step="0.01" value={inv.vatRate}
                      onChange={e => invSet('vatRate', e.target.value)} className={invField}/>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={invLabel}>Notes</label>
                  <textarea rows={3} value={inv.notes} onChange={e => invSet('notes', e.target.value)} className={invField}/>
                </div>

                {/* Live total */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-bold text-gray-800">{gbp(invSubtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">VAT ({inv.vatRate}%)</span><span className="font-bold text-gray-800">{gbp(invVat)}</span></div>
                  <div className="flex justify-between text-base pt-1 border-t border-green-200"><span className="font-bold text-[#016837]">Total</span><span className="font-black text-[#016837]">{gbp(invTotal)}</span></div>
                </div>

                {/* Send button */}
                <button onClick={sendInvoicePdf} disabled={sending}
                  className="w-full py-3 bg-[#016837] text-white rounded-xl hover:bg-[#01572E] font-bold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {sending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Generating PDF and sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      Send Invoice Email (PDF) — {gbp(invTotal)}
                    </>
                  )}
                </button>
              </div>

              {/* ── RIGHT: Live preview ── */}
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
        </main>
      </div>

      {/* Hidden full-size copy — PDF capture ke liye */}
      <div style={{ position: 'fixed', left: -10000, top: 0, pointerEvents: 'none' }}>
        <div id="invoice-capture">
          <InvoicePreview d={inv}/>
        </div>
      </div>
    </div>
  )
}