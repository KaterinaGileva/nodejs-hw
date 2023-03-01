const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const {users: ctrl} = require("../../controllers");
const {/*validateBody,*/ auth} = require("../../middlewares");

//const {joiLoginSchema, joiRegisterSchema} =  require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
