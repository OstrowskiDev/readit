import { handleCommentFavorites, handlePostFavorites } from '@/app/lib/actions'
import { SaveIco } from '../icons/SaveIco'

export function FavoritesBtn({
  type,
  documentId,
  setIsMenuVisible,
  setIsPostMenuVis,
  setResponse,
}) {
  async function onFavoriteSubmit(event) {
    event.preventDefault()

    const serverResponse =
      type === 'post'
        ? await handlePostFavorites(documentId)
        : await handleCommentFavorites(documentId)
    setResponse(serverResponse)
    type === 'post' ? setIsPostMenuVis(false) : setIsMenuVisible(false)
  }
  return (
    <button
      className="menu-opt-save-btn flex items-center px-8 py-2 hover:bg-gray-200"
      type="button"
      onClick={onFavoriteSubmit}
    >
      <div className="menu-opt-save-ico w-5 m-1 flex justify-center items-center">
        <SaveIco />
      </div>
      <p className="menu-opt-save-text ml-2 text-lg">Favorite</p>
    </button>
  )
}
