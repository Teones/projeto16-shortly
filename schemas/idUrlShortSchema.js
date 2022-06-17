import joi from "joi";

const idUrlShortSchema = joi.object({
    id: joi.number().required()
});

export default idUrlShortSchema;