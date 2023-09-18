const router = require("express").Router();

const userController = require("../controller/userController");

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(userController.deleteUser);

module.exports = router;
