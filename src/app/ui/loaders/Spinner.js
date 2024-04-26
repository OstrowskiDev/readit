import './spinnerStyles.css'

export function Spinner() {
  return (
    <div className="lds-roller lds-roller-white">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
