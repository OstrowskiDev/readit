import { useEffect, useState } from 'react'
import { addDateToOne } from './actionsTemp'

export function UpdateManyBtn({ postId }) {
  const [wasClicked, setWasClicked] = useState(false)
  useEffect(() => {
    async function UpdatePostData() {
      if (wasClicked) {
        addDateToOne(postId)
      }
    }

    UpdatePostData()
  }, [wasClicked])

  function onClick() {
    setWasClicked(true)
  }

  return <button onClick={onClick}>Add Date</button>
}
