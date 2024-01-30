import React from 'react'

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h2>
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/profile/edit"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >
                Edit Profile
              </a>
            </li>
            <li>
              <a
                href="/profile/change-password"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >
                Change Password
              </a>
            </li>
            <li>
              <a
                href="/profile/privacy"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >
                Privacy Settings
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            style={{ fontWeight: 'bold' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
