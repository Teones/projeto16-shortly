import { Router } from "express";

import { createShorten, getUrlById } from "../controllers/urlController.js";

import { validatorIdShortUrl, validatorUrl } from "../middlewares/idShortUrlValidator.js";
import { userAuthenticated } from "../middlewares/userAuthenticated.js";

const urlRouter = Router();
urlRouter.post('/urls/shorten', validatorUrl, userAuthenticated, createShorten);
urlRouter.get('/urls/:id', validatorIdShortUrl, getUrlById)

export default urlRouter;