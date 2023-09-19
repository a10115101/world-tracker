const User = require("../models/userModel");
const Friend = require("../models/friendModel");

exports.request = async (req, res, next) => {
  try {
    //test
    const userA = "64fb0444d4da797a369607c6";
    const userB = "65000a5f9e42f36f29ea5486";

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

    const updateUserA = await User.findOneAndUpdate(
      { _id: userA },
      { $push: { friends: docA._id } }
    );

    const updateUserB = await User.findOneAndUpdate(
      { _id: userB },
      { $push: { friends: docB._id } }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.accept = async (req, res, next) => {
  try {
    const userA = "64fb04aed4da797a369607d0";
    const userB = "64fb0444d4da797a369607c6";

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

exports.reject = async (req, res, next) => {
  try {
    const userA = "64fb04aed4da797a369607d0";
    const userB = "64fb0444d4da797a369607c6";

    const docA = await Friend.findOneAndRemove({
      requester: userA,
      recipient: userB,
    });

    const docB = await Friend.findOneAndRemove({
      requester: userB,
      recipient: userA,
    });

    const updateUserA = await User.findOneAndUpdate(
      { _id: userA },
      { $pull: { friends: docA._id } }
    );

    const updateUserB = await User.findOneAndUpdate(
      { _id: userB },
      { $pull: { friends: docB._id } }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.getFriends = async (req, res, next) => {
  try {
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
