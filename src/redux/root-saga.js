import { all, call } from "redux-saga/effects";

import { onFetchCollectionsStart } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";

export default function* rootSaga() {
  //all expects arrrays of sagas and we can pass any number of sgas to call
  yield all([call(onFetchCollectionsStart), call(userSagas), call(cartSagas)]);
}
