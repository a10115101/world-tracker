const router = require("express").Router();

const { recordValidator } = require("../config/validator");
const Record = require("../models/recordModel");

// getAllRecords
router.get("/", async (req, res) => {
  try {
    const records = await Record.find({}).exec();

    res.status(200).json({
      status: "succeed",
      results: records.length,
      data: {
        data: records,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// getRecord
router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).exec();

    res.status(200).json({
      status: "succeed",
      data: {
        data: record,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// createRecord
router.post("/", async (req, res) => {
  const { error } = await recordValidator(req.body);

  //   error.details.forEach((detail) => console.log(detail.message));

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  try {
    const newRecord = await Record.create(req.body);

    res.status(200).json({
      status: "succeed",
      data: {
        data: newRecord,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// updateRecord
router.patch("/:id", async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    res.status(200).json({
      status: "succeed",
      data: {
        data: record,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// deleteRecord
router.delete("/:id", async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id).exec();

    res.status(204).json({
      status: "succeed",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

module.exports = router;
