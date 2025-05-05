import { DeletedUserIco } from '../icons/DeletedUserIco'

export function DeletedAuthorsInfo({ size, border }) {
  return (
    <>
      <div className="header-avatar-container min-w-8 min-h-8 hover:cursor-pointer z-20">
        <div
          className="header-avatar-image h-8 w-8  bg-gray-200 border-gray-300"
          style={{
            height: `${size}px`,
            width: `${size}px`,
            borderWidth: `${border}px`,
            borderRadius: '100px',
          }}
        >
          <DeletedUserIco color={'#9ca3af'} />
        </div>
      </div>

      <div className="header-author-name-container flex below-xs:flex-col z-20">
        <p className="header-author-name ml-2 font-bold below-xs:leading-tight text-gray-600 text-15">
          Deleted User
        </p>
      </div>
    </>
  )
}
