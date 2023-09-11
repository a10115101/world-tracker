const router = require("express").Router();

const friendController = require("../controller/friendController");

router.route("/request").get(friendController.request);
router.route("/accept").get(friendController.accept);
router.route("/rejecet").get(friendController.reject);
router.route("/getFriends").get(friendController.getFriends);

module.exports = router;
