const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;
//const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

 if (!user || !user.comparePassword(password)) {
     throw new Unauthorized(`Email or password is wrong`);
 }

 //if (!user) {
 //    throw new Unauthorized(`Email ${email} not found`);
 //}
 //const passCompare = bcrypt.compareSync(password, user.password);
 //if (!passCompare) {
 //    throw new Unauthorized("Password is wrong");
 //}
const payload = {
    id: user._id
};
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
res.json({
    status: "successs",
    code: 200,
    data: {
        token
    }
})
}
module.exports = login;
