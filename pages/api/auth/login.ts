import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import User from "../../../db/models/User";

const handler = nc();
handler.use(middleware);

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  // for debugging purpose
  try {
    const allusers = await User.find();
    res.status(200).json({ data: allusers });
  } catch (err) {
    res.status(400).send("nt food");
  }
});

export default handler;
