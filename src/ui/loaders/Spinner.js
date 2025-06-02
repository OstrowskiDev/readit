import './spinnerStyles.css'

export function Spinner() {
  return (
    <div className="lds-roller lds-roller-blue">
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
