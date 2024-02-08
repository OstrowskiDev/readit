import Link from 'next/link'

export default function PostAuthor({ postId, userName }) {
  return (
    <p className="text-gray-600 mb-4">
      {'By '}
      <Link href={`/api/users/user/${postId}`} className="text-blue-500 hover:underline">
        {userName}
      </Link>
    </p>
  )
}
