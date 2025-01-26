import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebase.config';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);