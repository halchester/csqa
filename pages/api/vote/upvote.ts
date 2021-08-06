import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../db/models/Question";

const handler = nc();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, up, question } = req.body;

  try {
    if (up && user) {
      let foundQuestion = await Question.findOne({
        _id: question._id,
      });

      if (foundQuestion.points.uppers.includes(user._id)) {
        return res.send("cannot up 2 times");
      }

      let updatedQuestion = await Question.updateOne(
        {
          _id: question._id,
        },
        {
          $push: {
            "points.uppers": user._id,
          },
        }
      );
      console.log(updatedQuestion);
    }
    return res.send("done upping");
  } catch (err) {
    console.log(err);
    return res.send("not ok");
  }
});

export default handler;
