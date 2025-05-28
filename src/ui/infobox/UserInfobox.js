'use client'

import { countUserComments, countUserPosts } from '@/lib/actions/utils'
import { Avatar } from '@/services/dicebear/Avatar'
import { useAuthorsContext } from '@/lib/context/AuthorsDataProvider'
import { FollowBtn } from '@/ui/buttons/FollowBtn'
import { MessageBtn } from '@/ui/buttons/MessageBtn'
import { AccountCreationDate } from '@/ui/infobox/AccountCreationDate'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function UserInfobox({
  author,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const { authorsData, setAuthorsData } = useAuthorsContext()
  const router = useRouter()
  const authorId = author._id
  const accountCreatedAt = author.createdAt

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const dataExists = authorsData?.find((author) => author._id === authorId)
    if (!dataExists) {
      const postsSum = countUserPosts(author._id)
      const commentsSum = countUserComments(author._id)
      const newAuthor = {
        _id: authorId,
        postsSum: postsSum,
        commentsSum: commentsSum,
        createdAt: accountCreatedAt,
      }
      const newData = cloneDeep(authorsData)
      newData.push(newAuthor)
      setAuthorsData(newData)
    }
  }, [])

  const userData = authorsData?.find((author) => author._id === authorId)
  const postsSum = userData?.postsSum
  const commentsSum = userData?.commentsSum

  return (
    <div
      className="infobox-container absolute z-40 top-16 left-3 w-[350px] h-[260px] p-8 bg-white rounded-3xl drop-shadow-2xl hover:cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {userData && (
        <div className="infobox-event-handler relative z-20">
          <div className="infobox-avatar-name-date-container flex">
            <div className="infobox-avatar-container w-20 h-20">
              <Avatar
                seed={author.avatar.seed}
                color={author.avatar.color}
                size={80}
                border={3}
              />
            </div>

            <div className="infobox-name-date-container flex flex-col ml-4">
              <div
                onClick={() => router.push(`/user/${author._id}`)}
                className="name font-orbitron-bold text-20 hover:cursor-pointer hover:underline"
              >
                {author.name}
              </div>
              <AccountCreationDate accountCreatedAt={accountCreatedAt} />
            </div>
          </div>

          <div className="infobox-posts-comments-numbers-container mt-4 flex">
            <div className="infobox-posts-number">
              <p className="infobox-posts-number font-orbitron text-18 font-semibold">
                {postsSum}
              </p>
              <p className="infobox-comments-text text-12 font-orbitron text-gray-600">
                Posts Created
              </p>
            </div>
            <div className="infobox-comments-number-container ml-4">
              <p className="infobox-comments-number font-orbitron text-18 font-semibold">
                {commentsSum}
              </p>
              <p className="infobox-comments-text text-12 font-orbitron text-gray-600">
                Comment Created
              </p>
            </div>
          </div>

          <div className="infobox-buttons-container mt-5 flex">
            <FollowBtn />
            <MessageBtn />
          </div>
        </div>
      )}
    </div>
  )
}
