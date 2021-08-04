import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
// import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(middleware);

// handler.post(async (_req: NextApiRequest, _res: NextApiResponse) => {});

export default handler;
