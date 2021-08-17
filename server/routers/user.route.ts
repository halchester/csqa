import {Router} from "express";
import {loginUser, signUpUser} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signUpUser);

export default userRouter;
