const {Сontact} = require("../../models/contact");


const addContacts = async (req, res) => {
        const result = await Сontact.create(req.body);
        res.status(201).json(result);
      } 
           
    module.exports = addContacts;