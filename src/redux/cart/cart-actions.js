import { CartActionTypes } from "./cart.types";

export const toggleCartVisibility = () => ({
  type: CartActionTypes.TOGGLE_CART
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});
