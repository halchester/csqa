import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import Question from "../../../db/models/Question";

const handler = nc();
handler.use(middleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { questionId } = req.query;
    const data = await Question.findOne({ questionId }).populate("author");
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
});

export default handler;
