import { Router } from "express";

import { createShorten, deleteShorten, getShortUrl, getUrlById } from "../controllers/urlController.js";

import { validatorIdShortUrl, validatorShortUrl, validatorUrl } from "../middlewares/idShortUrlValidator.js";
import { userAuthenticated } from "../middlewares/userAuthenticated.js";
import { idAuthenticated } from "../middlewares/idAuthenticated.js";

const urlRouter = Router();
urlRouter.post('/urls/shorten', validatorUrl, userAuthenticated, createShorten);
urlRouter.get('/urls/:id', validatorIdShortUrl, getUrlById);
urlRouter.get('/urls/open/:shortUrl', validatorShortUrl, getShortUrl)
urlRouter.delete('/urls/:id', validatorIdShortUrl ,idAuthenticated, deleteShorten)

export default urlRouter;