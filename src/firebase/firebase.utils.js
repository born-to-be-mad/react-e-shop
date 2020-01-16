import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyADN5bybMjKtyIPrVXKrNRi1fnn3yh1uGA",
  authDomain: "e-shop-db-42778.firebaseapp.com",
  databaseURL: "https://e-shop-db-42778.firebaseio.com",
  projectId: "e-shop-db-42778",
  storageBucket: "e-shop-db-42778.appspot.com",
  messagingSenderId: "237902715500",
  appId: "1:237902715500:web:ed3ff71586a15503525649",
  measurementId: "G-0BTVLPBPYQ"
};

firebase.initializeApp(config);
//firebase.analytics();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //query document by using QueryReference object - returns DocumentReference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //query collections by using QueryReference object - returns CollectionReference
  const collectionRef = firestore.collections("/users");
  const collectionSnapshot = await collectionRef.get();
  console.log("User collection has size:" + collectionSnapshot.size);
  console.log({ collection: collectionSnapshot.docs().map(doc => doc.data()) });

  //retrieve the snapshotObject by using .get() on DocumentReference
  const userSnapShot = await userRef.get();

  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //create
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log("Collection reference:" + collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  //fire batch call with all INSERTs
  return await batch.commit(); //Promise
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider);

export default firebase;
