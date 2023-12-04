import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { userController } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", passportError('jwt'), authorization('admin'), userController.getUsers);

userRouter.get("/:id", passportError('jwt'), authorization('admin'), userController.getUserById);

userRouter.put("/:id", passportError('jwt'), authorization('admin'), userController.updateUser);

userRouter.delete("/:id", passportError('jwt'), authorization('admin'), userController.deleteUser);

export default userRouter;