import nc from "next-connect";
import middleware from "../../../middlewares/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Upvote from "../../../db/models/Upvote";
import Question from "../../../db/models/Question";
import Downvote from "../../../db/models/Downvote";
import { User } from "../../../types/common";

const handler = nc();
handler.use(middleware);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
handler.post(async (req: NextApiRequest, _res: NextApiResponse) => {
  // find the upvote questionId
  const theVote = await Upvote.findOne({ questionId: req.body.questionId });
  if (
    theVote.votes.filter((user: User) => user === req.body.user).length === 1
  ) {
    await Question.updateOne(
      { questionId: req.body.questionId },
      {
        $inc: {
          points: -1,
        },
      }
    );

    try {
      // const response = await Upvote.updateOne(
      await Upvote.updateOne(
        {
          questionId: req.body.questionId,
        },
        {
          $pull: {
            votes: { user: req.body.user },
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else if (
    theVote.votes.filter((user: User) => user === req.body.user).length === 0
  ) {
    await Upvote.findOneAndUpdate(
      {
        questionId: req.body.questionId,
        "votes.user": { $ne: req.body.user },
      },
      {
        $push: {
          votes: {
            user: req.body.user,
          },
        },
      },
      { useFindAndModify: false }
    );

    try {
      const downvote = await Downvote.findOne({
        questionId: req.body.questionId,
      });

      if (
        downvote.votes.filter((user: User) => user === req.body.user).length > 0
      ) {
        await Downvote.updateOne(
          { questionId: req.body.questionId },
          {
            $pull: {
              votes: { user: req.body.user },
            },
          }
        );

        try {
          await Question.updateOne(
            {
              questionId: req.body.question.questionId,
            },
            {
              $inc: {
                points: 2,
              },
            }
          );
          console.log("increment by 2");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await Question.updateOne(
            { questionId: req.body.question.questionId },
            {
              $inc: {
                points: 1,
              },
            }
          );
          console.log("increment by 1");
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});
