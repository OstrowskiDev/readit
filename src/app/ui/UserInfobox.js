'use client'

import { useEffect, useState } from 'react'
import { countUserComments, countUserPosts } from '../lib/actions'
import Avatar from '../lib/avatars/Avatar'
import { usePostContext } from '../lib/context/PostContextProvider'
import { cloneDeep } from 'lodash'
import { FollowBtn } from './buttons/FollowBtn'
import { MessageBtn } from './buttons/MessageBtn'

export default function UserInfobox({ author }) {
  const [isLoading, setIsLoading] = useState(true)
  const { authorsData, setAuthorsData, handleMouseEnter, handleMouseLeave } =
    usePostContext()
  const authorId = author._id

  useEffect(() => {
    const dataExists = authorsData?.find((author) => author._id === authorId)
    if (!dataExists) {
      const postsSum = getPostsSum()
      const commentsSum = getCommentsSum()
      const newAuthor = {
        _id: authorId,
        postsSum: postsSum,
        commentsSum: commentsSum,
      }
      const newData = cloneDeep(authorsData)
      newData.push(newAuthor)
      setAuthorsData(newData)
    }
    setIsLoading(false)

    async function getPostsSum() {
      const postsSum = await countUserPosts(author._id)
      return postsSum
    }

    async function getCommentsSum() {
      const commentsSum = await countUserComments(author._id)
      return commentsSum
    }
  }, [author])

  const userData = authorsData?.find((author) => author._id === authorId)
  const postsSum = userData?.postsSum
  const commentsSum = userData?.commentsSum

  function InfoboxBody() {
    return (
      <>
        {userData && (
          <div
            className="infobox-event-handler"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
                <a
                  href={`/user/${author._id}/posts`}
                  className="name text-gray-950 text-20 font-semibold hover:cursor-pointer hover:underline"
                >
                  {author.name}
                </a>
                <p className="date text-gray-500 leading-tight font-medium">
                  Joined: Aug 2, 2020
                </p>
                <p className="last-logged text-gray-500 leading-tight font-medium">
                  Logged: Feb 24, 2024
                </p>
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
    <div className="infobox-container absolute top-16 left-3 w-[350px] h-[260px] z-40 p-8 bg-white rounded-3xl drop-shadow-2xl hover:cursor-default">
      {isLoading ? 'Loading...' : <InfoboxBody />}
    </div>
  )
}
