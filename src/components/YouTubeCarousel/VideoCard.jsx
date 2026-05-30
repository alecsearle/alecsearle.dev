export default function VideoCard({ video }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-60 snap-start group/card"
    >
      <div className="relative overflow-hidden rounded-lg aspect-video bg-white/5">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/5 transition-colors" />
      </div>
      <p className="mt-2 text-xs text-white/50 line-clamp-2 leading-snug group-hover/card:text-white/80 transition-colors">
        {video.title}
      </p>
    </a>
  )
}
