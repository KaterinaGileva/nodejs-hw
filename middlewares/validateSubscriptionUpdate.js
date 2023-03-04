/*const {HttpError} = require("../helpers");
const {schemas} = require("../../models/user");

const validateSubscriptionUpdate = (req, res, next) => {
    const {error} = schemas.subscriptionSchema.validateBody(req.body);
    if(error){
        throw HttpError(400, "missing field subscription");
    }
    next();
}

module.exports = {
    validateSubscriptionUpdate
};*/
