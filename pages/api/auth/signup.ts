import type {NextApiRequest, NextApiResponse} from "next";
import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
import bcrypt from "bcrypt";
import {
  checkFields,
  findUserByEmail,
  findUserByUsername
} from "../../../lib/users";
import User from "../../../db/User";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
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
      .then((response: Response) => {
        return res.status(200).json({success: true, data: response});
      })
      .catch((err: Error) => {
        return res.status(200).json({success: false, error: err});
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({success: false, error: "Something went wrong!"});
  }
});

export default handler;
