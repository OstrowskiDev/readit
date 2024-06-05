import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'
import { useEffect, useState } from 'react'
import { ShareIco2 } from '../icons/ShareIco2'

export function ShareCommentBtn() {
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })
  const { postId, commentId } = useCommentContext()
  const { toastFunctions: toast } = useToastContext()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const commentUrl = appUrl + '/posts/post/' + postId + '#' + commentId

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
      .writeText(commentUrl)
      .then(() => {
        setResponse({ state: 'success', message: 'Comment url copied!' })
      })
      .catch((err) => {
        console.error('Unable to copy comment url to clipboard: ' + err)
        setResponse({
          state: 'error',
          message: 'Unable to copy url to clipboard',
        })
      })
  }
  return (
    <div className="btn-container mt-[1px] rounded-md hover:bg-gray-200">
      <button
        className="px-2 h-11 w-[44px] xs:w-[60px]"
        onClick={copyToClipboard}
      >
        <div className="btn-icon-container w-[24px] mx-auto ">
          <div className="comment-share-btn xs:hidden">
            <ShareIco2 />
          </div>
          <p className="btn-text below-xs:hidden font-semibold  text-gray-500">
            Share
          </p>
        </div>
      </button>
    </div>
  )
}
