export function MyProfileUserData({ userData }) {
  return (
    <div className="user-data-container">
      <div className="user-data-name flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          name:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.name}
        </p>
      </div>
      <div className="user-data-email flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          email:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.email}
        </p>
      </div>
      <div className="user-data-address flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          address:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.address}
        </p>
      </div>
      <div className="user-data-phone flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          phone:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.phone}
        </p>
      </div>
    </div>
  )
}
