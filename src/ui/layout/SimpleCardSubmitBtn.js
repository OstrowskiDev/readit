export default function SimpleCardSubmitBtn({ text, className }) {
  return (
    <button
      className={`submit-btn w-full h-12 mt-6 button-orange-strong ${className}`}
      type="submit"
    >
      {text}
    </button>
  )
}
