module.exports = (sequelize, Sequelize) => {
  const Pet = sequelize.define("pet", {
    name: {
      type: Sequelize.STRING,
      required: [true, "Pet Name is required"]
    },
    description: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING,
      required: [true, "Pet Image is required"]
    },
    totalCount: {
      type: Sequelize.INTEGER,
      required: [true, "Total count is required"]
    },
    gender: {
      type: Sequelize.STRING,
      required: [true, "Gender is required"]
    },
    age: {
      type: Sequelize.STRING,
      required: [true, "Age is required"]
    },
    size: {
      type: Sequelize.STRING,
      required: [true, "Size is required"]
    },
    color: {
      type: Sequelize.STRING,
      required: [true, "Color is required"]
    },
    price: {
      type: Sequelize.DOUBLE,
      required: [true, "Price is required"]
    }
  });

  return Pet;
};
