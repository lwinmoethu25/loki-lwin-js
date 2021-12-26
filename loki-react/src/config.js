/**
 * Application wide configuration
 */
const config = {
  baseURI: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
  apiEndPoint: {
    user: {
      login: '/auth/login',
      create: '/auth/register',
      fetchUsers: '/user',
      verifyEmail: '/auth/verify-email',
      deleteUser: '/user/:id',
      updateUser: '/user/:id',
      fetchUser: '/user/:id',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
    },
    pet: {
      fetchPets: '/pets',
      fetchPet: '/pets/:id',
      deletePet: '/pets/:id',
      createPet: '/pets',
      updatePet: '/pets/:id',
    }
  },
};

export default config;
