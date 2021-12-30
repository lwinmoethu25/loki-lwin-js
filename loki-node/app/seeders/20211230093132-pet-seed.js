'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Pets', [{
      name: 'Bengal',
      description: 'Domestic Cat',
      imageUrl: 'http://placekitten.com/300/300',
      totalCount: 3,
      gender: 'Female',
      age: '2 Months',
      size: 'Small',
      color: 'Golden',
      price: 500,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      name: 'Ragdoll',
      description: 'Semi-longhair',
      imageUrl: 'http://placekitten.com/300/300',
      totalCount: 5,
      gender: 'Male',
      age: '5 Months',
      size: 'Medium',
      color: 'Bi Color',
      price: 1000,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      name: 'Persian',
      description: 'Persian Longhair',
      imageUrl: 'http://placekitten.com/300/300',
      totalCount: 7,
      gender: 'Male',
      age: '6 Months',
      size: 'Medium',
      color: 'Cream White',
      price: 2500,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    }] )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Pets', null, {});
  }
};
