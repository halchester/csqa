import bcrypt from "bcrypt";
import {Strategy} from "passport-local";
import {findUserById, findUserByUsername} from "../utils/user";

export default function (passport: any) {
  const authenticateUser = async (
    _req: any,
    username: string,
    password: string,
    done: any
  ) => {
    const user = await findUserByUsername(username);
    if (!user) {
      console.log("not found");
      return done(null, false);
    }
    try {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid && user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      // console.log("in err");
      console.log(err);
      return done(err);
    }
  };

  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passReqToCallback: true
      },
      authenticateUser
    )
  );

  passport.serializeUser((user: any, done: (arg0: any, arg1: any) => void) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: any, done: any) => {
    await findUserById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
}
