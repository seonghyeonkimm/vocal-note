import firebase from '../utils/firebase';

const useFirebaseStorage = () => {
  if (firebase.apps.length) {
    return firebase.storage().ref();
  }
}

export default useFirebaseStorage;
