import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Downvote from "../../../db/models/Downvote";
import Upvote from "../../../db/models/Upvote";
import Question from "../../../db/models/Question";
import { User } from "../../../types/common";

const handler = nc();
handler.use(middleware);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
handler.post(async (req: NextApiRequest, _res: NextApiResponse) => {
  try {
    const theVote = await Downvote.findOne({ questionId: req.body.questionId });

    if (
      theVote.filter((user: User) => user.userId === req.body.user.userId)
        .length === 1
    ) {
      try {
        const updatedDownvote = await Downvote.updateOne(
          {
            questionId: req.body.questionId,
          },
          {
            $pull: { votes: { user: req.body.user } },
          }
        );
        console.log("increment by 1");
      } catch (err) {
        console.log(err);
      }
    } else if (
      theVote.filter((user: User) => user.userId === req.body.user.userId)
        .length === 0
    ) {
      await Downvote.findOneAndUpdate(
        {
          questionId: req.body.questionId,
          "votes.user": { $ne: req.body.user },
        },
        {
          $push: {
            votes: { user: req.body.user },
          },
        },
        { useFindAndModify: false }
      );

      const upvote = await Upvote.findOne({ questionId: req.body.questionId });
      if (
        upvote.votes.filter((user: User) => user === req.body.user).length > 0
      ) {
        await Upvote.findOne(
          { questionId: req.body.questionId },
          {
            $pull: {
              votes: { user: req.body.user },
            },
          }
        );

        try {
          await Question.updateOne(
            { questionId: req.body.questionId },
            {
              $inc: {
                points: -2,
              },
            }
          );
          console.log("decrement by 2");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await Question.updateOne(
            { questionId: req.body.questionId },
            {
              $inc: {
                points: -1,
              },
            }
          );

          console.log("decrement by 1");
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

export default handler;
