import React, { useState, useEffect } from 'react'

const BibleVerseGenerator = () => {
  // Predefined verses (optional fallback if API fails)
  const verses = [
    {
      text: 'For we walk by faith, not by sight.',
      reference: '2 Corinthians 5:7',
    },
    {
      text: 'I can do all things through Christ who strengthens me.',
      reference: 'Philippians 4:13',
    },
    {
      text: 'Trust in the Lord with all your heart and lean not on your own understanding.',
      reference: 'Proverbs 3:5',
    },
    {
      text: 'The Lord is my shepherd; I shall not want.',
      reference: 'Psalm 23:1',
    },
  ]

  const [verse, setVerse] = useState(verses[0])

  // Function to fetch a new verse
  const getNewVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length)
    setVerse(verses[randomIndex])
  }

  return (
    <section className='w-full min-h-[50vh] flex flex-col justify-center items-center text-center bg-gray-900 text-white p-10'>
      <h2 className='text-3xl md:text-4xl font-bold mb-4'>Daily Bible Verse</h2>
      <p className='text-xl italic mb-4'>"{verse.text}"</p>
      <span className='text-lg font-medium'>{verse.reference}</span>
      <button
        onClick={getNewVerse}
        className='mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition'
      >
        Get New Verse
      </button>
    </section>
  )
}

export default BibleVerseGenerator
