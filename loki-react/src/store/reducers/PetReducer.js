import * as petConstant from '../constants/PetConstant';

export const listPets = (state = { pets: [] }, action) => {
  switch (action.type) {
    case petConstant.PETLIST_FETCH_START:
      return {
        loading: true,
        pets: [],
      };
    case petConstant.PETLIST_FETCH_SUCCESS:
      return {
        pets: action.payload,
        success: true,
      };
    case petConstant.PETLIST_FETCH_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const pet = (state = { pet: {} }, action) => {
  switch (action.type) {
    case petConstant.PET_FETCH_START:
      return {
        loading: true,
        pet: {},
      };
    case petConstant.PET_FETCH_SUCCESS:
      return {
        pet: action.payload,
        success: true,
      };
    case petConstant.PET_FETCH_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};


export const createPet = (state = {}, action) => {
  switch (action.type) {
    case petConstant.CREATE_PET_START:
      return {
        loading: true,
      };
    case petConstant.CREATE_PET_SUCCESS:
      return {
        success: true,
      };
    case petConstant.CREATE_PET_FAIL:
      return {
        error: action.payload,
      };

    case petConstant.CREATE_PET_RESET:
      return {};

    default:
      return state;
  }
};

export const updatePet = (state = {}, action) => {
  switch (action.type) {
    case petConstant.EDIT_PET_START:
      return {
        loading: true,
      };
    case petConstant.EDIT_PET_SUCCESS:
      return {
        success: true,
      };
    case petConstant.EDIT_PET_FAIL:
      return {
        error: action.payload,
      };
    case petConstant.EDIT_PET_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePet = (state = {}, action) => {
  switch (action.type) {
    case petConstant.DELETE_PET_START:
      return {
        loading: true,
      };
    case petConstant.DELETE_PET_SUCCESS:
      return {
        success: true,
      };
    case petConstant.DELETE_PET_FAIL:
      return {
        error: action.payload,
      };

    case petConstant.DELETE_PET_RESET:
      return {};

    default:
      return state;
  }
};