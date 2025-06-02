import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { auth } from './firebase' // Adjust path if needed
import { onAuthStateChanged } from 'firebase/auth'
import Navbar from './components/navbar'
import Home from './components/home'
import Sermons from './components/Sermons'
import Auth from './components/Auth' // New auth component
import BibleVerseGenerator from './components/BibleVerseGenerator'
import Footer from './components/Footer'
import Profile from './components/Profile'; // Create this
import Settings from './components/Settings'; // Create this
import W2Media from './components/W2Media'

function App() {
  const [playingSermon, setPlayingSermon] = useState(null)
  const audioRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [user, setUser] = useState(null) // Auth state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(
        'Auth state changed:',
        currentUser ? currentUser.email : 'Logged out'
      )
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!playingSermon && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.removeEventListener('timeupdate', updateProgress)
      audioRef.current = null
      setIsPlaying(false)
      setProgress(0)
    }
  }, [playingSermon])

  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      const newProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0
      setProgress(newProgress)
    }
  }, [])

  const handlePlay = useCallback(
    (sermon) => {
      console.log('HANDLE_PLAY: Entering with sermon:', JSON.stringify(sermon))
      try {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.removeEventListener('timeupdate', updateProgress)
          audioRef.current = null
          setIsPlaying(false)
        }

        const audio = new Audio(sermon.audio)
        audioRef.current = audio
        audio.addEventListener('timeupdate', updateProgress)
        console.log('HANDLE_PLAY: Attempting to play:', sermon.audio)
        audio
          .play()
          .then(() => {
            console.log('HANDLE_PLAY: Playing successfully')
            setPlayingSermon(sermon)
            setIsPlaying(true)
          })
          .catch((err) => console.error('HANDLE_PLAY: Play error:', err))
      } catch (err) {
        console.error('HANDLE_PLAY: General error:', err)
      }
    },
    [updateProgress]
  )

  const handlePause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      console.log('Pausing audio')
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isPlaying])

  const handleResume = useCallback(() => {
    if (audioRef.current && !isPlaying && playingSermon) {
      console.log('Resuming audio')
      audioRef.current
        .play()
        .then(() => {
          console.log('Audio resumed successfully')
          setIsPlaying(true)
        })
        .catch((err) => console.error('Error resuming audio:', err))
    }
  }, [isPlaying, playingSermon])

  const handleSeek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress((time / audioRef.current.duration) * 100 || 0)
    }
  }, [])

  console.log('App rendering, handlePlay defined:', !!handlePlay)

  return (
    <Router>
      <MainContent
        playingSermon={playingSermon}
        setPlayingSermon={setPlayingSermon}
        audioRef={audioRef}
        progress={progress}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleResume={handleResume}
        handleSeek={handleSeek}
        user={user}
        setUser={setUser}
      />
    </Router>
  )
}

function MainContent({
  playingSermon,
  setPlayingSermon,
  audioRef,
  progress,
  isPlaying,
  handlePlay,
  handlePause,
  handleResume,
  handleSeek,
  user,
  setUser,
}) {
  const location = useLocation()
  console.log('MainContent rendering, handlePlay passed:', !!handlePlay)

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar
        playingSermon={playingSermon}
        audioRef={audioRef}
        progress={progress}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleResume={handleResume}
        handleSeek={handleSeek}
        user={user} // Pass user to navbar
      />
      <main className='flex-1'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                playingSermon={playingSermon}
                audioRef={audioRef}
                progress={progress}
              />
            }
          />
          <Route
            path='/sermons'
            element={
              <Sermons
                playingSermon={playingSermon}
                setPlayingSermon={setPlayingSermon}
                audioRef={audioRef}
                progress={progress}
                isPlaying={isPlaying}
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleResume={handleResume}
                handleSeek={handleSeek}
                user={user} // Pass user to sermons if needed
              />
            }
          />
          <Route
            path='/auth'
            element={<Auth user={user} setUser={setUser} />}
          />

          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/join-us/w2media' element={<W2Media />} />

          {/* Add other routes like /covenant-radio, /join-us, /about-us as needed */}
        </Routes>
      </main>
      {location.pathname === '/' && <BibleVerseGenerator />}
      <Footer />
    </div>
  )
}

export default App
