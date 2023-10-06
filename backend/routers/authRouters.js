const router = require("express").Router();
const authController = require("../controller/authController");

router.get("/google", authController.googleLogin);
router.get("/googleRedirect", authController.googleRedirect);
router.get("/getGoogleUser", authController.getGoogleUser);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
