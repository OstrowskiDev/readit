import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { filterPosts } from '@/lib/db'

export function usePostsFilter({
  setPosts,
  setPostsCount,
  setTriggerReset,
  onlyCurrentUserPosts,
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  async function getFilteredPosts(filterData) {
    const params = new URLSearchParams(searchParams)
    for (const key in filterData) {
      if (filterData[key]) {
        console.log(key, filterData[key])
        params.set(key, filterData[key])
      }
    }
    if (filterData.title && params.get('fastQuery')) {
      params.delete('fastQuery')
    }
    replace(`${pathname}?${params.toString()}`)

    if (onlyCurrentUserPosts) {
      params.set(onlyCurrentUserPosts, onlyCurrentUserPosts)
    }

    const filterParams = Object.fromEntries(params.entries())

    const postsData = await filterPosts(filterParams)
    setPosts(postsData.posts)
    setPostsCount(postsData.postsCount)
    setTriggerReset((prev) => !prev)
  }

  return { getFilteredPosts }
}
