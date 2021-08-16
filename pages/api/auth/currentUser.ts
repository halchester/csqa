import nc from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import middleware from "../../../middlewares/middleware";
import {User} from "../../../types/common";

const handler = nc();
handler.use(middleware);

interface ExtendedRequest {
  req: NextApiRequest;
  user: User;
}

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) return res.json({user: null});

  res.json({user: req.user});
});

export default handler;
