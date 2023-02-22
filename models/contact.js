const {Schema, model} = require ("mongoose");
//const Joi = require("joi");

//const {handleSchemaValidationError} = require("../helpers");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean
    //     type: String
      //  name: {
    //      type: String,
     //     required: [true, 'Set name for contact'],
     //   },
     //   email: {
      //    type: String,
     //   },
     //   phone: {
     //     type: String,
    //    },
    //    favorite: {
   //       type: Boolean,
    //      default: false,
    //    },
},
//{ versionKey: false, timestamps: true }
);

//contactSchema.post("save", handleSchemaValidationError);

//const addSchema = Joi.object({
 // name: Joi.string().required(),
  //email: Joi.string().required(),
 // phone: Joi.string().required(),
 // favorite: Joi.bool().required()
 // });

 //const updateFavoriteSchema =  Joi.object({
  
 // favorite: Joi.bool().required(),
 // })

//const schemas = {
 // addSchema,
 // updateFavoriteSchema,
//}

const Contact = model("contact", contactSchema);

module.exports = Contact;
  //schemas
