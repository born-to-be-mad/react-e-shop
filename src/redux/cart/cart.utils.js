export const addItemToCart = (items, itemToAdd) => {
  const existingItem = items.find(cartItem => cartItem.id === itemToAdd.id);
  if (existingItem) {
    return items.map(cartItem =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...items, { ...itemToAdd, quantity: 1 }];
};
