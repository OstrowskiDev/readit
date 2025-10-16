'use client'

import { updateUserData } from '@/lib/actions/utils'
import { Avatar, getAvatarColors } from '@/services/dicebear/Avatar'
import { avatarColors, avatarSeeds } from '@/services/dicebear/avatarProps'
import { useMyProfileContext } from '@/lib/context/MyProfileProvider'
import { ProfileFormButtons } from './ProfileFormButtons'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function ProfileAvatarSelection({ handleAvatarEdit }) {
  const { userData, setUserData, setResponse } = useMyProfileContext()
  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar)
  const { status, update } = useSession()

  async function handleSubmit(event) {
    event.preventDefault()

    if (status === 'authenticated') {
      setUserData({
        ...userData,
        avatar: selectedAvatar,
      })
      const results = await updateUserData({
        ...userData,
        avatar: selectedAvatar,
      })
      if (results) setResponse(results)

      update({
        avatar: {
          seed: selectedAvatar.seed,
          color: selectedAvatar.color,
        },
      })
      handleAvatarEdit()
    }
  }

  function handleSelection(key, value) {
    setSelectedAvatar({
      ...selectedAvatar,
      [key]: value,
    })
  }

  const handleCancel = () => {
    handleAvatarEdit()
  }

  return (
    <div className="avatar-select-container">
      {userData && (
        <>
          <h4 className="avatar-select-seed-label ml-4 pt-1 font-normal text-lg text-app-blue-text">
            select avatar seed:
          </h4>
          <div className="avatar-select-seed flex justify-center flex-wrap  lg:ml-l lg:mr-4 mb-4">
            {avatarSeeds.map((seed) => (
              <div
                className={`avatar-seed-${seed.toLowerCase()} m-1 lg:m-2 hover:cursor-pointer rounded-full `}
                key={seed}
                onClick={() => handleSelection('seed', seed)}
              >
                <div
                  className={
                    'avatar-transform-wrapper rounded-full transform transition-all duration-200 overflow-hidden ' +
                    (selectedAvatar.seed === seed
                      ? 'scale-110'
                      : 'hover:scale-110 opacity-50 hover:shadow-xl')
                  }
                >
                  <Avatar
                    seed={seed}
                    color={selectedAvatar.color}
                    size={80}
                    border={2}
                  />
                </div>
              </div>
            ))}
          </div>
          <h4 className="avatar-select-color-label ml-4 pt-1 font-normal text-lg text-app-blue-text">
            select avatar color:
          </h4>
          <div className="avatar-select-seed mx-8 flex flex-wrap justify-center">
            {avatarColors.map((color) => {
              const { bgColor, borderColor } = getAvatarColors(color)
              return (
                <div key={color}>
                  <div
                    className={`avatar-color-${color.toLowerCase()} w-12 h-12 m-[6px] border-2 rounded-full hover:cursor-pointer transform transition-all duration-200 hover:scale-110 overflow-hidden 
                      ${selectedAvatar.color === color ? 'scale-110' : ''}
                    `}
                    style={{ background: bgColor, borderColor: borderColor }}
                    onClick={() => handleSelection('color', color)}
                  ></div>
                </div>
              )
            })}
          </div>
          <div className="avatar-selection-buttons-container mb-6">
            <ProfileFormButtons
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </div>
        </>
      )}
    </div>
  )
}
