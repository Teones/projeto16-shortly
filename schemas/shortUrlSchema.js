import joi from "joi";

const shortUrlSchema = joi.object({
    shortUrl: joi.string().min(6).max(6).required()
});

export default shortUrlSchema;