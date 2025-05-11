import SpoilerIco from '../icons/SpoilerIco'

export default function SpoilerButton({ display }) {
  return (
    <button className="ql-spoiler" style={{ display: `${display || 'block'}` }}>
      <SpoilerIco />
    </button>
  )
}
