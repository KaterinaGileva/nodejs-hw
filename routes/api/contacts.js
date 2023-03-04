const express = require("express");

const ctrl = require("../../controllers/contacts");

const {auth, validateBody, isValidId} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.get("/:id", auth, isValidId, ctrl.getById);

router.post("/", auth, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", auth, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", auth, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", auth, isValidId, ctrl.deleteById);



module.exports = router;