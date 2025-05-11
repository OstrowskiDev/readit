import CrossedIco from '../icons/CrossedIco'

export default function CrossedButton({ display }) {
  return (
    <button className="ql-crossed" style={{ display: `${display || 'block'}` }}>
      <CrossedIco />
    </button>
  )
}
