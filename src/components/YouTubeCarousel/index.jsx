import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import VideoCard from './VideoCard'
import VideoSkeleton from './VideoSkeleton'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const HANDLE = '@alec_searle'

// true = long-form only, false = all videos including Shorts
const LONG_FORM_ONLY = false

function parseDurationSeconds(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  const h = parseInt(match?.[1] || 0)
  const m = parseInt(match?.[2] || 0)
  const s = parseInt(match?.[3] || 0)
  return h * 3600 + m * 60 + s
}

async function fetchLatestVideos() {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${HANDLE}&key=${API_KEY}`
  )
  const channelData = await channelRes.json()
  const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsId) throw new Error('Uploads playlist not found')

  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=20&key=${API_KEY}`
  )
  const playlistData = await playlistRes.json()
  const items = playlistData.items || []

  if (!LONG_FORM_ONLY) {
    return items.slice(0, 10).map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    }))
  }

  // Fetch durations to filter out Shorts (≤ 60s)
  const ids = items.map((i) => i.snippet.resourceId.videoId).join(',')
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${API_KEY}`
  )
  const detailsData = await detailsRes.json()
  const durationMap = Object.fromEntries(
    (detailsData.items || []).map((v) => [v.id, parseDurationSeconds(v.contentDetails.duration)])
  )

  return items
    .filter((item) => {
      const id = item.snippet.resourceId.videoId
      return durationMap[id] !== undefined && durationMap[id] > 60
    })
    .slice(0, 10)
    .map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    }))
}

export default function YouTubeCarousel() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    fetchLatestVideos()
      .then(setVideos)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 270, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <SectionLabel title="Latest Videos" />
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <VideoSkeleton key={i} />)
            : videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>

        <button
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-[45%] -translate-x-5 -translate-y-1/2 w-8 h-8 items-center justify-center bg-black/80 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-[45%] translate-x-5 -translate-y-1/2 w-8 h-8 items-center justify-center bg-black/80 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
