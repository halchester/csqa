import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../db/models/Question";

const handler = nc();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, down, question } = req.body;

  try {
    if (down && user) {
      let foundQuestion = await Question.findOne({
        _id: question._id,
      });

      if (foundQuestion.points.downers.includes(user._id)) {
        return res.send("cannot down 2 times");
      }

      let updatedQuestion = await Question.updateOne(
        {
          _id: question._id,
        },
        {
          $push: {
            "points.downers": user._id,
          },
        }
      );
      console.log(updatedQuestion);
    }
    return res.send("done downing");
  } catch (err) {
    console.log(err);
    return res.send("not ok");
  }
});

export default handler;
