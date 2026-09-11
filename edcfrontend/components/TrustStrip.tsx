export default function TrustStrip() {
  const trustPoints = [
    { label: 'Fixed Fee £50' },
    { label: '50-Mile NW Coverage' },
    { label: 'Quidos Accredited' },
    { label: '24–48 Hr Turnaround' }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-3">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white text-xs sm:text-sm font-semibold tracking-wide">
          {trustPoints.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-[#80C531] font-bold text-base leading-none">✓</span>
              <span>{item.label}</span>
              {idx < trustPoints.length - 1 && (
                <span className="hidden sm:inline-block text-white/40 ml-4">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
