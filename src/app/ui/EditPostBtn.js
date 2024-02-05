import Link from 'next/link'
import EditIco from './icons/EditIco'
import DeleteIco from './icons/DeleteIco'

export function EditPostBtn() {
  return (
    <div className="flex gap-2">
      <Link href={`/`} className="w-6 m-1 pb-[1px] flex justify-center items-center">
        <EditIco />
      </Link>
      <Link href={`/`} className="w-[22px] m-1 flex justify-center items-center">
        <DeleteIco />
      </Link>
    </div>
  )
}
