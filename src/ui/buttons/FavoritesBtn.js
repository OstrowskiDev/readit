import {
  handleCommentFavorites,
  handlePostFavorites,
} from '@/lib/actions/favorites'
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
      className="menu-opt-save-btn interactive-blue-soft flex items-center px-8 py-2"
      aria-label="Add to favorites"
      type="button"
      onClick={onFavoriteSubmit}
    >
      <div className="menu-opt-save-ico m-1 flex justify-center items-center">
        <StarIco className={'text-app-blue-text'} size={24} />
      </div>
      <p className="menu-opt-save-text ml-2 text-lg">Favorite</p>
    </button>
  )
}
