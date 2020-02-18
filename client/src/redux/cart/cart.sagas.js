import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

//we need cause we are listening user actions
import UserActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";
<<<<<<< HEAD
=======

import { clearCart, initCartFromFirebase } from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import CartActionTypes from "./cart.types";
>>>>>>> 0bd0abb6b6be55983f7d0217016c9453c649fc3c

import { clearCart, setCartFromFirebase } from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import CartActionTypes from "./cart.types";

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* checkCartFromFirebase({ payload: user }) {
  console.log(user);
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

<<<<<<< HEAD
export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_CART
    ],
    updateCartInFirebase
  );
}

=======
>>>>>>> 0bd0abb6b6be55983f7d0217016c9453c649fc3c
export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

<<<<<<< HEAD
=======
export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(initCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_CART
    ],
    updateCartInFirebase
  );
}

>>>>>>> 0bd0abb6b6be55983f7d0217016c9453c649fc3c
export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onCartChange), call(onUserSignIn)]);
}
