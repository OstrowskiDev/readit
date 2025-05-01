export function PlusIco({ color, size }) {
  return (
    <div
      className="relative top-0 left-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className="white-horizontal-line absolute h-full"
        style={{
          top: `${Math.floor(size / 2)}px`,
          left: `${Math.floor(size / 4)}px`,
          width: `${Math.ceil(size / 2)}px`,
          borderColor: color,
          borderTopWidth: '1px',
        }}
      ></div>
      <div
        className="white-horizontal-line absolute w-full"
        style={{
          top: `${Math.floor(size / 4)}px`,
          left: `${Math.floor(size / 2)}px`,
          height: `${Math.ceil(size / 2)}px`,
          borderColor: color,
          borderLeftWidth: '1px',
        }}
      ></div>
      <div
        className="white-circle-element absolute w-full h-full top-0 left-0 border-1 rounded-full"
        style={{ borderColor: color }}
      ></div>
    </div>
  )
}
