import React, { useEffect, useState } from 'react'

const Sermons = () => {
  const [sermons, setSermons] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sermons')
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await response.json()
        setSermons(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchSermons()
  }, [])

  if (loading) return <p className='text-center'>Loading sermons...</p>
  if (error) return <p className='text-center text-red-500'>Error: {error}</p>

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-2xl font-bold mb-4'>Sermons</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='border px-4 py-2'>Title</th>
              <th className='border px-4 py-2'>Author</th>
              <th className='border px-4 py-2'>Date</th>
              <th className='border px-4 py-2'>Duration</th>
              <th className='border px-4 py-2'>Description</th>
              <th className='border px-4 py-2'>Audio</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(sermons).map((category) =>
              sermons[category].map((sermon, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{sermon.title}</td>
                  <td className='border px-4 py-2'>{sermon.author}</td>
                  <td className='border px-4 py-2'>{sermon.pubDate}</td>
                  <td className='border px-4 py-2'>{sermon.duration}</td>
                  <td className='border px-4 py-2'>{sermon.description}</td>
                  <td className='border px-4 py-2'>
                    {sermon.audio ? (
                      <audio controls>
                        <source src={sermon.audio} type='audio/x-m4a' />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      'No audio available'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sermons
