import { usePostContext } from '@/lib/context/PostContextProvider'
import { ShareIco2 } from '../icons/ShareIco2'
import { useEffect, useState } from 'react'
import { useToastContext } from '@/lib/toasts/ToastProvider'

export function SharePostBtn() {
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })
  const { postId } = usePostContext()
  const { toastFunctions: toast } = useToastContext()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const postUrl = appUrl + '/posts/post/' + postId

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="btn-container z-20">
      <button
        className="btn-body relative flex justify-center items-center btn-border-blue-soft interactive-orange-strong h-10 px-4 "
        onClick={copyToClipboard}
      >
        <div className="btn-icon-container w-[22px]">
          <ShareIco2 className="text-app-blue-text" />
        </div>
        <p className="btn-text below-xs:hidden ml-[6px] font-semibold">Share</p>
      </button>
    </div>
  )
}
