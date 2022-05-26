import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import seed file
// import { seedDatabase } from '../seed';

// console.log(process.env.REACT_APP_apiKey)
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed file once
// seedDatabase(firebase);

export { firebase, FieldValue };
