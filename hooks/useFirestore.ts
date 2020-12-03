import firebase from '../firebase';

const useFirebase = () => {
  if (firebase.apps.length) {
    return firebase.firestore();
  }
}

export default useFirebase;
