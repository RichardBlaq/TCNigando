import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
  '/images/img7.jpg',
  '/images/img8.jpg',
]

const Home = () => {
  const [bgImage, setBgImage] = useState(images[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setBgImage(images[index])
  }, [index])

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {/* Background Image Slider */}
      <AnimatePresence>
        <motion.div
          key={bgImage}
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${bgImage})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black opacity-60'></div>
      {/* Hero Content */}
      <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 sm:px-6'>
        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>
          Our Reach is Expanding
        </h1>
        <button className='mt-4 px-4 py-2 sm:px-6 sm:py-3 border border-white rounded-full text-base sm:text-lg font-medium hover:bg-white hover:text-black transition'>
          Join Our Team
        </button>

        <div className='absolute left-2 sm:left-4 bottom-8 flex flex-col items-center gap-2'>
          <button className='px-2 py-1 sm:px-3 sm:py-2 rounded-full rotate-90 uppercase tracking-wide text-xs sm:text-sm font-medium mb-8 sm:mb-12'>
            Give
          </button>
          <button className='px-2 py-1 sm:px-3 sm:py-2 rounded-full rotate-90 uppercase tracking-wide text-xs sm:text-sm font-medium mb-8 sm:mb-12'>
            Get Involved
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
