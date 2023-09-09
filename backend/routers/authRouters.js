const router = require("express").Router();
const passport = require("passport");

const authController = require("../controller/authController");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("Success Validation");
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
