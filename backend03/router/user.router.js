import { Router } from "express";
import { registerUser, loginUser } from "../controller/user.controller.js"
import m1 from "../middlewares/m1.middlewares.js";
import m2 from "../middlewares/m2.middlewares.js";

const routerUserDb = Router();
routerUserDb.route("/register").post(m1, m2, registerUser);
routerUserDb.route("/login").post(m1, m2, loginUser);
export default routerUserDb