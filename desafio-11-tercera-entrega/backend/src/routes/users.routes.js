import { Router } from "express";
import { userController } from "../controllers/users.controller.js";



const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.put("/:id", userController.putUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;