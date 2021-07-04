import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// ** Firebaseプロジェクトの設定を記す
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBvM95H260m1QORFE2zXtnRpdMuchV1s-Q',
    authDomain: 'miyata-insta.firebaseapp.com',
    projectId: 'miyata-insta',
    storageBucket: 'miyata-insta.appspot.com',
    messagingSenderId: '875025643611',
    appId: '1:875025643611:web:de025c4875ec59f91b277e',
    measurementId: 'G-ZY9QCF1X09',
  })
}

export const firestore = firebase.firestore()
export const storage = firebase.storage()
export { firebase }
