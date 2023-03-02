const express = require('express');
const { ctrlWrapper } = require("../../helpers");

const {auth: ctrl} = require("../../controllers");
const {auth, validateBody} = require("../../middlewares");

const {joiLoginSchema, joiRegisterSchema} =  require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(joiRegisterSchema), ctrlWrapper(ctrl.register));

//router.post("/signup")
router.post("/login", validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));
//router.post("/signin")
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
//router.get("/signout")
module.exports = router;