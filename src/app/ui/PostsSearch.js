import React from 'react'

export default function PostsSearch() {
  return (
    <div className="flex items-center justify-end below-md:flex-col flex-grow rounded-md gap-4">
      <input
        type="text"
        className="
          max-w-[40rem] w-full h-10 
          py-2 px-4 mr-2 rounded-md 
          bg-white border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for post..."
      />
      <div className="below-md:w-full flex">
        <select
          className="
            below-md:w-full h-10
            mr-2 py-2 px-4 rounded-md 
            bg-white border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All users">All users</option>
          <option value="Sofia Schmidt">Sofia Schmidt</option>
          <option value="Luca Müller">Luca Müller</option>
          <option value="Matteo Rossi">Matteo Rossi</option>
          <option value="Emma Jensen">Emma Jensen</option>
          <option value="Jan Kowalski">Jan Kowalski</option>
          <option value="Isabella Ivanova">Isabella Ivanova</option>
        </select>
        <button
          className="
            h-10 py-2 px-4 rounded-md
            bg-blue-500 text-white 
            hover:bg-blue-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition-all duration-200"
        >
          Search
        </button>
      </div>
    </div>
  )
}
