import Avatar from '../lib/avatars/Avatar'
import { MessageIco } from './icons/MessageIco'
import { PlusIco } from './icons/PlusIco'

export default function UserInfobox({ author }) {
  return (
    <div className="infobox-container absolute top-16 left-3 w-[350px] h-[260px] z-40 p-8 bg-white rounded-3xl drop-shadow-2xl hover:cursor-default">
      <div className="avatar-name-date-container flex">
        <div className="avatar-container w-20 h-20">
          <Avatar
            seed={author?.avatar.seed}
            color={author?.avatar.color}
            size={80}
            border={3}
          />
        </div>
        <div className="name-date-container flex flex-col ml-4">
          <p className="name text-gray-950 text-20 font-semibold hover:cursor-pointer">
            {author.name}
          </p>
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
          <p className="text-gray-950 text-18 font-semibold ">14</p>
          <p className=" text-gray-600 text-15">Post Karma</p>
        </div>
        <div className="comments-number ml-4">
          <p className="text-gray-950 text-18 font-semibold">34</p>
          <p className="text-gray-600 text-15">Comment Karma</p>
        </div>
      </div>
      <div className="buttons-container mt-4 flex">
        <button className="follow-btn-container flex justify-center items-center h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-700">
          <div className="btn-icon-container w-[21px]">
            <PlusIco color={'white'} size={21} />
          </div>
          <p className="btn-text ml-[6px] font-semibold text-white">Follow</p>
        </button>
        <button className="message-btn-container flex justify-center items-center h-10 ml-2 px-4 rounded-full bg-gray-300 hover:bg-gray-400">
          <div className="btn-icon-container w-[21px]">
            <MessageIco color={'gray'} />
          </div>
          <p className="btn-text ml-[6px] font-semibold text-gray-500">
            Message
          </p>
        </button>
      </div>
    </div>
  )
}
