import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { ShareIco2 } from '../icons/ShareIco2'
import { useContext, useEffect, useState } from 'react'
import { ToastContext } from '@/app/lib/toasts/ToastContext'

export function SharePostBtn() {
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })
  const { postId } = usePostContext()
  const toast = useContext(ToastContext)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const postUrl = appUrl + '/posts/post/' + postId

  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
    }
  }, [response])

  function copyToClipboard(event) {
    event.preventDefault()
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        setResponse({ state: 'success', message: 'Post url copied!' })
      })
      .catch((err) => {
        console.error('Unable to copy url to clipboard: ' + err)
        setResponse({
          state: 'error',
          message: 'unable to copy url to clipboard',
        })
      })
  }

  return (
    <div className="btn-container ">
      <button
        className="btn-body flex justify-center items-center h-10 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={copyToClipboard}
      >
        <div className="btn-icon-container w-[22px]">
          <ShareIco2 />
        </div>
        <p className="btn-text ml-[6px] font-semibold text-gray-500">Share</p>
      </button>
    </div>
  )
}
