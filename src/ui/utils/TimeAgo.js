import { useState, useEffect } from 'react'

export function TimeAgo({ createdAt, updatedAt }) {
  const [createdAgo, setCreatedAgo] = useState('')
  const [editedAgo, setEditedAgo] = useState('')
  const created = new Date(createdAt)
  const edited = new Date(updatedAt)
  const wasEdited = Boolean(edited - created)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    function calculateTimeAgo() {
      const now = new Date()
      const elapsedCreate = now - created

      const timeAfterCreation = getTimeAgo(elapsedCreate)
      setCreatedAgo(timeAfterCreation)

      if (wasEdited) {
        const elapsedEdition = now - edited
        const timeAfterEdition = getTimeAgo(elapsedEdition)
        setEditedAgo(timeAfterEdition)
      }
    }

    calculateTimeAgo()

    const interval = setInterval(calculateTimeAgo, 60000)

    function getTimeAgo(elapsed) {
      const seconds = Math.floor(elapsed / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const months = Math.floor(days / 30)
      const years = Math.floor(months / 12)

      let timeString = ''
      if (years > 0) {
        timeString = `${years}y ago`
      } else if (months > 0) {
        timeString = `${months}m ago`
      } else if (days > 0) {
        timeString = `${days}d ago`
      } else if (hours > 0) {
        timeString = `${hours}h ago`
      } else if (minutes > 0) {
        timeString = `${minutes}min ago`
      } else {
        timeString = `${seconds}sek ago`
      }
      return timeString
    }

    return () => clearInterval(interval)
  }, [createdAt, updatedAt])

  return (
    <>
      {createdAt && (
        <span className="font-orbitron ml-1 mt-[2px] below-xs:leading-none text-app-blue/50 text-12">
          • {createdAgo}
        </span>
      )}
      {wasEdited && (
        <span className="font-orbitron below-xs:hidden ml-1 mt-[2px] `below-xs:leading-none text-app-blue/50 text-12">
          • Edited {editedAgo}
        </span>
      )}
    </>
  )
}
