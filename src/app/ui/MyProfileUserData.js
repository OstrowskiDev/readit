export function MyProfileUserData({ userData }) {
  return (
    <div className="user-data-container">
      <div className="user-data-name flex items-center">
        <p className="profile-label-user-data min-w-20 w-20 mr-2 text-md text-gray-900">
          name:
        </p>
        <p className="profile-user-data my-[5px] text-md text-gray-600 max-lines-1">
          {userData.name}
        </p>
      </div>
      <div className="user-data-email flex items-center">
        <p className="profile-label-user-data min-w-20 w-20 mr-2 text-md text-gray-900">
          email:
        </p>
        <p className="profile-user-data my-[5px] text-md text-gray-600 max-lines-1">
          {userData.email}
        </p>
      </div>
      <div className="user-data-address flex items-center">
        <p className="profile-label-user-data min-w-20 w-20 mr-2 text-md text-gray-900">
          address:
        </p>
        <p className="profile-user-data my-[5px] text-md text-gray-600 max-lines-1">
          {userData.address}
        </p>
      </div>
      <div className="user-data-phone flex items-center">
        <p className="profile-label-user-data min-w-20 w-20 mr-2 text-md text-gray-900">
          phone:
        </p>
        <p className="profile-user-data my-[5px] text-md text-gray-600 max-lines-1">
          {userData.phone}
        </p>
      </div>
    </div>
  )
}
