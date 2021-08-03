import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../db/models/Question";
import User from "../../../db/models/User";

const handler = nc();
handler.use(middleware);

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await Question.find().populate("author");
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: true, error: "Cannot fetch data!" });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // const { title, body, author } = req.body;
  // const payload = {
  //   title,
  //   body,
  //   author,
  // };
  try {
    const newQ = new Question(req.body);
    const response = await newQ.save();

    await Question.findOne({ questionId: response.questionId })
      .populate("author")
      .exec(async (error, response) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ success: false, error: "Something went wrong!" });
        }

        await User.updateOne(
          { userId: req.body.author.userId },
          {
            $push: {
              questions: response,
            },
          }
        );
      });
    return res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.log(err);
  }
});
export default handler;
