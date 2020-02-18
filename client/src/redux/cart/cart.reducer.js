import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

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
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state, //everything else on the state
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state, //everything else on the state
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };
<<<<<<< HEAD
    case CartActionTypes.SET_CART_FROM_FIREBASE:
=======
    case CartActionTypes.INIT_CART_FROM_FIREBASE:
>>>>>>> 0bd0abb6b6be55983f7d0217016c9453c649fc3c
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
