import { CartActionTypes } from "./cart.types";

export const toggleCartVisibility = user => ({
  type: CartActionTypes.TOGGLE_CART
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});
