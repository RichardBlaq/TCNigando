import React, { useEffect, useState } from 'react'
import SearchSermons from './SearchSermons'

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='text-red-500 p-4'>
          <h1>Something went wrong:</h1>
          <pre>{this.state.error.toString()}</pre>
          <pre>{this.state.error.stack}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

const Sermons = ({
  playingSermon,
  setPlayingSermon,
  audioRef,
  progress,
  isPlaying,
  handlePlay,
  handlePause,
  handleResume,
  handleSeek,
}) => {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const sermonsPerPage = 9

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch('/api/sermons')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        const allSermons = data.map((sermon, index) => ({
          ...sermon,
          id: sermon.id || index.toString(),
          image:
            sermon.image ||
            'https://www.covenantchristiancentre.org/podcasts/images/itunesalbumart.jpg',
        }))
        setSermons(allSermons)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchSermons()
  }, [])

  useEffect(() => {
    if (playingSermon) {
      localStorage.setItem('playingSermon', JSON.stringify(playingSermon))
    } else {
      localStorage.removeItem('playingSermon')
    }
  }, [playingSermon])

  const togglePlayPause = (sermon) => {
    if (playingSermon?.id === sermon.id && isPlaying) {
      handlePause()
    } else {
      handlePlay(sermon)
    }
  }

  const filteredSermons = sermons.filter((sermon) =>
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastSermon = currentPage * sermonsPerPage
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage
  const currentSermons = filteredSermons.slice(
    indexOfFirstSermon,
    indexOfLastSermon
  )

  const nextPage = () => {
    const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage)
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <ErrorBoundary>
      <div className='w-full min-h-screen bg-gray-900 text-white'>
        {/* Hero Section */}
        <div
          className='relative w-full bg-cover bg-center flex items-center justify-center text-center py-12 sm:py-16'
          style={{
            backgroundImage: "url('/images/sermonhero.jpg')",
            minHeight: '300px',
          }}
        >
          {playingSermon && (
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 px-4'>
              <img
                src='/images/pastor.jpg'
                alt='Pastor'
                className='w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-xl border-2 border-gray-200'
              />
              <div className='bg-opacity-70 backdrop-blur-md p-4 rounded-xl w-full max-w-md shadow-lg'>
                <div className='flex items-center space-x-4'>
                  <img
                    src={playingSermon.image}
                    alt='Playing'
                    className='w-16 h-16 rounded-md shadow-md'
                  />
                  <div className='text-left'>
                    <h3 className='text-base sm:text-lg font-bold text-white'>
                      {playingSermon.title}
                    </h3>
                    <p className='text-xs sm:text-sm text-gray-300'>
                      {playingSermon.author}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {playingSermon.pubDate} • {playingSermon.duration}
                    </p>
                  </div>
                </div>
                <p className='mt-3 text-xs sm:text-sm text-gray-300 line-clamp-3'>
                  {playingSermon.description}
                </p>
                <div className='mt-3'>
                  <input
                    type='range'
                    min='0'
                    max={audioRef.current?.duration || 100}
                    value={audioRef.current?.currentTime || 0}
                    onChange={(e) => handleSeek(e.target.value)}
                    className='w-full h-1 bg-gray-700 rounded-full accent-green-500'
                  />
                </div>
                <div className='flex justify-center mt-3'>
                  {isPlaying ? (
                    <button
                      className='text-white hover:text-green-400 text-2xl'
                      onClick={handlePause}
                    >
                      ❚❚
                    </button>
                  ) : (
                    <button
                      className='text-white hover:text-green-400 text-2xl'
                      onClick={handleResume}
                    >
                      ▶
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='w-full px-4 py-8 sm:px-6'>
          <SearchSermons
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {loading ? (
            <p className='text-center mt-4'>Loading sermons...</p>
          ) : error ? (
            <p className='text-center text-red-500 mt-4'>Error: {error}</p>
          ) : (
            <div className='mt-6'>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {currentSermons.map((sermon) => (
                  <div
                    key={sermon.id}
                    className={`border rounded-xl p-3 shadow-md transition duration-300 hover:border-gray-500 ${
                      playingSermon?.id === sermon.id && isPlaying
                        ? 'ring-2 ring-blue-500'
                        : 'border-white'
                    }`}
                  >
                    <div>
                      <img
                        src={sermon.image}
                        alt='Album Artwork'
                        className='w-full h-28 sm:h-36 object-cover rounded-md'
                      />
                    </div>
                    <div className='mt-2 text-gray-300 text-sm'>
                      <h3 className='font-semibold text-blue-400'>
                        {sermon.title}
                      </h3>
                      <p className='text-xs text-gray-400'>{sermon.author}</p>
                      <p className='text-xs text-gray-500'>{sermon.pubDate}</p>
                      <p className='mt-1 line-clamp-2'>{sermon.description}</p>
                      <p className='text-xs mt-1'>
                        Duration: {sermon.duration}
                      </p>
                      {sermon.audio ? (
                        <div className='flex justify-center mt-2'>
                          <button
                            onClick={() => togglePlayPause(sermon)}
                            className='bg-gray-800 text-white hover:text-green-300 text-xl px-3 py-1 rounded-full'
                          >
                            {sermon.id === playingSermon?.id && isPlaying
                              ? '❚❚'
                              : '▶'}
                          </button>
                        </div>
                      ) : (
                        <p className='text-xs text-red-600 mt-1'>
                          No audio available
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-center gap-2 py-6'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className='px-3 py-1 sm:px-4 sm:text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(filteredSermons.length / sermonsPerPage)
            }
            className='px-3 py-1 sm:px-4 sm:text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Sermons
