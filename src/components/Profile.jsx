import React, { useState, useEffect } from 'react'
import { auth, db, updateProfile } from '../firebase' // Adjust path
import { doc, setDoc, getDoc } from 'firebase/firestore'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bio, setBio] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [photoURL, setPhotoURL] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const currentUser = auth.currentUser
    if (currentUser) {
      setUser(currentUser)
      const [fName, lName] = currentUser.displayName?.split(' ') || ['', '']
      setFirstName(fName)
      setLastName(lName || '')
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setAddress(data.address || '')
          setPhoneNumber(data.phoneNumber || '')
          setBio(data.bio || '')
          setPhotoURL(data.photoURL || '')
        }
      }
      fetchUserData().catch((err) => console.error('Fetch error:', err))
    }
  }, [])

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'unsigned_preset')
    formData.append('cloud_name', 'dpunz8rem')

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dpunz8rem/image/upload',
        formData
      )
      return response.data.secure_url
    } catch (err) {
      throw new Error('Cloudinary upload failed: ' + err.message)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setMessage('Saving...')
    try {
      console.log('Saving profile with:', {
        firstName,
        lastName,
        address,
        phoneNumber,
        bio,
        profilePic,
      })

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      })
      console.log('Auth updated:', auth.currentUser.displayName)

      let newPhotoURL = photoURL
      if (profilePic) {
        newPhotoURL = await uploadToCloudinary(profilePic)
        console.log('Photo uploaded to Cloudinary:', newPhotoURL)
      }

      await setDoc(
        doc(db, 'users', auth.currentUser.uid),
        {
          firstName,
          lastName,
          address,
          phoneNumber,
          bio,
          photoURL: newPhotoURL,
        },
        { merge: true }
      )
      console.log('Firestore updated')

      setPhotoURL(newPhotoURL)
      setProfilePic(null)
      setUser(auth.currentUser)
      setMessage('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setMessage(''), 2000)
    } catch (err) {
      console.error('Save error:', err)
      setMessage('Error updating profile: ' + err.message)
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0])
      console.log('File selected:', e.target.files[0].name)
    }
  }

  if (!user)
    return <div className='text-center mt-10 text-gray-600'>Loading...</div>

  return (
    <div className='min-h-screen bg-gray-100 pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
      {' '}
      {/* Changed py-12 to pt-32 pb-12 */}
      <div className='max-w-4xl mx-auto'>
        {/* Profile Header */}
        <div className='flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8'>
          <div className='flex-shrink-0'>
            {photoURL ? (
              <img
                src={photoURL}
                alt='Profile'
                className='w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg object-cover'
              />
            ) : (
              <div className='w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-semibold'>
                No Photo
              </div>
            )}
          </div>
          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>{`${firstName} ${lastName}`}</h1>
            <p className='mt-2 text-gray-600'>{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className='mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <h2 className='text-xl font-semibold text-gray-700'>Address</h2>
            <p className='mt-1 text-gray-600'>{address || 'Not set'}</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold text-gray-700'>
              Phone Number
            </h2>
            <p className='mt-1 text-gray-600'>{phoneNumber || 'Not set'}</p>
          </div>
          <div className='md:col-span-2'>
            <h2 className='text-xl font-semibold text-gray-700'>Bio</h2>
            <p className='mt-1 text-gray-600 whitespace-pre-wrap'>
              {bio || 'Not set'}
            </p>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Edit Profile
              </h2>
              <form onSubmit={handleSave} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    First Name
                  </label>
                  <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Address
                  </label>
                  <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='123 Main St'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='+1 123-456-7890'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='Tell us about yourself...'
                    rows='4'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Profile Picture
                  </label>
                  {photoURL && (
                    <img
                      src={photoURL}
                      alt='Profile'
                      className='w-24 h-24 rounded-full mb-2'
                    />
                  )}
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='mt-1 w-full'
                  />
                  {profilePic && (
                    <p className='text-sm text-gray-600'>
                      Selected: {profilePic.name}
                    </p>
                  )}
                </div>
                <div className='flex space-x-2'>
                  <button
                    type='submit'
                    className='py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
                  >
                    Save Changes
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='py-2 px-4 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition duration-300'
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {message && (
                <div className='mt-4 flex items-center justify-between bg-gray-100 p-2 rounded-lg'>
                  <p
                    className={
                      message.includes('Error')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }
                    text-sm
                  >
                    {message}
                  </p>
                  <button
                    onClick={() => setMessage('')}
                    className='text-gray-500 hover:text-gray-700 focus:outline-none'
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
