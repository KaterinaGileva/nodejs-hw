const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");

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

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
        status: "successs",
        code: 201,
        data: {
            user: {
                email,
                name
            }
        }
    })
}

module.exports = login;
