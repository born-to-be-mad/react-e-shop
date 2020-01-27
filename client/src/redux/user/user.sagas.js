import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleAuthProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.actions";

import UserActionTypes from "./user.types";

export function* getSnashotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
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

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
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

//distructure from userCredentials-object
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInafterSignUp({ payload: { user, additionalData } }) {
  yield getSnashotFromUserAuth(user, additionalData);
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

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInafterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEMailSigninStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onCheckUserSession),
    call(isUserAuthenticated)
  ]);
}
