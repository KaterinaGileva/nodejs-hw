const express = require('express');
const { ctrlWrapper } = require("../../helpers");

const {auth: ctrl} = require("../../controllers");
const {validateBody} = require("../../middlewares");

const {joiLoginSchema, joiRegisterSchema} =  require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(joiRegisterSchema), ctrlWrapper(ctrl.register));

//router.post("/signup")
router.post("/login", validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));
//router.post("/signin")
module.exports = router;