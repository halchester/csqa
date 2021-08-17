import {Router} from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  signUpUser
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.get("/currentUser", getCurrentUser);
userRouter.post("/signup", signUpUser);
userRouter.delete("/logout", logoutUser);

export default userRouter;
