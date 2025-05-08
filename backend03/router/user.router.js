import { Router } from "express";
import registerUser from "../controller/user.controller.js";

const routerUserDb = Router();
routerUserDb.route("/register").post(registerUser);
export default routerUserDb