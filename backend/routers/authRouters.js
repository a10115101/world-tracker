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

router.get(
  "/googleRedirect",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND}/redirect`,
    failureRedirect: process.env.FRONTEND,
  }),
  (req, res) => {
    console.log("Redirect");
    req.session.save();
    req.session.user = req.user;
    console.log(req.session);
  }
);

// router.get("/google", authController.googleLogin);
// router.get("/googleRedirect", authController.googleRedirect);
router.get("/getGoogleUser", authController.getGoogleUser);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
