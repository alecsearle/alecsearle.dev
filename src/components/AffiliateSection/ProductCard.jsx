import { ChevronRight } from 'lucide-react'

export default function ProductCard({ product }) {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 group"
    >
      <div className="flex items-center gap-3">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-white/5"
          />
        )}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{product.name}</p>
            {product.affiliate === false && (
              <span className="text-[10px] text-white/25 border border-white/15 rounded px-1.5 py-0.5 leading-none">
                Amazon
              </span>
            )}
          </div>
          <p className="text-xs text-white/40 mt-0.5">{product.description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0 ml-3" />
    </a>
  )
}
