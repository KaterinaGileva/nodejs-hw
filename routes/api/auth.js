const express = require('express');

const ctrl = require("../../controllers/auth");
//const {subscriptionUpdate} = require("../../controllers/subscriptionUpdate");

const {auth, validateBody} = require("../../middlewares");
const {schemas} = require("../../models/user");

//const {validateSubscriptionUpdate} = require("../middlewares/validateSubscriptionUpdate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
//router.post("/signup")
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
//router.post("/signin")
router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrl.logout);
//router.get("/signout")

//router.patch( "/", auth, validateSubscriptionUpdate, ctrl.subscriptionUpdate);
  
module.exports = router;