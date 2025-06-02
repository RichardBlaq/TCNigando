import React, { useState } from 'react'
import { auth } from '../firebase' // Adjust path
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Auth = ({ user, setUser }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        })
        console.log('Registered:', userCredential.user.email)
        setUser(userCredential.user)
        setSuccess('Account created successfully!')
        setTimeout(() => navigate('/'), 2000)
      } catch (err) {
        setError(err.message)
        console.error('Auth error:', err)
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log('Logged in:', userCredential.user.email)
        setUser(userCredential.user)
        setSuccess(
          `Logged in as ${userCredential.user.displayName.split(' ')[0]}`
        )
        setTimeout(() => navigate('/'), 2000)
      } catch (err) {
        setError(err.message)
        console.error('Auth error:', err)
      }
    }
  }

  const toggleMode = () => setIsRegistering(!isRegistering)

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className='space-y-6'>
          {isRegistering && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  First Name
                </label>
                <input
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  placeholder='John'
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
                  placeholder='Doe'
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
              placeholder='you@example.com'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
              placeholder='••••••••'
              required
            />
          </div>
          {isRegistering && (
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Confirm Password
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
          )}
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
          >
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className='mt-4 text-center text-sm text-gray-600'>
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className='text-blue-500 hover:underline focus:outline-none'
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
