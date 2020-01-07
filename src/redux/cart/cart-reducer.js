import { CartActionTypes } from "./cart.types";

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state, //everything else on the state
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state, //everything else on the state
        cartItems: [...state.cartItems, action.payload] // spread existing cart items and add action.payload to the end of this array
      };
    default:
      return state;
  }
};

export default cartReducer;
