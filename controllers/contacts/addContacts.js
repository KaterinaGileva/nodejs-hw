const Сontact = require("../../models/contact");

const addContacts = async (req, res) => {
        const result = await Сontact.create(req.body);
        res.status(201).json({
          status: 'succsess',
          code: 201,
          data: {
            result
          }
      })
      } 
           
    module.exports = addContacts;