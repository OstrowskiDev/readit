import { useEffect, useState } from 'react'
import { addDateToPosts } from './actionsTemp'

export function UpdateManyBtn({ postId }) {
  const [wasClicked, setWasClicked] = useState(false)
  useEffect(() => {
    async function UpdatePostData() {
      if (wasClicked) {
        addDateToPosts()
      }
    }

    UpdatePostData()
  }, [wasClicked])

  function onClick() {
    setWasClicked(!wasClicked)
  }

  return <button onClick={onClick}>Add Date</button>
}
