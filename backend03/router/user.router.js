import { Router } from "express";
import { registerUser, loginUser, delUser } from "../controller/user.controller.js"
import m1 from "../middlewares/m1.middlewares.js";
import m2 from "../middlewares/m2.middlewares.js";
import Auth from "../middlewares/Auth.js";

const routerUserDb = Router();
routerUserDb.route("/register").post(m1, m2, registerUser);
routerUserDb.route("/login").post(m1, m2, loginUser);
routerUserDb.route("/delete").post(Auth, delUser);
export default routerUserDb