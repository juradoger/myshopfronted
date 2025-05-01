import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBD4MOFAhApXIlIcFZZ-7_D7r2dfXBE78k',
  authDomain: 'progra4test.firebaseapp.com',
  projectId: 'progra4test',
  storageBucket: 'progra4test.appspot.com',
  messagingSenderId: '438820518633',
  appId: '1:438820518633:web:60a0ef2110168882d00e78',
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
