import passport from "passport";
import bcrypt from "bcrypt";
import {Strategy as LocalStrategy} from "passport-local";
import {findUserById, findUserByUsername} from "../lib/users";

/**
 * serializeUser function will serialize the user id into our session
 */
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

/**
 * We will use that id to get user object in passport.deserializeUser
 */
passport.deserializeUser(async (req: any, id: string, done: any) => {
  await findUserById(id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy(
    {usernameField: "email", passReqToCallback: true},
    async (_req: any, username, password, done) => {
      const user = await findUserByUsername(username);
      if (user && (await bcrypt.compare(password, user.password)))
        done(null, user);
      else done(null, false, {message: "Email or password is incorrect"});
    }
  )
);

export default passport;
