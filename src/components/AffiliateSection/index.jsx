import SectionLabel from '../ui/SectionLabel'
import ProductCard from './ProductCard'
import { BEGINNER_SETUP, BETAFPV_MAIN } from './products'

export default function AffiliateSection() {
  return (
    <div className="w-full pb-8">
      <SectionLabel
        title="The Best Beginner FPV Setup"
        subtitle="Everything you need to start flying FPV"
      />
      <div className="flex flex-col gap-3">
        {BEGINNER_SETUP.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <a
        href={BETAFPV_MAIN}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center w-full px-4 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors"
      >
        Shop All BetaFPV →
      </a>
      <p className="mt-3 text-center text-[11px] text-white/20 leading-relaxed">
        Some links are affiliate links — they help support the channel at no extra cost to you.
      </p>
    </div>
  )
}
