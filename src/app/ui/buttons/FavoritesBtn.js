import { handleCommentFavorites, handlePostFavorites } from '@/app/lib/actions'
import StarIco from '../icons/StarIco'

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
      <div className="menu-opt-save-ico m-1 flex justify-center items-center">
        <StarIco color={'darkslategray'} size={24} />
      </div>
      <p className="menu-opt-save-text ml-2 text-lg">Favorite</p>
    </button>
  )
}
