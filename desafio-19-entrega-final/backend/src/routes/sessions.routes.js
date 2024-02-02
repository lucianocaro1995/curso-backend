import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { sessionController } from "../controllers/sessions.controller.js";

const sessionRouter = Router();





//Rutas en orden pedidas en el test de Postman:
sessionRouter.get("/current", passportError("jwt"), authorization(['user', 'premium', 'admin']), sessionController.currentSession);

sessionRouter.post("/register", passport.authenticate("register"), sessionController.registerUsers);

sessionRouter.post("/login", passport.authenticate("login"), sessionController.loginUsers);





//Rutas no pedidas por el test de Postman:
sessionRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }), sessionController.getGithub);

sessionRouter.get("/githubCallback", passport.authenticate("github"), sessionController.getGithubCallback);

sessionRouter.get("/logout", sessionController.getLogout);

export default sessionRouter;