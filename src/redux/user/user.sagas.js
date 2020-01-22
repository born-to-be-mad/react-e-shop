import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleAuthProvider,
  createUserProfileDocument
} from "../../firebase/firebase.utils";

import { signInSuccess, signInFailure } from "./user.actions";

import UserActionTypes from "./user.types";

export function* getSnashotFrtomUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    //debugging what contains returned object
    //const userRef = yield auth.signInWithPopup(googleAuthProvider);
    //console.log(userRef);

    const { user } = yield auth.signInWithPopup(googleAuthProvider);
    yield getSnashotFrtomUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEMail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnashotFrtomUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEMailSigninStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEMail);
}

export function* userSagas() {
  yield all([call(onGoogleSigninStart), call(onEMailSigninStart)]);
}
