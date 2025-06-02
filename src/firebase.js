// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, updateProfile } from 'firebase/auth' // Import updateProfile here
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMwIyYGhQxtzcRn1gv0DOzQF7Gwnyua-g',
  authDomain: 'covenantsite.firebaseapp.com',
  projectId: 'covenantsite',
  storageBucket: 'covenantsite.firebasestorage.app',
  messagingSenderId: '723696715602',
  appId: '1:723696715602:web:03aba63bb3e398a3651c8b',
  measurementId: 'G-3RCBEV88RP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

console.log('Firebase app initialized:', app)
console.log('Auth instance:', auth)
export { auth, db, updateProfile } // Export updateProfile

// Export auth for use in other files
