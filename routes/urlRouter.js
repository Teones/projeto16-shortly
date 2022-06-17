import { Router } from "express";

import { createShorten, getShortUrl, getUrlById } from "../controllers/urlController.js";

import { validatorIdShortUrl, validatorShortUrl, validatorUrl } from "../middlewares/idShortUrlValidator.js";
import { userAuthenticated } from "../middlewares/userAuthenticated.js";

const urlRouter = Router();
urlRouter.post('/urls/shorten', validatorUrl, userAuthenticated, createShorten);
urlRouter.get('/urls/:id', validatorIdShortUrl, getUrlById);
urlRouter.get('/urls/open/:shortUrl', validatorShortUrl, getShortUrl)

export default urlRouter;