/*const {User} = require("../models/user");

const {HttpError} = require("../helpers");

const {validateSubscriptionUpdate} = require("../middlewares/validateSubscriptionUpdate");

const subscriptionUpdate =  async (req, res, next) => {
    try {
    const {_id: owner} = req.user;
    const {...updateData} = req.body;
    const result = await User.findByIdAndUpdate(id, updateData, {new: true}, owner);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
} catch (error) {
    next(error);
}
};

module.exports = {
    validateSubscriptionUpdate,
    subscriptionUpdate
};*/