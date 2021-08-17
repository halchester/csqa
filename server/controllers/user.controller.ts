import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {checkFields, findUserByEmail, findUserByUsername} from "../utils/user";
import User from "../models/User";
import passport from "passport";

export const signUpUser = async (req: Request, res: Response): Promise<any> => {
  const {fullName, email, username, password} = req.body;
  // const payload = { fullName, email, password, username };
  // console.log("in backend", payload);
  try {
    if (!checkFields({fullName, email, username, password})) {
      return res.status(400).json({success: false, error: "Invalid Fields!"});
    }

    if (await findUserByUsername(username)) {
      return res.status(400).json({
        success: false,
        error: `User with ${username} already exists!`
      });
    }

    if (await findUserByEmail(email)) {
      return res
        .status(400)
        .json({success: false, error: `User with ${email} already exists!`});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      email,
      fullName,
      username,
      password: hashedPassword
    };

    const newUser = new User(payload);
    await newUser
      .save()
      .then((response: any) => {
        return res.status(200).json({success: true, data: response});
      })
      .catch((err: Error) => {
        return res.status(200).json({success: false, error: err});
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({success: false, error: "Something went wrong!"});
  }
};

export const loginUser = async (req: Request, res: Response, next: any) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.status(403).json({message: "No user Exists!"});
    } else {
      req.logIn(user, async (err) => {
        if (err) {
          console.log(err);
        }

        const userdata = await User.findOne({uniqueId: user.uniqueId}).populate(
          {
            path: "questions"
          }
        );

        res.status(200).json({data: userdata});
      });
    }
  })(req, res, next);
};

export const getCurrentUser = async (req: any, res: Response) => {
  if (!req.user) return res.json({user: null});
  await User.findOne({uniqueId: req.user.uniqueId})
    .populate({path: "questions"})
    .then((data) => res.json({user: data}));
};

export const logoutUser = (req: Request, res: Response): any => {
  req.logout();
  res.status(204).end();
};
