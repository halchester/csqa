import passport from "passport";
import bcrypt from "bcrypt";
import {Strategy} from "passport-local";
import {findUserById, findUserByUsername} from "../lib/helpers/users";

const authenticateUser = async (
  _req: any,
  username: string,
  password: string,
  done: any
) => {
  const user = await findUserByUsername(username);
  // console.log(user);
  if (!user) {
    console.log("not found");
    return done(null, false, {
      message: `User with ${username} does not exist!`
    });
  }
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid && user) {
      done(null, user);
    } else {
      return done(null, false, {
        message: "Username or Password is incorrect!"
      });
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

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_req: any, id: string, done: any) => {
  await findUserById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

export default passport;
