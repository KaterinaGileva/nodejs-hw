const {NotFound} = require("http-errors");
const contactsOperations = require("../../models/contacts");

const updateContacts = async (req, res) => {
   
        const {contactId} = req.params;
        const result = await contactsOperations.updateContact(contactId, req.body);
        if (!result){
          throw new NotFound (`Product with id=${contactId} not found`);
        }  
        res.json({
          status: 'sucsess',
          code: 200,
          data: {
            result
          }
      })
    }
module.exports = updateContacts;