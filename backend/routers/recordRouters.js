const router = require("express").Router();

const recordController = require("../controller/recordController");

router.route("/statisCountries/:id").get(recordController.getStatisCountries);
router.route("/statisContinents/:id").get(recordController.getStatisContinents);
router.route("/recentlyVisited/:id").get(recordController.getRecentlyVisited);

router
  .route("/")
  .get(recordController.getAllRecords)
  .post(recordController.createRecord);

router
  .route("/:id")
  .get(recordController.getRecord)
  .patch(recordController.updateRecord)
  .delete(recordController.deleteRecord);

module.exports = router;
