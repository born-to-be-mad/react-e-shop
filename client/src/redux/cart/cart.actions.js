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

export const persistCartToFirebase = () => ({
  type: CartActionTypes.PERSIST_CART_TO_FIREBASE
});

export const initCartFromFirebase = cartItems => ({
  type: CartActionTypes.INIT_CART_FROM_FIREBASE,
  payload: cartItems
});
