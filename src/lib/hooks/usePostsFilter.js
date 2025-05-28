import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { filterPosts } from '../actions/filter'

export function usePostsFilter({
  setPosts,
  setPostsCount,
  showFavorites,
  forceAuthorName,
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  async function applyFastQuery(queryString) {
    const params = new URLSearchParams(searchParams)

    if (queryString.trim()) {
      params.set('fastQuery', queryString.trim())
    } else {
      params.delete('fastQuery')
    }

    params.delete('title')
    params.delete('content')
    params.delete('author')
    params.delete('sortBy')
    params.delete('sortOrder')

    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
    await fetchAndSetPosts(params)
  }

  async function applyFilters(
    filters = { sortBy: 'time', order: 'descending' },
  ) {
    const params = new URLSearchParams()

    for (const key in filters) {
      if (filters[key]) {
        params.set(key, filters[key])
      }
    }

    params.delete('fastQuery')
    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
    await fetchAndSetPosts(params)
  }

  async function applyPagination(pageNum) {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNum)

    replace(`${pathname}?${params.toString()}`)
    await fetchAndSetPosts(params)
  }

  async function applyPageLimit(limit = 10) {
    const params = new URLSearchParams(searchParams)
    params.set('limit', limit)
    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
    await fetchAndSetPosts(params)
  }

  async function fetchAndSetPosts(params) {
    const filterParams = Object.fromEntries(params.entries())
    const postsData = await filterPosts({
      searchParams: filterParams,
      forceAuthorName,
      showFavorites,
    })
    setPosts(postsData.posts)
    setPostsCount(postsData.postsCount)
  }

  return { applyFastQuery, applyFilters, applyPagination, applyPageLimit }
}
