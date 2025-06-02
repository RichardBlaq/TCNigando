import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase' // Adjust path
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = ({
  playingSermon,
  audioRef,
  progress,
  isPlaying,
  handlePlay,
  handlePause,
  handleResume,
  handleSeek,
  user,
  setUser,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false)
  const [isW2MediaOpen, setIsW2MediaOpen] = useState(false)
  const [photoURL, setPhotoURL] = useState('')

  useEffect(() => {
    if (user) {
      const fetchPhotoURL = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setPhotoURL(userDoc.data().photoURL || '')
        }
      }
      fetchPhotoURL().catch((err) => console.error('Navbar fetch error:', err))
    }
  }, [user])

  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause()
    } else if (playingSermon) {
      handleResume()
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setIsProfileOpen(false)
      navigate('/')
      console.log('Logged out successfully')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const toggleJoinUsDropdown = () => {
    setIsJoinUsOpen(!isJoinUsOpen)
  }

  const toggleW2MediaDropdown = () => {
    setIsW2MediaOpen(!isW2MediaOpen)
  }

  const firstName = user?.displayName?.split(' ')[0] || ''

  return (
    <nav className='fixed top-0 w-full bg-gray-900 flex items-center justify-between px-20 py-6 z-50'>
      <div className='logo'>
        <img src='/images/logo.png' alt='Logo' className='w-24 h-20' />
      </div>
      <ul className='hidden md:flex space-x-6 text-white uppercase font-normal'>
        <li>
          <Link to='/' className='hover:text-gray-300 transition duration-300'>
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/sermons'
            className='hover:text-gray-300 transition duration-300'
          >
            Sermons
          </Link>
        </li>
        <li>
          <Link
            to='/covenant-radio'
            className='hover:text-gray-300 transition duration-300'
          >
            Covenant Radio
          </Link>
        </li>
        <li className='relative '>
          <button
            onClick={toggleJoinUsDropdown}
            className='hover:text-gray-300 uppercase transition duration-300 focus:outline-none'
          >
            Join Us
          </button>
          {isJoinUsOpen && (
            <div className='absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50'>
              <Link
                to='/join-us/ushering'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Ushering Department
              </Link>
              <Link
                to='/join-us/childrens-church'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Children's Church
              </Link>
              <Link
                to='/join-us/mens-fellowship'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Men's Fellowship
              </Link>
              <div className='relative'>
                <button
                  onClick={toggleW2MediaDropdown}
                  className='block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition duration-200 focus:outline-none'
                >
                  W2Media
                </button>
                {isW2MediaOpen && (
                  <div className='absolute left-full top-0 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50'>
                    <Link
                      to='/join-us/w2media/social-media'
                      className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                      onClick={() => {
                        setIsJoinUsOpen(false)
                        setIsW2MediaOpen(false)
                      }}
                    >
                      Social Media
                    </Link>
                    <Link
                      to='/join-us/w2media/sound'
                      className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                      onClick={() => {
                        setIsJoinUsOpen(false)
                        setIsW2MediaOpen(false)
                      }}
                    >
                      Sound
                    </Link>
                    <Link
                      to='/join-us/w2media/graphics'
                      className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                      onClick={() => {
                        setIsJoinUsOpen(false)
                        setIsW2MediaOpen(false)
                      }}
                    >
                      Graphics Department
                    </Link>
                    <Link
                      to='/join-us/w2media' // Changed to link to the W2Media page
                      className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                      onClick={() => {
                        setIsJoinUsOpen(false)
                        setIsW2MediaOpen(false)
                      }}
                    >
                      W2Media
                    </Link>
                    <Link
                      to='/join-us/w2media/focus'
                      className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                      onClick={() => {
                        setIsJoinUsOpen(false)
                        setIsW2MediaOpen(false)
                      }}
                    >
                      Focus
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to='/join-us/levites'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Levites
              </Link>
              <Link
                to='/join-us/protocol'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Protocol
              </Link>
              <Link
                to='/join-us/pastoral-care'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Pastoral Care
              </Link>
              <Link
                to='/join-us/information-desk'
                className='block px-4 py-2 text-white hover:bg-gray-700 transition duration-200'
                onClick={() => setIsJoinUsOpen(false)}
              >
                Information Desk
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link
            to='/about-us'
            className='hover:text-gray-300 transition duration-300'
          >
            About Us
          </Link>
        </li>
      </ul>
      {playingSermon && location.pathname !== '/sermons' && (
        <div className='flex items-center space-x-4 bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg shadow-md'>
          <img
            src={playingSermon.image}
            alt='Now Playing'
            className='w-12 h-12 rounded-md'
          />
          <div className='text-white text-sm'>
            <p className='font-semibold'>{playingSermon.title}</p>
            <p className='text-gray-300 text-xs'>{playingSermon.author}</p>
            <input
              type='range'
              min='0'
              max={audioRef.current?.duration || 100}
              value={audioRef.current?.currentTime || 0}
              onChange={(e) => handleSeek(e.target.value)}
              className='w-full h-1 bg-gray-600 rounded-full accent-green-400 mt-1'
            />
          </div>
          <button
            className='text-white hover:text-green-400 text-xl'
            onClick={togglePlayPause}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      )}
      {user ? (
        <div className='relative flex items-center space-x-2'>
          <span className='text-white text-sm font-semibold'>
            Hi, {firstName}
          </span>
          {photoURL ? (
            <img
              src={photoURL}
              alt='Profile'
              className='w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-gray-400 transition duration-300'
              onClick={toggleProfileDropdown}
            />
          ) : (
            <FaUserCircle
              className='text-white text-2xl cursor-pointer hover:text-gray-300 transition duration-300'
              onClick={toggleProfileDropdown}
            />
          )}
          {isProfileOpen && (
            <div className='absolute top-12 right-0 bg-white text-black rounded-lg shadow-lg w-48 py-2 z-50'>
              <Link
                to='/profile'
                className='block px-4 py-2 hover:bg-gray-100'
                onClick={() => setIsProfileOpen(false)}
              >
                Profile
              </Link>
              <Link
                to='/settings'
                className='block px-4 py-2 hover:bg-gray-100'
                onClick={() => setIsProfileOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full text-left px-4 py-2 hover:bg-gray-100'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to='/auth'
          className='bg-white text-black text-xs px-8 py-4 rounded-full shadow-md font-semibold hover:bg-gray-100 transition duration-300'
        >
          NEW HERE?
        </Link>
      )}
    </nav>
  )
}

export default Navbar
