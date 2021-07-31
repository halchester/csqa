import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(middleware);

type ExtendedRequest = {
  req: NextApiRequest;
  user: any;
};

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.json({ user: null });
  }
  return res.json({ data: req.user });
});

export default handler;
