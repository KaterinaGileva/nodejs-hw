const {Сontact} = require("../../models/contact");
const {NotFound} = require("http-errors");

const deleteContacts = async (req, res) => {
        const {contactId} = req.params;
        const result = await Сontact.findByIdAndRemove(contactId);
        if (!result){
          throw new NotFound (`Product with id=${contactId} not found`);
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