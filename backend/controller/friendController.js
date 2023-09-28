const User = require("../models/userModel");
const Friend = require("../models/friendModel");
const AppError = require("../utilities/appError");

exports.getFriends = async (req, res, next) => {
  try {
    if (!req.user.id) return next(new AppError("Please provide user id", 400));

    const results = await User.findById(req.user.id)
      .populate({ path: "friends", options: { sort: { status: 1 } } })
      .select(["-__v", "-introduction"])
      .exec();

    res.status(200).json({
      status: "success",
      results,
    });
  } catch (err) {
    next(err);
  }
};

exports.request = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userA = req.user.id;
    const userB = id;

    if (!userA || !userB)
      return next(new AppError("Please provide user id", 400));

    const docA = await Friend.findOneAndUpdate(
      { requester: userA, recipient: userB },
      { status: 1 },
      { upsert: true, new: true }
    );

    const docB = await Friend.findOneAndUpdate(
      { requester: userB, recipient: userA },
      { status: 2 },
      { upsert: true, new: true }
    );

    if (!docA || !docB)
      return next(new AppError("No document found with that ID", 404));

    const updateUserA = await User.findOneAndUpdate(
      { _id: userA },
      { $push: { friends: docA._id } },
      { new: true }
    );

    const updateUserB = await User.findOneAndUpdate(
      { _id: userB },
      { $push: { friends: docB._id } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      UserA: { docA, updateUserA },
      userB: { docB, updateUserB },
    });
  } catch (err) {
    next(err);
  }
};

exports.accept = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userA = req.user.id;
    const userB = id;

    if (!userA || !userB)
      return next(new AppError("Please provide user id", 400));

    await Friend.findOneAndUpdate(
      { requester: userA, recipient: userB },
      { status: 3 }
    );

    await Friend.findOneAndUpdate(
      { requester: userB, recipient: userA },
      { status: 3 }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userA = req.user.id;
    const userB = id;

    if (!userA || !userB)
      return next(new AppError("Please provide user id", 400));

    const docA = await Friend.findOneAndRemove({
      requester: userA,
      recipient: userB,
    });

    const docB = await Friend.findOneAndRemove({
      requester: userB,
      recipient: userA,
    });

    if (!docA || !docB)
      return next(new AppError("No document found with that ID", 404));

    await User.findOneAndUpdate(
      { _id: userA },
      { $pull: { friends: docA._id } }
    );

    await User.findOneAndUpdate(
      { _id: userB },
      { $pull: { friends: docB._id } }
    );

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
