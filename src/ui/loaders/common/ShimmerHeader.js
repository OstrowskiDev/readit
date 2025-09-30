export default function ShimmerHeader({ width, height = '20px', classes }) {
  return (
    <div
      className={`shimmer header ${classes}`}
      style={{ width, height }}
    ></div>
  )
}
