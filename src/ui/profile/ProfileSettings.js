export function ProfileSettings() {
  return (
    <div className="profile-settings border-t border-app-blue/50 mt-4 pt-4">
      <h3 className="profile-settings-title text-lg font-semibold text-app-blue-text mb-2">
        Settings:
      </h3>
      <ul className="space-y-2">
        <li>
          <a
            href="/my-profile/change-password"
            className="anchor-color font-orbitron text-14"
          >
            Change Password
          </a>
        </li>
        <li>
          <a
            href="/my-profile/delete-account"
            className="anchor-color font-orbitron text-14"
          >
            Delete Account
          </a>
        </li>
      </ul>
    </div>
  )
}
