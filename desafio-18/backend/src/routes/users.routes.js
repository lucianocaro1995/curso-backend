import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { userController } from "../controllers/users.controller.js";
import upload from "../config/multer.js"

const userRouter = Router();

userRouter.get("/", passportError('jwt'), authorization('admin'), userController.getUsers);

userRouter.get("/:id", passportError('jwt'), authorization('admin'), userController.getUserById);

userRouter.put("/:id", passportError('jwt'), authorization('admin'), userController.updateUser);

userRouter.delete("/:id", passportError('jwt'), authorization('admin'), userController.deleteUser);

userRouter.post("/password-recovery", passportError('jwt'), authorization('user'), userController.requestPasswordReset);

userRouter.post("/reset-password/:token", passportError('jwt'), authorization('user'), userController.resetPassword);

userRouter.post("/:uid/documents", upload.array('document', 2), userController.uploadUserDocuments);

export default userRouter;