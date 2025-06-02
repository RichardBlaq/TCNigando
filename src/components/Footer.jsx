const Footer = () => {
  return (
    <>
      {/* Header Above Footer */}
      <div className='bg-gray-900 text-white py-6 px-6 md:px-12 lg:px-24'>
        <div className='max-w-8xl mx-auto flex justify-between items-center'>
          <h2 className='text-lg md:text-xl font-bold tracking-wide uppercase'>
            The Covenant Nation Igando
          </h2>
          <button className='border border-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition'>
            New Here?
          </button>
        </div>
        {/* Divider Line */}
        <hr className='border-t border-gray-700 mt-4' />
      </div>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-12 px-6 md:px-12 lg:px-24'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left justify-center'>
          {/* About Section */}
          <div>
            <h3 className='text-blue-400 font-semibold mb-4 uppercase tracking-wider'>
              About
            </h3>
            <ul className='space-y-2'>
              <li className='hover:text-blue-300 cursor-pointer'>About Us</li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Covenant Capital
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Project Wrap
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>TCN Global</li>
            </ul>
          </div>

          {/* Get Involved Section */}
          <div>
            <h3 className='text-blue-400 font-semibold mb-4 uppercase tracking-wider'>
              Get Involved
            </h3>
            <ul className='space-y-2'>
              <li className='hover:text-blue-300 cursor-pointer'>Ushering</li>
              <li className='hover:text-blue-300 cursor-pointer'>Levites</li>
              <li className='hover:text-blue-300 cursor-pointer'>
                The Singles Fellowship
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Men's Fellowship
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Women's Fellowship
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Covenant Tribe
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                The Brook Church
              </li>
            </ul>
          </div>

          {/* Learn Section */}
          <div>
            <h3 className='text-blue-400 font-semibold mb-4 uppercase tracking-wider'>
              Learn
            </h3>
            <ul className='space-y-2'>
              <li className='hover:text-blue-300 cursor-pointer'>Sermons</li>
              <li className='hover:text-blue-300 cursor-pointer'>Videos</li>
              <li className='hover:text-blue-300 cursor-pointer'>Podcasts</li>
              <li className='hover:text-blue-300 cursor-pointer'>Music</li>
              <li className='hover:text-blue-300 cursor-pointer'>Articles</li>
              <li className='hover:text-blue-300 cursor-pointer'>Resources</li>
            </ul>
          </div>

          {/* Events Section */}
          <div>
            <h3 className='text-blue-400 font-semibold mb-4 uppercase tracking-wider'>
              Events
            </h3>
            <ul className='space-y-2'>
              <li className='hover:text-blue-300 cursor-pointer'>
                Sunday Service
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Month-End Prayers
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Midweek Services
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Monthly Fasting
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Daily Prayers
              </li>
              <li className='hover:text-blue-300 cursor-pointer'>
                Join Pastor on Mixlr
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
