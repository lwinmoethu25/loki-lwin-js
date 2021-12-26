const db = require("../models");
const Pet = db.pets;
const Op = db.Sequelize.Op;

// Create and Save a new Pet
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Name can not be empty!"
  //   });
  //   return;
  // }

  // Save Pet in the database
  Pet.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pet."
      });
    });
};

// Retrieve all Pets from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Pet.findAll({ where: condition , order: [['updatedAt', 'DESC']]})
    .then(data => {
      res.status(200).send({ status: "success", data: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pets."
      });
    });
};

// Find a single proudct with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pet.findByPk(id)
    .then(data => {
      res.status(200).send({ status: "success", data: data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pet with id=" + id
      });
    });
};

// Update a Pet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pet.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pet was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pet with id=${id}. Maybe Pet was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating pet with id=" + id
      });
    });
};

// Delete a Pet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pet.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pet was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pet with id=${id}. Maybe Pet was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pet with id=" + id
      });
    });
};

// Delete all Pets from the database.
exports.deleteAll = (req, res) => {
  Pet.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Pets were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pets."
      });
    });
};

// find all published Pet
exports.findAllPublished = (req, res) => {
  Pet.findAll({ where: { isPublished: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pets."
      });
    });
};
