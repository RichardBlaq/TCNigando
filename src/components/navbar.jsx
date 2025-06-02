import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const firstName = user?.displayName?.split(' ')[0] || ''

  return (
    <nav className='fixed top-0 w-full bg-gray-900 z-50'>
      <div className='flex items-center justify-between px-4 py-3 sm:px-6'>
        <div className='flex items-center space-x-2'>
          <img
            src='/images/logo.png'
            alt='Logo'
            className='w-12 h-10 sm:w-16 sm:h-14'
          />
          <span className='text-white text-sm sm:text-base font-semibold'>
            The Covenant Nation Igando
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          {!user && (
            <Link
              to='/auth'
              className='bg-white text-black text-xs px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold hover:bg-gray-100 transition'
            >
              NEW HERE?
            </Link>
          )}
          <button
            className='md:hidden text-white text-xl sm:text-2xl'
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <div
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row md:items-center absolute md:static top-14 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent px-4 py-3 sm:px-6 md:p-0`}
      >
        <ul className='flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-4 text-white uppercase font-normal text-sm'>
          <li>
            <Link
              to='/'
              className='hover:text-gray-300 transition'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/sermons'
              className='hover:text-gray-300 transition'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sermons
            </Link>
          </li>
          <li>
            <Link
              to='/covenant-radio'
              className='hover:text-gray-300 transition'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Covenant Radio
            </Link>
          </li>
          <li className='relative'>
            <button
              onClick={toggleJoinUsDropdown}
              className='hover:text-gray-300 transition focus:outline-none'
            >
              Join Us
            </button>
            {isJoinUsOpen && (
              <div className='mt-2 w-full md:w-48 bg-gray-800 rounded-lg shadow-lg py-2 md:absolute md:left-0'>
                <Link
                  to='/join-us/ushering'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Ushering Department
                </Link>
                <Link
                  to='/join-us/childrens-church'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Children's Church
                </Link>
                <Link
                  to='/join-us/mens-fellowship'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Men's Fellowship
                </Link>
                <div className='relative'>
                  <button
                    onClick={toggleW2MediaDropdown}
                    className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  >
                    W2Media
                  </button>
                  {isW2MediaOpen && (
                    <div className='mt-2 w-full md:w-48 bg-gray-800 rounded-lg shadow-lg py-2 md:absolute md:left-full md:top-0'>
                      <Link
                        to='/join-us/w2media/social-media'
                        className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                        onClick={() => {
                          setIsJoinUsOpen(false)
                          setIsW2MediaOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Social Media
                      </Link>
                      <Link
                        to='/join-us/w2media/sound'
                        className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                        onClick={() => {
                          setIsJoinUsOpen(false)
                          setIsW2MediaOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Sound
                      </Link>
                      <Link
                        to='/join-us/w2media/graphics'
                        className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                        onClick={() => {
                          setIsJoinUsOpen(false)
                          setIsW2MediaOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Graphics Department
                      </Link>
                      <Link
                        to='/join-us/w2media'
                        className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                        onClick={() => {
                          setIsJoinUsOpen(false)
                          setIsW2MediaOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        W2Media
                      </Link>
                      <Link
                        to='/join-us/w2media/focus'
                        className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                        onClick={() => {
                          setIsJoinUsOpen(false)
                          setIsW2MediaOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Focus
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to='/join-us/levites'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Levites
                </Link>
                <Link
                  to='/join-us/protocol'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Protocol
                </Link>
                <Link
                  to='/join-us/pastoral-care'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Pastoral Care
                </Link>
                <Link
                  to='/join-us/information-desk'
                  className='block px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  onClick={() => {
                    setIsJoinUsOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Information Desk
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link
              to='/about-us'
              className='hover:text-gray-300 transition'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
        </ul>
        {user && (
          <div className='relative flex items-center space-x-2 mt-3 md:mt-0 md:ml-4'>
            <span className='text-white text-xs sm:text-sm font-semibold'>
              Hi, {firstName}
            </span>
            {photoURL ? (
              <img
                src={photoURL}
                alt='Profile'
                className='w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-gray-400 transition'
                onClick={toggleProfileDropdown}
              />
            ) : (
              <FaUserCircle
                className='text-white text-xl sm:text-2xl cursor-pointer hover:text-gray-300 transition'
                onClick={toggleProfileDropdown}
              />
            )}
            {isProfileOpen && (
              <div className='absolute top-8 right-0 bg-white text-black rounded-lg shadow-lg w-40 py-2'>
                <Link
                  to='/profile'
                  className='block px-3 py-2 hover:bg-gray-100 text-sm'
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to='/settings'
                  className='block px-3 py-2 hover:bg-gray-100 text-sm'
                  onClick={() => setIsProfileOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {playingSermon && location.pathname !== '/sermons' && (
        <div className='flex items-center justify-center space-x-3 bg-gray-800 bg-opacity-70 px-3 py-2 mx-4 sm:mx-6 rounded-lg mt-2'>
          <img
            src={playingSermon.image}
            alt='Now Playing'
            className='w-8 h-8 sm:w-10 sm:h-10 rounded-md'
          />
          <div className='text-white text-xs'>
            <p className='font-semibold truncate max-w-[120px] sm:max-w-[150px]'>
              {playingSermon.title}
            </p>
            <p className='text-gray-300 truncate'>{playingSermon.author}</p>
            <input
              type='range'
              min='0'
              max={audioRef.current?.duration || 100}
              value={audioRef.current?.currentTime || 0}
              onChange={(e) => handleSeek(e.target.value)}
              className='w-20 sm:w-24 h-1 bg-gray-600 rounded-full accent-green-400 mt-1'
            />
          </div>
          <button
            className='text-white hover:text-green-400 text-base sm:text-lg'
            onClick={togglePlayPause}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
