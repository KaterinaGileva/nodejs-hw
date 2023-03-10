const express = require('express');

const ctrl = require("../../controllers/auth");
//const {subscriptionUpdate} = require("../../controllers/subscriptionUpdate");

const {auth, upload, validateBody} = require("../../middlewares");
const {schemas} = require("../../models/user");

//const {validateSubscriptionUpdate} = require("../middlewares/validateSubscriptionUpdate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
//router.post("/signup")
router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.verifyEmailShema), ctrl.resendVerifyEmail);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
//router.post("/signin")
router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrl.logout);
//router.get("/signout")

//router.patch( "/", auth, validateSubscriptionUpdate, ctrl.subscripupdateAvatartionUpdate);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);


module.exports = router;