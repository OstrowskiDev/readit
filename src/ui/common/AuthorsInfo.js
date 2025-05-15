import { Avatar } from '@/services/dicebear/Avatar'
import { TimeAgo } from '../utils/TimeAgo'
import { DeletedAuthorsInfo } from './DeletedAuthorsInfo'

export function AuthorsInfo({
  document,
  handleMouseEnter,
  handleMouseLeave,
  size,
  border,
}) {
  const author = document.authorData
  const isDeleted = author?.deleted

  if (isDeleted) {
    return <DeletedAuthorsInfo size={size} border={border} />
  } else {
    return (
      <>
        <div
          className="header-avatar-container hover:cursor-pointer z-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar
            seed={author.avatar.seed}
            color={author.avatar.color}
            size={size}
            border={border}
          />
        </div>

        <div className="header-name flex below-xs:flex-col z-20">
          {/* authors name */}
          <p
            className="header-author anchor-color font-orbitron-bold ml-2 below-xs:leading-tight text-15 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {author.name}
          </p>

          {/* post time, edit time */}
          <TimeAgo
            createdAt={document.createdAt}
            updatedAt={document.updatedAt}
            type="created"
          />
        </div>
      </>
    )
  }
}
