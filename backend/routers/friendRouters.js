const router = require("express").Router();

const Friend = require("../models/friendModel");
const User = require("../models/userModel");

router.get("/request", async (req, res) => {
  try {
    //test
    const userA = "64fb04aed4da797a369607d0";
    const userB = "64fb0444d4da797a369607c6";

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
    res.status(500).json({
      status: "fail",
    });
  }
});

router.get("/accept", async (req, res) => {
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
    res.status(500).json({
      status: "fail",
    });
  }
});

router.get("/rejecet", async (req, res) => {
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
    res.status(500).json({
      status: "fail",
    });
  }
});

router.get("/getFriends", async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $lookup: {
          from: "friends",
          let: { friends: "$friends" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$friends"] },
              },
            },
            { $project: { requester: 1, recipient: 1, status: 1 } },
          ],
          as: "friends",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      results,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
});

module.exports = router;
