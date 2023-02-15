const contactsOperations = require("../../models/contacts");

const getAllContacts = async (req, res) => {
    
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: 'sucsess',
      code: 200,
      data: {
        result: contacts
      }
  });
}

module.exports = getAllContacts;