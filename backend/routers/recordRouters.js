const router = require("express").Router();

const recordController = require("../controller/recordController");

router.route("/getHistory").get(recordController.getHistoryRecords);

router
  .route("/")
  .get(recordController.getAllRecords)
  .post(recordController.createRecord);

router
  .route("/:id")
  .get(recordController.getRecord)
  .post(recordController.updateRecord)
  .delete(recordController.deleteRecord);

module.exports = router;
