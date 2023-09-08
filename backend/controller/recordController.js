const Record = require("../models/recordModel");
const validator = require("../config/validator");

// getAllRecords
exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find({}).exec();

    res.status(200).json({
      status: "success",
      results: records.length,
      data: {
        records,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

// getRecord
exports.getRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).exec();

    if (!record)
      return res.status(404).json({
        status: "fail",
        message: {
          message: "No document found with that ID",
        },
      });

    res.status(200).json({
      status: "success",
      data: {
        data: record,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

// createRecord
exports.createRecord = async (req, res) => {
  const { error } = await validator.recordDataValidate(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  if (!req.body.user) req.body.user = req.user.id;

  try {
    const newRecord = await Record.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data: newRecord,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

// updateRecord
exports.updateRecord = async (req, res) => {
  const { error } = validator.recordDataValidate(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  if (!req.body.user) req.body.user = req.user.id;

  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!record)
      return res.status(404).json({
        status: "fail",
        message: {
          message: "No document found with that ID",
        },
      });

    res.status(200).json({
      status: "success",
      data: {
        data: record,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

// deleteRecord
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id).exec();

    if (!record)
      return res.status(404).json({
        status: "fail",
        message: {
          message: "No document found with that ID",
        },
      });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
