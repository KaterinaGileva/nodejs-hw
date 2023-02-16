 const fs = require('fs/promises')
 const path = require("path");
 const { v4: idContacts } = require("uuid");
 const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try{
    const list = await fs.readFile(contactsPath);
    const contacts = JSON.parse(list);
     return contacts;
   }
   catch (err) {
     console.error(err)
   }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const currentContact = contacts.find((contact) => contact.id === contactId);
    if (!currentContact) {
      return null;
    }
    return currentContact;
  } catch (err) {
    console.error(err);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: idContacts(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    await fs.readFile(contactsPath, "utf-8");
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const contactsIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactsIndex === -1) {
      return null;
    }
    contactToUpdate = allContacts[contactsIndex];
    updatedContact = {...contactToUpdate,...body};
    allContacts.splice(contactsIndex, 1, updatedContact)
    
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return updatedContact;
  } catch (err) {
    console.error(err);
  }
}

const removeContact = async (contactId) => {
  try {             
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
  } catch (err) {
    console.error(err);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
