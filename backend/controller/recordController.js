const Record = require("../models/recordModel");
const validator = require("../config/validator");
const AppError = require("../utilities/appError");
const apiFilter = require("../utilities/apiFilter");
const inputDataProcessor = require("../utilities/inputDataProcessor");

exports.getAllRecords = async (req, res, next) => {
  try {
    const queryStatus = apiFilter.queryStr(req.query.status);
    const queryDate = apiFilter.sorted(req.query.date);

    const records = await Record.find({
      user: req.user.id,
      status: { $in: queryStatus },
    })
      .sort(queryDate)
      .exec();

    res.status(200).json({
      status: "success",
      results: records.length,
      data: {
        records,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id).exec();

    if (!record)
      return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        record,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    const processedData = inputDataProcessor.record(req.body, req.user);
    const { error } = await validator.recordDataValidate(processedData);

    if (error) return next(new AppError(`${error.details[0].message}`, 400));

    const newRecord = await Record.create(processedData);
    res.status(200).json({
      status: "success",
      data: {
        data: newRecord,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const processedData = inputDataProcessor.record(req.body, req.user);
    const { error } = await validator.updateRecordDataValidate(processedData);

    if (error) return next(new AppError(`${error.details[0].message}`, 400));

    const record = await Record.findByIdAndUpdate(
      req.params.id,
      processedData,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!record)
      return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: record,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id).exec();

    if (!record)
      return next(new AppError("No document found with that ID", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.getStatisCountries = async (req, res, next) => {
  try {
    const visitedCountries = await Record.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$user", { $toObjectId: `${req.params.id}` }],
          },
        },
      },
      {
        $match: { status: { $eq: "visited" } },
      },
      {
        $group: {
          _id: "$country",
          num: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const planningCountries = await Record.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$user", { $toObjectId: `${req.params.id}` }],
          },
        },
      },
      {
        $match: { status: { $eq: "planning" } },
      },
      {
        $group: {
          _id: "$country",
          num: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        visitedCountries: {
          results: visitedCountries.length,
          countryName: visitedCountries,
        },
        planningCountries: {
          results: planningCountries.length,
          countryName: planningCountries,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getStatisContinents = async (req, res, next) => {
  try {
    const statis = await Record.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$user", { $toObjectId: `${req.params.id}` }],
          },
        },
      },
      {
        $match: { status: { $eq: "visited" } },
      },
      {
        $group: {
          _id: "$continent",
          num: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        statis,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecentlyVisited = async (req, res, next) => {
  try {
    const informaiton = await Record.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$user", { $toObjectId: `${req.params.id}` }],
          },
        },
      },
      {
        $match: { status: { $eq: "visited" } },
      },
      {
        $sort: { date: -1 },
      },
      {
        $project: { country: 1, cityName: 1, date: 1, rating: 1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        recentlyVisited: {
          results: informaiton.length,
          informaiton,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
