export default function ShimmerParagraph({ width, height = '16px', classes }) {
  return (
    <div
      className={`shimmer header ${classes}`}
      style={{ width, height }}
    ></div>
  )
}
