import * as cartConstant from '../constants/CartConstant';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
  switch (action.type) {
    case cartConstant.ADD_TO_CART_ITEM:
      const item = action.payload;
      console.log(item);

      const existPet = state.cartItems.find((x) => x.id === item.id);
            if (existPet) {
                return {
                  ...state,
                  cartItems: state.cartItems.map((x) => (x.id === existPet.id ? item : x)),
                };
            } else {
            return {
              ...state,
              cartItems: [...state.cartItems, item],
            };
           }

    case cartConstant.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case cartConstant.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case cartConstant.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case cartConstant.CART_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
      };
    default:
      return state;
  }
};
