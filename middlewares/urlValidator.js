import urlSchema from "../schemas/urlSchema.js";

export function validatorUrl (req, res, next) {
    const url = req.body;
    const {error} = urlSchema.validate(url, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};