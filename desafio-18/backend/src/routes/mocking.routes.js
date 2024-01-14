import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { getfakerProducts } from "../controllers/mocking.controllers.js";

const mockingRouter = Router()

mockingRouter.get('/', passportError('jwt'), authorization('admin'), getfakerProducts)

export default mockingRouter