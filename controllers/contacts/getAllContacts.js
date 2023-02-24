const {Сontact} = require("../../models/contact");



const getAllContacts = async (_, res) => {
    
    const contacts = await Сontact.find({}, "-createdAt -updatedAt");
    res.json({
      status: 'sucsess',
      code: 200,
      data: {
        result: contacts
      }
  });
}

module.exports = getAllContacts;