import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import seed file
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyAqNpMEaCynj3_FxAr5nCrvnQFDUXarYls',
  authDomain: 'instagram-hd-a1da8.firebaseapp.com',
  projectId: 'instagram-hd-a1da8',
  storageBucket: 'instagram-hd-a1da8.appspot.com',
  messagingSenderId: '886976400704',
  appId: '1:886976400704:web:c8b5faa328091c8cb0bea5'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed file once
// seedDatabase(firebase);

export { firebase, FieldValue };
