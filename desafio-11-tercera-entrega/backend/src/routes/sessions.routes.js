import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { sessionController } from "../controllers/sessions.controller.js";

const sessionRouter = Router();

sessionRouter.post("/login", passport.authenticate("login"), sessionController.postLogin);

sessionRouter.post("/register", passport.authenticate("register"), sessionController.postRegister);

sessionRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }), sessionController.getGithub);

sessionRouter.get("/githubCallback", passport.authenticate("github"), sessionController.getGihubCallback);

sessionRouter.get("/logout", sessionController.getLogout);

sessionRouter.get("/current", passportError("jwt"), authorization("user"), (req, res) => {res.send(req.user);});

export default sessionRouter;