import * as petService from '../services/Pet';
import { handleError } from '../../utils/error';
import * as PetConstant from '../constants/PetConstant';

/*
* PET LIST ACTION
*/
export const petListAction = (filters, initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: PetConstant.PETLIST_FETCH_START });
    }

    petService.filterParams(filters);

    const pets = await petService.fetchPets(filters);

    dispatch({
      type: PetConstant.PETLIST_FETCH_SUCCESS,
      payload: pets,
    });
  } catch (err) {
    dispatch({
      type: PetConstant.PETLIST_FETCH_ERROR,
      payload: handleError(err),
    });
  }
};

/*
* PET LIST ACTION (ADMIN)
*/
export const petListForAdminAction = (initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: PetConstant.PETLIST_FETCH_START });
    }

    const { results, count } = await petService.fetchPets({});

    dispatch({
      type: PetConstant.PETLIST_FETCH_SUCCESS,
      payload: { results, count },
    });
  } catch (err) {
    dispatch({
      type: PetConstant.PETLIST_FETCH_ERROR,
      payload: handleError(err),
    });
  }
};

/*
* PET ACTION
*/
export const petAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PetConstant.PET_FETCH_START });

    const data = await petService.fetchPet(id);

    dispatch({
      type: PetConstant.PET_FETCH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PetConstant.PET_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

/*
* CREATE PET ACTION
*/
export const createPetAction = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    dispatch({ type: PetConstant.CREATE_PET_START });

    await petService.createPet(formData);

    dispatch({
      type: PetConstant.CREATE_PET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PetConstant.CREATE_PET_FAIL,
      payload: handleError(err),
    });
  }
};

/*
* UPDATE PET ACTION
*/
export const updatePetAction = (id, UpdatedData) => async (dispatch) => {
  try {
    dispatch({ type: PetConstant.EDIT_PET_START });

    await petService.updatePet(id, UpdatedData);

    dispatch({
      type: PetConstant.EDIT_PET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PetConstant.EDIT_PET_FAIL,
      payload: handleError(err),
    });
  }
};

/*
* DELETE PET ACTION
*/
export const deletePetAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PetConstant.DELETE_PET_START });

    await petService.deletePet(id);

    dispatch({
      type: PetConstant.DELETE_PET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PetConstant.DELETE_PET_FAIL,
      payload: handleError(err),
    });
  }
};
