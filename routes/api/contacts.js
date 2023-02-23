const express = require('express');

const {contacts: ctrl} = require("../../controllers");
const {ctrlWrapper} = require ("../../helpers");
//const {validation, /*isValidId*/} = require("../../middleware");
//const {schemas} = require ("../../models/contact");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));

//router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

//router.post('/', /*validation(schemas.addSchema),*/ ctrlWrapper(ctrl.addContacts));

//router.put('/:contactId', isValidId, validation(schemas.addSchema), ctrlWrapper(ctrl.updateContacts));

//router.patch('/:contactId/favorite', isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

//router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContacts));

module.exports = router;
