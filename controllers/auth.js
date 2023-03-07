const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");

const {User} = require("../models/user");
const gravatar = require("gravatar");
const { HttpError, ctrlWrapper } = require("../helpers");

const {SECRET_KEY} = process.env;

const register = async(req, res)=> {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, "Email already in use");
    }
    const avatarURL = gravatar.url(email/*, { s: "200", r: "pg", d: "mm" }*/);
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        subscription,
        avatarURL
    });
    
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
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
    const {path: tempUpload, originalname} = req.file;
    const {_id: id} = req.user;
    const imageName =  `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", originalname);
        await User.findOneAndUpdate(req.user._id, {avatarURL})
        res.json({avatarURL});
    } catch (error){
      await fs.unlink(tempUpload);
      throw error;
    }
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
}


