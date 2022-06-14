import userSchema from "../schemas/usersSchema.js";

export function validateUser (req, res, next) {
    const user = req.body;
    const {error} = userSchema.validate(user, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};