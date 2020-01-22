import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleAuthProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

import { signInSuccess, signInFailure } from "./user.actions";

import UserActionTypes from "./user.types";

export function* getSnashotFromUserAuth(userAuth) {
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
    yield getSnashotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEMail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnashotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    //quit if user is not signed-in
    if (!userAuth) return;

    yield getSnashotFromUserAuth(userAuth);
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

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEMailSigninStart),
    call(onCheckUserSession),
    call(isUserAuthenticated)
  ]);
}
