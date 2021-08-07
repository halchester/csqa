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
        return res.status(400).json({ message: "Cannot downvote twice!" });
      }

      if (foundQuestion.points.uppers.includes(user._id)) {
        await Question.updateOne(
          {
            _id: question._id,
          },
          {
            $pull: {
              "points.uppers": user._id,
            },
          }
        );
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
    return res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

export default handler;
