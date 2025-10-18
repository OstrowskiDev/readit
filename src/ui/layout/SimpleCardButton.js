import Link from 'next/link'

export default function SimpleCardButton({ text, href }) {
  return (
    <Link href={href}>
      <button
        className="simple-card-btn w-full h-12 mt-6 button-orange-strong"
        type="button"
      >
        {text}
      </button>
    </Link>
  )
}
