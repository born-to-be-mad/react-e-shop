import UserActionTypes from "./user.types";

export const checkUserSession = error => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailWithPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailWithPassword
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});
