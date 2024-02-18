import { Router } from "express";
import { getAllUsers, loginUser, signupUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";


const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), signupUser);
userRoutes.post("/login", validate(loginValidator), loginUser);

export default userRoutes;