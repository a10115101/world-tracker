const router = require("express").Router();

const friendController = require("../controller/friendController");

router.route("/").get(friendController.getFriends);

router
  .route("/:id")
  .get(friendController.request)
  .patch(friendController.accept)
  .delete(friendController.cancel);

module.exports = router;
