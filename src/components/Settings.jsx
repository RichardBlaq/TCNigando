import React, { useState } from 'react'
import { auth } from '../firebase' // Adjust path
import { updatePassword } from 'firebase/auth'

const Settings = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notifications, setNotifications] = useState(false) // Simulated toggle
  const [message, setMessage] = useState('')

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }
    try {
      await updatePassword(auth.currentUser, newPassword)
      setMessage('Password updated successfully!')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setMessage(''), 2000)
    } catch (err) {
      setMessage('Error updating password: ' + err.message)
      console.error('Password update error:', err)
    }
  }

  const handleNotificationToggle = () => {
    setNotifications(!notifications)
    setMessage(
      `Notifications ${notifications ? 'disabled' : 'enabled'} (simulated)`
    )
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12'>
      <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
          Settings
        </h2>
        <div className='space-y-6'>
          <form onSubmit={handlePasswordChange} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                New Password
              </label>
              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='••••••••'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Confirm New Password
              </label>
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='••••••••'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
            >
              Change Password
            </button>
          </form>

          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-gray-700'>
              Email Notifications
            </label>
            <input
              type='checkbox'
              checked={notifications}
              onChange={handleNotificationToggle}
              className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
            />
          </div>

          {message && (
            <p
              className={
                message.includes('Error') ? 'text-red-500' : 'text-green-500'
              }
              text-sm
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
