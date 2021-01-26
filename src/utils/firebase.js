import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import {firebaseConfig} from './config';

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = firebase.firestore();
export default app;