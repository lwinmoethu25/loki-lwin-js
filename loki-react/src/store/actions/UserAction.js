import * as userServices from '../services/User';
import { handleError } from '../../utils/error';
import * as UserConstant from '../constants/UserConstant';
import * as TokenService from '../services/Token';

export const auth = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_AUTH_START });

    const body = {
      email,
      password,
    };

    const { authData, token } = await userServices.login(body);

    const userInfo = {
      ...authData,
      token,
    };

    TokenService.setToken(userInfo);
    dispatch({
      type: UserConstant.USER_AUTH_SUCCESS,
      payload: userInfo,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USER_AUTH_FAIL,
      payload: handleError(err),
    });
  }
};

export const Logout = () => (dispatch) => {
  TokenService.removeToken();
  dispatch({ type: UserConstant.RESET });
};

export const register = (name, email, phone, address, city, state, postCode, password) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_REGISTER_START });

    const body = {
      name,
      email,
      phone,
      address,
      city,
      state,
      postCode,
      password
    };
    const { message } = await userServices.registerUser(body);

    dispatch({
      type: UserConstant.USER_REGISTER_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USER_REGISTER_FAIL,
      payload: handleError(err),
    });
  }
};

export const emailVerification = (verificationCode) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_AUTH_START });

    const code = {
      verificationCode,
    };

    const { authData, token } = await userServices.verifyEmail(code);

    const userInfo = {
      ...authData,
      token,
    };
   
    TokenService.setToken(userInfo);
    
    dispatch({
      type: UserConstant.USER_AUTH_SUCCESS,
      payload: userInfo,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USER_AUTH_FAIL,
      payload: handleError(err),
    });
  }
};

export const userList = (initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: UserConstant.USERLIST_FETCH_START });
    }

    const { results, count } = await userServices.fetchUsers();

    dispatch({
      type: UserConstant.USERLIST_FETCH_SUCCESS,
      payload: {
        results,
        count,
      },
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USERLIST_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_DELETE_START });

    await userServices.deleteUser(id);

    dispatch({
      type: UserConstant.USER_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USER_DELETE_FAIL,
      payload: handleError(err),
    });
  }
};

export const updateUser = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_EDIT_START });

    await userServices.updateUser(id, updatedData);

    dispatch({
      type: UserConstant.USER_EDIT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USER_EDIT_FAIL,
      payload: handleError(err),
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_FETCH_START });

    const data = await userServices.fetchUser(id);

    dispatch({
      type: UserConstant.USER_FETCH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.USER_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.FORGOT_PASSWORD_SEND_START });

    const { message } = await userServices.forgotPassword(email);

    dispatch({
      type: UserConstant.FORGOT_PASSWORD_SEND_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.FORGOT_PASSWORD_SEND_FAIL,
      payload: handleError(err),
    });
  }
};

export const resetPassword = (resetPasswordData) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.RESET_PASSWORD_START });

    const { message } = await userServices.resetPassword(resetPasswordData);

    dispatch({
      type: UserConstant.RESET_PASSWORD_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: UserConstant.RESET_PASSWORD_FAIL,
      payload: handleError(err),
    });
  }
};
