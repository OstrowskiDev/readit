'use client'

import { useState } from 'react'
import Avatar, { getAvatarColors } from '../lib/avatars/Avatar'
import { ProfileFormButtons } from './ProfileFormButtons'

export function ProfileAvatarSelection({ userData, setUserData }) {
  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar)

  const avatarSeeds = [
    'Lola',
    'Jack',
    'Abby',
    'Angel',
    'Annie',
    'Bella',
    'Bear',
    'Gracie',
    'Jasper',
    'Bailey',
    'Jasmine',
    'Bob',
    'Boo',
    'Lucky',
    'Lilly',
    'Felix',
    'Ginger',
    'Casper',
    'Botts',
    'Charlie',
    'Cleo',
    'Bubba',
    'Whiskers',
    'Willow',
    'Pepper',
  ]
  const avatarColors = [
    'violet',
    'blue',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
  ]

  function handleSubmit(event) {
    event.preventDefault()
    setUserData(selectedAvatar)
    handleAvatarSelectionVisibility()
    // !!!! add function to update user data in db
  }

  function handleSelection(key, value) {
    setSelectedAvatar({
      ...selectedAvatar,
      [key]: value,
    })
  }

  const handleCancel = () => {
    handleAvatarSelectionVisibility()
  }

  return (
    <div>
      {userData && (
        <>
          <h4 className="avatar-select-seed-label ml-4 pt-1 font-normal text-lg text-gray-800 border-t border-gray-200">
            select avatar seed:
          </h4>
          <div className="avatar-select-seed flex flex-wrap mx-l mb-4 mr-4">
            {avatarSeeds.map((seed) => (
              <div
                className="avatar-seed m-2 hover:cursor-pointer  rounded-full "
                key={seed}
                onClick={() => handleSelection('seed', seed)}
              >
                <div
                  className={
                    'avatar-transform-wrapper border rounded-full transform transition-all duration-200 overflow-hidden scale-110 ' +
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
          <h4 className="avatar-select-color-label  ml-4 pt-1 font-normal text-lg text-gray-800">
            select avatar color:
          </h4>
          <div className="avatar-select-seed mx-8 flex flex-wrap justify-around">
            {avatarColors.map((color) => {
              const { bgColor, borderColor } = getAvatarColors(color)
              return (
                <>
                  <div
                    className={
                      'avatar-color w-12 h-12 m-[6px] border rounded-full hover:cursor-pointer transform transition-all duration-200 hover:scale-110 overflow-hidden ' +
                      (selectedAvatar.color === color ? 'scale-110' : '')
                    }
                    style={{ background: bgColor, borderColor: borderColor }}
                    key={color}
                    onClick={() => handleSelection('color', color)}
                  ></div>
                </>
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
