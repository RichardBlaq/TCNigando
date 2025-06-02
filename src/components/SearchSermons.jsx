import React from 'react'

const SearchSermons = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='flex justify-center'>
      <input
        type='text'
        placeholder='Search sermons...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full max-w-md px-4 py-2 text-lg border border-gray-600 rounded-4xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
      />
    </div>
  )
}

export default SearchSermons
