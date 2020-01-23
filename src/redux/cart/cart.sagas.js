import { all, call, takeLatest, put } from "redux-saga/effects";

//this function will be fired
import { clearCart } from "./cart.actions";

//we need cause we are listening user actions
import UserActionTypes from "../user/user.types";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
