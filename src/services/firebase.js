import { firebase, FieldValue } from '../lib/firebase';

export async function doesUserNameExists(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

    return result.docs.map((user) => user.data().length > 0);
}