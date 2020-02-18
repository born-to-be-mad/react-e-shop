import CartActionTypes from "./cart.types";

export const toggleCartVisibility = () => ({
  type: CartActionTypes.TOGGLE_CART
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const removeItemFromCart = item => ({
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});

<<<<<<< HEAD
export const updateCartInFirebase = () => ({
  type: CartActionTypes.UPDATE_CART_IN_FIREBASE
});

export const setCartFromFirebase = cartItems => ({
  type: CartActionTypes.SET_CART_FROM_FIREBASE,
=======
export const persistCartToFirebase = () => ({
  type: CartActionTypes.PERSIST_CART_TO_FIREBASE
});

export const initCartFromFirebase = cartItems => ({
  type: CartActionTypes.INIT_CART_FROM_FIREBASE,
>>>>>>> 0bd0abb6b6be55983f7d0217016c9453c649fc3c
  payload: cartItems
});
