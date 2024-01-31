import Link from 'next/link'

export default function CreateBtn() {
  return (
    <Link className="btn-blue h-10 px-4 py-2 md:ml-2" href={'/posts/create'}>
      Create +
    </Link>
  )
}
