import Link from 'next/link'
import EditIco from '../icons/EditIco'

export function EditPostBtn({ postId }) {
  return (
    <Link
      href={`/posts/edit/${postId}`}
      className="w-6 m-1 pb-[1px] flex justify-center items-center"
    >
      <EditIco />
    </Link>
  )
}
