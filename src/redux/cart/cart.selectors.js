import { createSelector } from "reselect";

const selectCart = state => state.cart;

//memoize selector
export const selectCartItems = createSelector(
  [selectCart], //collection of input selectors
  cart => cart.cartItems // function which returns the output of selector
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    ) // returns total quantity
);
