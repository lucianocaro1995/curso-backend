import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { userController } from "../controllers/users.controller.js";
import upload from "../config/multer.js"

const userRouter = Router();

userRouter.get("/", passportError('jwt'), authorization('admin'), userController.getUsers);

userRouter.get("/:uid", passportError('jwt'), authorization('admin'), userController.getUserById);

userRouter.put("/:uid", passportError('jwt'), authorization('admin'), userController.updateUser);

userRouter.delete("/:uid", passportError('jwt'), authorization('admin'), userController.deleteUser);

//No pongo middlewares en estos 2 endpoints ya que el usuario o admin no se va a poder logear, es por eso que piden reestablecer la contraseña
userRouter.post("/password-recovery", userController.requestPasswordReset);

userRouter.post("/reset-password/:token", userController.resetPassword);

userRouter.post("/:uid/documents", upload.array('document', 2), userController.uploadUserDocuments);

export default userRouter;