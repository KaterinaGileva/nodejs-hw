const {Сontact} = require("../../models/contact");
const {NotFound} = require("http-errors");

const updateFavorite = async (req, res) => {
const {contactId} = req.params;
const result = await Сontact.findByIdAndUpdate(contactId, req.body, {new: true});
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
module.exports = updateFavorite;