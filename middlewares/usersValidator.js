import userSchema from "../schemas/usersSchema.js";
import loginSchema from "../schemas/loginSchema.js";

export function validateUser (req, res, next) {
    const user = req.body;
    const {error} = userSchema.validate(user, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};

export function validateLogin (req, res, next) {
    const user = req.body;
    const {error} = loginSchema.validate(user, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};