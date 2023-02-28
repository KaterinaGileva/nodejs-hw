const {Schema, model} = require("mongoose");

const Joi = require("joi");
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true,
      minlengh: 6
  },
      
}, {versionKey: false, timestamps: true});

const joiRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const joiLoginSchema = Joi.object({
   
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
        
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema
  }
  