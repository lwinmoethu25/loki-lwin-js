import config from '../../config';
import http from '../../utils/http';
import { interpolate } from '../../utils/string';

/**
 *
 * @param {Object} filters
 * @returns {Array} data
 */
export const fetchPets = async (filters) => {
  const { data } = await http.get(config.apiEndPoint.pet.fetchPets, {
    params: {
      ...filters,
    },
  });
  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const fetchPet = async (id) => {
  const url = interpolate(config.apiEndPoint.pet.fetchPet, { id: id });

  const { data } = await http.get(url);

  return data.data;
};


/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const deletePet = async (id) => {
  const url = interpolate(config.apiEndPoint.pet.deletePet, {
    id: id,
  });
  const { data } = await http.remove(url, {
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Object} body
 * @returns {Object} data
 */
export const createPet = async (body) => {
  console.log(body);
  const { data } = await http.post(config.apiEndPoint.pet.createPet, {
    body
  });

  return data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const updatePet = async (id, body) => {
  const url = interpolate(config.apiEndPoint.pet.updatePet, {
    id: id,
  });
  const { data } = await http.put(url, {
    body,
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Object} filters
 */
export const filterParams = (filters) => {
  Object.keys(filters).forEach((key) => {
    if (filters.hasOwnProperty(key)) {
      if (filters[key] === '') {
        delete filters[key];
      }
    }
  });
};
