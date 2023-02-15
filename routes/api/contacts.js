const express = require('express');

const {validation, ctrlWrapper} = require("../../middleware");
const {contacts: ctrl} = require("../../controllers");
const {productSchema} = require("../../schema");

const validateMiddleware = validation(productSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContacts));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContacts));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContacts))

module.exports = router
