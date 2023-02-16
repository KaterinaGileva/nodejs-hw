const contactsOperations = require("../../models/contacts");
const {NotFound} = require("http-errors");

const deleteContacts = async (req, res) => {
        const {contactId} = req.params;
        const result = await contactsOperations.removeContact(contactId);
        if (!result){
          throw new NotFound (`Product with id=${contactId} not found`)
        }  
        res.json({
          status: 'sucsess',
          code: 200,
          message: "product deleted",
          data: {
            result
          }
      });
     
    }
module.exports = deleteContacts;