const router = require("express").Router();

const { registerValidation } = require("../config/validator");
const User = require("../models/userModel");

// getAllUsers
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).exec();

    res.status(200).json({
      status: "succeed",
      results: users.length,
      data: {
        data: users,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// getUser
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

    res.status(200).json({
      status: "succeed",
      data: {
        data: user,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// createUser
router.post("/", async (req, res) => {
  const { error } = await registerValidation(req.body);

  //   error.details.forEach((detail) => console.log(detail.message));

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "succeed",
      data: {
        data: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// updateUser
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    res.status(200).json({
      status: "succeed",
      data: {
        data: user,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

// deleteUser
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).exec();

    res.status(204).json({
      status: "succeed",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

module.exports = router;
