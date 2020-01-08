import { createSelector } from "reselect";

const selectCart = state => state.cart;

//memoize selectors
export const selectCartItems = createSelector(
  [selectCart], //collection of input selectors
  cart => cart.cartItems // function which returns the output of selector
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
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
