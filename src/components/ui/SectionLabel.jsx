export default function SectionLabel({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-semibold text-white/70 uppercase tracking-widest">{title}</h2>
      {subtitle && <p className="text-xs text-white/45 mt-1">{subtitle}</p>}
    </div>
  )
}
