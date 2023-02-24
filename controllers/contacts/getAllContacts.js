const {Сontact} = require("../../models/contact");



const getAllContacts = async (_, res) => {
  console.log(res);
    const contacts = await Сontact.find({}, "-createdAt -updatedAt");
    console.log(contacts);
    res.json({
      status: 'sucsess',
      code: 200,
      data: {
        result: contacts
      }
  });
}

module.exports = getAllContacts;