import { useMyProfileContext } from '@/lib/context/MyProfileProvider'

export function MyProfileUserData() {
  const { userData } = useMyProfileContext()
  return (
    <div className="user-data-container font-orbitron text-14">
      <div className="user-data-name flex items-center">
        <p className="profile-label-user-data min-w-28 w-28 my-[5px] mr-[17px]">
          name:
        </p>
        <p className="profile-user-data-name text-gray-600 max-lines-1">
          {userData.name}
        </p>
      </div>
      <div className="user-data-email flex items-center">
        <p className="profile-label-user-data  min-w-28 w-28 my-[5px] mr-[17px]">
          email:
        </p>
        <p className="profile-user-data-email text-gray-600 max-lines-1">
          {userData.email}
        </p>
      </div>
      <div className="user-data-profession flex items-center">
        <p className="profile-label-user-data min-w-28 w-28 my-[5px] mr-[17px]">
          profession:
        </p>
        <p className="profile-user-data-profession text-gray-600 max-lines-1">
          {userData.profession}
        </p>
      </div>

      <div className="user-data-organization flex items-center">
        <p className="profile-label-user-data min-w-28 w-28 my-[5px] mr-[17px]">
          organization:
        </p>
        <p className="profile-user-data-organization text-gray-600 max-lines-1">
          {userData.organization}
        </p>
      </div>
    </div>
  )
}
