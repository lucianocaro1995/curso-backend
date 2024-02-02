import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { userController } from "../controllers/users.controller.js";
import upload from "../config/multer.js"

const userRouter = Router();





//Ruta pedida en el test de Postman:
userRouter.get("/", passportError('jwt'), authorization('admin'), userController.getUsers);





//Rutas no pedidas en el test de Postman:
userRouter.get("/names-emails", passportError('jwt'), authorization('admin'), userController.getUsersNamesAndEmails);

userRouter.get("/:uid", passportError('jwt'), authorization('admin'), userController.getUserById);

userRouter.put("/:uid", passportError('jwt'), authorization('admin'), userController.updateUser);

userRouter.delete("/:uid", passportError('jwt'), authorization('admin'), userController.deleteUser);

userRouter.delete("/", passportError('jwt'), authorization('admin'), userController.deleteInactiveUsers);

userRouter.post("/password-recovery", userController.requestPasswordReset);

userRouter.post("/reset-password/:token", userController.resetPassword);

userRouter.post("/:uid/documents", upload.array('document', 2), userController.uploadUserDocuments);

export default userRouter;