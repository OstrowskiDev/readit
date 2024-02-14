import Link from 'next/link'

export function CommentPostBtn() {
  return (
    <Link href={`/`} className="btn-blue px-3 py-1 rounded-md">
      Comment
    </Link>
  )
}
