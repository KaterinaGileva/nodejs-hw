const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const {User} = require("../models/user");
const gravatar = require("gravatar");
//const {nanoid} = require("nanoid");
const { v4 } = require("uuid");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const {SECRET_KEY} = process.env;

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(404, "missing required field email");
    }
    if(user.verify){
        throw HttpError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        subject:"Confirmation of registration on the website",
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Follow the link to confirm your email</a>`
    };
    await sendEmail(mail);
    res.json({
        message: "Verification email sent"
    })
};

const verifyEmail = async(req, res)=> {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user){
        throw HttpError(404, "Not found verification token");
    }
    await User.findByIdAndUpdate(user._id, {verify:true, verificationToken: ""});
    res.json({
        message: "Verification successful"
    })
};


const register = async(req, res)=> {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, "Email already exit");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email/*, { s: "200", r: "pg", d: "mm" }*/);
    
    //const verificationToken = nanoid();
    const verificationToken = v4();

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        subscription,
        avatarURL,
        verificationToken,
        
    });
    const mail = {
        to: email,
        subject:"Verify you email",
        html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Follow the link to confirm your email</a>`
    };
    await sendEmail(mail);
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    if(!user.verify) {
        throw HttpError(400, "Email not verify");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
        user: {
            email,
            subscription: user.subscription,
          },
    })
}

const getCurrent = async(req, res)=> {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const avatarsDir = path.join(__dirname, "../","public", "avatars");

const updateAvatar = async(req, res)=> {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const resizeImage = await Jimp.read(resultUpload);
    resizeImage.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findOneAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })

};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: null});
    res.json({
        message: "Logout success"
    })
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}


