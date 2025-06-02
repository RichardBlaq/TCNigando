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
        <div className='text-red-500'>
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
        const response = await fetch('http://localhost:5000/api/sermons')
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        console.log('Raw sermon data:', data)
        const allSermons = Object.values(data)
          .flat()
          .map((sermon, index) => {
            const sermonWithId = {
              ...sermon,
              id: sermon.id || index.toString(), // Simple fallback to index
              image:
                sermon.image ||
                'https://www.covenantchristiancentre.org/podcasts/images/itunesalbumart.jpg',
            }
            console.log('Processed sermon:', sermonWithId)
            return sermonWithId
          })

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

  console.log('Sermons rendering, handlePlay received:', !!handlePlay)

  const togglePlayPause = (sermon) => {
    console.log('Button clicked for sermon:', sermon.title)
    console.log(
      'Current playingSermon:',
      playingSermon?.title,
      'isPlaying:',
      isPlaying
    )
    console.log(
      'Clicked sermon ID:',
      sermon.id,
      'Playing sermon ID:',
      playingSermon?.id
    )

    if (playingSermon?.id === sermon.id && isPlaying) {
      console.log('Pausing current sermon')
      handlePause()
    } else {
      console.log('Playing new or resuming sermon')
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
          className='relative w-screen m-0 p-0 bg-cover bg-center flex items-center justify-center text-center py-24'
          style={{
            backgroundImage: "url('/images/sermonhero.jpg')",
            height: '600px',
          }}
        >
          {playingSermon && (
            <div className='relative flex items-center space-x-6'>
              <img
                src='/images/pastor.jpg'
                alt='Pastor'
                className='w-60 h-60 rounded-full shadow-xl border-2 border-gray-200'
              />
              <div className='border-gray-700 border-1 bg-opacity-70 backdrop-blur-md p-6 rounded-xl w-full max-w-3xl shadow-lg'>
                <div className='flex items-center space-x-6'>
                  <img
                    src={playingSermon.image}
                    alt='Playing'
                    className='w-20 h-20 rounded-md shadow-md'
                  />
                  <div className='text-left'>
                    <h3 className='text-lg font-bold text-white'>
                      {playingSermon.title}
                    </h3>
                    <p className='text-sm text-gray-300'>
                      {playingSermon.author}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {playingSermon.pubDate} • {playingSermon.duration}
                    </p>
                  </div>
                </div>
                <p className='mt-4 text-sm text-gray-300'>
                  {playingSermon.description}
                </p>
                <div className='mt-4'>
                  <input
                    type='range'
                    min='0'
                    max={audioRef.current?.duration || 100}
                    value={audioRef.current?.currentTime || 0}
                    onChange={(e) => handleSeek(e.target.value)}
                    className='w-full h-2 bg-gray-700 rounded-full accent-green-500'
                  />
                </div>
                <div className='flex justify-center items-center mt-4'>
                  {isPlaying ? (
                    <button
                      className='text-white hover:text-green-400 text-3xl'
                      onClick={handlePause}
                    >
                      ❚❚
                    </button>
                  ) : (
                    <button
                      className='text-white hover:text-green-400 text-3xl'
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

        <div className='w-full px-6 py-12'>
          <SearchSermons
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {loading ? (
            <p className='text-center mt-6'>Loading sermons...</p>
          ) : error ? (
            <p className='text-center text-red-500 mt-6'>Error: {error}</p>
          ) : (
            <div className='w-full px-50 mt-20'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
                {currentSermons.map((sermon) => (
                  <div
                    key={sermon.id}
                    className={`relative border rounded-4xl p-4 shadow-md transition duration-300 hover:border-gray-500 ${
                      playingSermon?.id === sermon.id && isPlaying
                        ? 'ring-4 ring-blue-500'
                        : 'border border-white'
                    }`}
                  >
                    <div className='relative'>
                      <img
                        src={sermon.image}
                        alt='Album Artwork'
                        className='w-full h-40 object-cover rounded-md'
                      />
                    </div>
                    <div className='mt-3 text-gray-300'>
                      <h3 className='text-md font-semibold text-blue-400'>
                        {sermon.title}
                      </h3>
                      <p className='text-xs text-gray-400'>{sermon.author}</p>
                      <p className='text-xs text-gray-500'>{sermon.pubDate}</p>
                      <p className='text-sm mt-2'>{sermon.description}</p>
                      <p className='text-gray-400 text-xs mt-1'>
                        Duration: {sermon.duration}
                      </p>
                      {sermon.audio ? (
                        <div className='flex justify-center mt-3'>
                          <button
                            onClick={() => togglePlayPause(sermon)}
                            className='bg-gray-800 text-white hover:text-green-400 text-2xl px-4 py-2 rounded-full cursor-pointer focus:outline-none z-10'
                          >
                            {sermon.id === playingSermon?.id && isPlaying
                              ? '❚❚'
                              : '▶'}
                          </button>
                        </div>
                      ) : (
                        <p className='text-xs text-red-400 mt-2'>
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

        <div className='flex justify-center mt-6 space-x-10 p-20'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(filteredSermons.length / sermonsPerPage)
            }
            className='px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Sermons
