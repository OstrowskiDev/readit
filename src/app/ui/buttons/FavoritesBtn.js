import { SaveIco } from '../icons/SaveIco'

export function FavoritesBtn({ type, setIsMenuVisible }) {
  function onSaveClick() {
    console.log('favorites btn clicked!')
    setIsMenuVisible(false)
  }
  return (
    <button
      className="menu-opt-save-btn flex items-center px-8 py-2 hover:bg-gray-200"
      type="button"
      onClick={onSaveClick}
    >
      <div className="menu-opt-save-ico w-5 m-1 flex justify-center items-center">
        <SaveIco />
      </div>
      <p className="menu-opt-save-text ml-2 text-lg">Save</p>
    </button>
  )
}

async function onFavoriteSubmit(type) {
  //this needs to move to separate component
}
