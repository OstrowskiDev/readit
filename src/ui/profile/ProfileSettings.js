export function ProfileSettings() {
  return (
    <div className="profile-settings border-t border-gray-200 mt-4 pt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings:</h3>
      <ul className="space-y-2">
        <li>
          <a
            href="/my-profile/change-password"
            className="anchor-color transition-colors duration-200"
          >
            Change Password
          </a>
        </li>
        <li>
          <a
            href="/my-profile/delete-account"
            className="anchor-color transition-colors duration-200"
          >
            Delete Account
          </a>
        </li>
      </ul>
    </div>
  )
}
