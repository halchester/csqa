import type {NextApiRequest, NextApiResponse} from "next";
import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
import passport from "../../../middlewares/passport";

const handler = nextConnect();
handler.use(middleware);

type ExtendedRequest = {
  req: NextApiRequest;
  user: any;
  logOut: () => void;
};

handler.post(
  passport.authenticate("local"),
  (req: ExtendedRequest, res: NextApiResponse) => {
    return res.json({success: true, data: req.user});
  }
);

handler.delete((req: ExtendedRequest, res: NextApiResponse) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
