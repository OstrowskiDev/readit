'use client'

import { countUserComments, countUserPosts } from '@/app/lib/actions/utils'
import { Avatar } from '@/app/lib/avatars/Avatar'
import { useAuthorsContext } from '@/app/lib/context/AuthorsDataProvider'
import { FollowBtn } from '@/app/ui/buttons/FollowBtn'
import { MessageBtn } from '@/app/ui/buttons/MessageBtn'
import { AccountCreationDate } from '@/app/ui/infobox/AccountCreationDate'
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

  function InfoboxBody() {
    return (
      <>
        {userData && (
          <div className="infobox-event-handler">
            <div className="avatar-name-date-container flex">
              <div className="avatar-container w-20 h-20">
                <Avatar
                  seed={author.avatar.seed}
                  color={author.avatar.color}
                  size={80}
                  border={3}
                />
              </div>

              <div className="name-date-container flex flex-col ml-4">
                <div
                  onClick={() => router.push(`/user/${author._id}/posts`)}
                  className="name text-gray-950 text-20 font-semibold hover:cursor-pointer hover:underline"
                >
                  {author.name}
                </div>
                <AccountCreationDate accountCreatedAt={accountCreatedAt} />
              </div>
            </div>

            <div className="posts-comments-numbers-container mt-4 flex">
              <div className="posts-number">
                <p className="posts-number text-gray-950 text-18 font-semibold ">
                  {postsSum}
                </p>
                <p className=" text-gray-600 text-15">Posts Created</p>
              </div>
              <div className="comments-number ml-4">
                <p className="text-gray-950 text-18 font-semibold">
                  {commentsSum}
                </p>
                <p className="text-gray-600 text-15">Comment Created</p>
              </div>
            </div>

            <div className="buttons-container mt-4 flex">
              <FollowBtn />
              <MessageBtn />
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div
      className="infobox-container absolute top-16 left-3 w-[350px] h-[260px] z-40 p-8 bg-white rounded-3xl drop-shadow-2xl hover:cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <InfoboxBody />
    </div>
  )
}
