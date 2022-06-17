import { Router } from "express";

import { createShorten, getUrlById } from "../controllers/urlController.js";

import { validatorUrl } from "../middlewares/urlValidator.js";
import { userAuthenticated } from "../middlewares/userAuthenticated.js";

const urlRouter = Router();
urlRouter.post('/urls/shorten', validatorUrl, userAuthenticated, createShorten);
urlRouter.get('/urls/:id', getUrlById)

export default urlRouter;