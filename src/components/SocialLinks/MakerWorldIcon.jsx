export default function MakerWorldIcon({ className }) {
  return (
    <img
      src="/images/makerworld-logo.png"
      alt="MakerWorld"
      className={`[filter:grayscale(1)_opacity(0.5)] group-hover:[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(98%)_saturate(450%)_hue-rotate(82deg)_brightness(115%)] transition-all duration-200 ${className}`}
    />
  )
}
