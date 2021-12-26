import * as petService from '../services/Pet';
import { handleError } from '../../utils/error';
import * as cartConstants from '../constants/CartConstant';

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  try {
    const data = await petService.fetchPet(id);

    dispatch({
      type: cartConstants.ADD_TO_CART_ITEM,
      payload: payLoadForCartItem(data, qty),
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (err) {
    dispatch({
      type: cartConstants.ADD_TO_CART_FAIL,
      payload: handleError(err),
    });
  }
};

export const payLoadForCartItem = (data, qty) => {
  return {
    id: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    price: data.price,
    totalCount: data.totalCount,
    age: data.age,
    gender: data.gender,
    size: data.size,
    color: data.color,
    qty
  };
};

export const removeItemFromCartAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: cartConstants.CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: cartConstants.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
