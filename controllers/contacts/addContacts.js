const contactsOperations = require("../../models/contacts");

const addContacts = async (req, res) => {
        const result = await contactsOperations.addContact(req.body);
        res.status(201).json({
          status: 'sucsess',
          code: 201,
          data: {
            result
          }
      })
      } 
           
    module.exports = addContacts;