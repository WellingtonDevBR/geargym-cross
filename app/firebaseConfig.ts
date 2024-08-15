import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDLaMweTp0VgThYLdvgULggugz_nWU9ICg',
  authDomain: 'geargym.firebaseapp.com',
  databaseURL: 'https://geargym.firebaseio.com',
  projectId: 'geargym',
  storageBucket: 'geargym.appspot.com',
  messagingSenderId: '635776407329',
  appId: '1:635776407329:ios:9462b893f2e26849b65060',
  measurementId: 'G-5RDZLZEC18',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});