export default function VideoSkeleton() {
  return (
    <div className="flex-shrink-0 w-60 snap-start">
      <div className="aspect-video rounded-lg bg-white/5 animate-pulse" />
      <div className="mt-2 h-3 w-3/4 bg-white/5 rounded animate-pulse" />
      <div className="mt-1 h-3 w-1/2 bg-white/5 rounded animate-pulse" />
    </div>
  )
}
