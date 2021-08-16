import {Request, Response, Router} from "express";
import passport from "../config/passport";
import {
  getCurrentUser,
  logoutUser,
  signUpUser
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post(
  "/login",

  passport.authenticate("local", (req: Request, res: Response) => {
    return res.json({success: true, data: req.user});
  })
);
userRouter.get("/currentUser", getCurrentUser);
userRouter.post("/signup", signUpUser);
userRouter.delete("/logout", logoutUser);

export default userRouter;
