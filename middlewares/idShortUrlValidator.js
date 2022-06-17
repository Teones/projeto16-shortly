import idUrlShortSchema from "../schemas/idUrlShortSchema.js";
import shortUrlSchema from "../schemas/shortUrlSchema.js";
import urlSchema from "../schemas/urlSchema.js";

export function validatorUrl (req, res, next) {
    const url = req.body;
    const {error} = urlSchema.validate(url, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};

export function validatorIdShortUrl (req, res, next) {
    const id = req.params;
    const {error} = idUrlShortSchema.validate(id, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};

export function validatorShortUrl (req, res, next) {
    const shortUrl = req.params;
    const {error} = shortUrlSchema.validate(shortUrl, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};