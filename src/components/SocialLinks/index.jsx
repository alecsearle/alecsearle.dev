import { Youtube, Instagram } from 'lucide-react'
import TikTokIcon from './TikTokIcon'

const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@alec_searle',
    Icon: Youtube,
    hoverColor: 'hover:text-red-500',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/alec_searle/',
    Icon: Instagram,
    hoverColor: 'hover:text-pink-400',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@alec_searle',
    Icon: TikTokIcon,
    hoverColor: 'hover:text-white',
  },
]

function SocialButton({ label, href, Icon, hoverColor }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`text-white/50 transition-colors duration-200 ${hoverColor}`}
    >
      <Icon className="w-7 h-7" />
    </a>
  )
}

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-8">
      {SOCIALS.map((social) => (
        <SocialButton key={social.label} {...social} />
      ))}
    </div>
  )
}
