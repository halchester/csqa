import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import {NextApiRequest, NextApiResponse} from "next";
import User from "../../../db/models/User";

const handler = nc();
handler.use(middleware);

type ExtendedRequest = {
  req: NextApiRequest;
  user: any;
};

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.json({user: null});
  }
  const data = await User.findOne({userId: req.user.userId}).populate({
    path: "questions"
  });
  return res.json({data: data});
});

export default handler;
