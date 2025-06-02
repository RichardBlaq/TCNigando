import React from 'react'
import { Link } from 'react-router-dom'

const W2Media = () => {
  console.log('Attempting to load image from: /images/W2MEDIA.jpg')

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      {/* Hero Section */}
      <div className='relative w-full h-256'>
        <img
          src='/images/W2MEDIA.jpg'
          alt='W2Media Hero'
          className='absolute inset-0 w-full h-full object-cover'
          style={{ display: 'block', zIndex: 1 }}
          onLoad={(e) =>
            console.log('Hero image loaded', {
              width: e.target.naturalWidth,
              height: e.target.naturalHeight,
            })
          }
          onError={() => console.error('Failed to load hero image')}
        />
        <div
          className='relative z-10 flex items-center justify-center h-full'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
        >
          <h1 className='text-4xl md:text-5xl font-bold text-white text-center'>
            We make church visual for Everyone.
          </h1>
        </div>
      </div>

      {/* Two-Column Section */}
      <div className='w-full py-12 px-4 md:px-8 bg-white'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-50'>
          {/* Left Column: Text */}
          <div className='flex flex-col justify-center'>
            <p className='text-gray-700 text-lg leading-relaxed'>
              As technology advances, there is a growing need for more inclusive
              and dynamic ways to share God’s Word. W2Media, the media
              expression of The Covenant Nation Igando, stands at the
              intersection of faith and innovation—harnessing digital platforms
              to spread the Gospel effectively.
            </p>
            <p className='text-gray-700 text-lg leading-relaxed mt-4'>
              In this context, <strong>W2Media</strong>—the media expression of{' '}
              <em>The Covenant Nation Igando</em>—Through videos, podcasts, live
              streams, and social media, W2Media delivers spiritually enriching
              content that connects with people in today’s fast-paced world. It
              recognizes that while the message remains eternal, the method must
              evolve. More than just a media outlet, W2Media builds community
              and fosters spiritual growth, offering engaging and accessible
              content to all. It’s where technology meets theology—ensuring no
              one is left out of the divine conversation.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className='flex items-center justify-center'>
            <img
              src='/images/W2MEDIA.jpg'
              alt='W2Media Section'
              className='w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md'
              onLoad={(e) =>
                console.log('Section image loaded', {
                  width: e.target.naturalWidth,
                  height: e.target.naturalHeight,
                })
              }
              onError={() => console.error('Failed to load section image')}
            />
          </div>
        </div>
      </div>

      {/* Two-Column Section */}
      <div className='w-full py-12 px-4 md:px-8 bg-gray-900'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-50'>
          {/* Right Column: Image */}
          <div className='flex items-center justify-center'>
            <img
              src='/images/w2m2.jpg'
              alt='W2Media Section'
              className='w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md'
              onLoad={(e) =>
                console.log('Section image loaded', {
                  width: e.target.naturalWidth,
                  height: e.target.naturalHeight,
                })
              }
              onError={() => console.error('Failed to load section image')}
            />
          </div>

          {/* Left Column: Text */}
          <div className='flex flex-col justify-center'>
            <p className='text-white text-lg leading-relaxed'>
              At W2Media, The Covenant Nation Igando, everything we do is done
              to the glory of God. We believe that human creativity and
              technology are gifts—tools that, when used with purpose, can
              powerfully serve the Kingdom. From video production and podcasts
              to graphic design, social media, and digital storytelling, we use
              modern tools to express timeless truths.
            </p>
            <p className='text-white text-lg leading-relaxed mt-4'>
              In this context, <strong>W2Media</strong>—the media expression of{' '}
              <em>The Covenant Nation Igando</em>—Our mission is not just to
              create content, but to create impact—to inspire, inform, and draw
              hearts closer to God. We are intentional about excellence,
              relevance, and spiritual depth in every project. At W2Media, we
              recognize that every sound, image, and word is an opportunity to
              reflect God's glory. Simply put: we do all to the glory of God,
              using human tools with divine purpose.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='max-w-4xl w-full bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-4xl font-bold text-gray-900 mb-6 text-center'>
            W2Media Department
          </h2>
          <p className='text-gray-700 mb-8 text-center'>
            Welcome to the W2Media Department! We handle various aspects of
            media and technology to support our community's mission. Explore our
            different sections below:
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Link
              to='/join-us/w2media/social-media'
              className='block p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-center'
            >
              Social Media
            </Link>
            <Link
              to='/join-us/w2media/sound'
              className='block p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-center'
            >
              Sound
            </Link>
            <Link
              to='/join-us/w2media/graphics'
              className='block p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-center'
            >
              Graphics Department
            </Link>
            <Link
              to='/join-us/w2media/w2media'
              className='block p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-center'
            >
              W2Media
            </Link>
            <Link
              to='/join-us/w2media/focus'
              className='block p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-center'
            >
              Focus
            </Link>
          </div>

          <div className='mt-8 text-center'>
            <Link
              to='/join-us'
              className='text-gray-600 hover:text-gray-800 underline transition duration-300'
            >
              Back to Join Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default W2Media
