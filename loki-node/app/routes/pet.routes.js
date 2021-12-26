const pets = require("../controllers/pet.controller.js");
var router = require("express").Router();

  // // Create a new pet
  // router.post("/", pets.create);

  // // Retrieve all pets
  // router.get("/", pets.findAll);

  // // Retrieve a single product with id
  // router.get("/:id", pets.findOne);

  // // Update a product with id
  // router.put("/:id", pets.update);

  // // Delete a product with id
  // router.delete("/:id", pets.delete);

  // // Delete all pets
  // router.delete("/", pets.deleteAll);
  router
  .route("/")
  .get(
    pets.findAll
  )
  .post(pets.create);

  router
  .route("/:id")
  .get(pets.findOne)
  .put(pets.update)
  .delete(pets.delete);
module.exports = router;
