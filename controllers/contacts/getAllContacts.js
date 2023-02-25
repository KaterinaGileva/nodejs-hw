const {Сontact} = require("../../models/contact");

const getAllContacts = async (_, res) => {
 
  const result = await Сontact.find({});
  res.json(result);
}

module.exports = getAllContacts;