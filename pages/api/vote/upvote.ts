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
//   ///
//   Upvote.findOne({ questionId: req.body.questionId }).then((thatVote) => {
//     // if found
//     if (
//       // check if the user has already upvoted the question
//       thatVote.votes.filter((user: any) => user === req.body.user).length === 1
//     ) {
//       // if yes we will reduce that vote count from the question since user
//       // is trying to un-upvote this question
//       Question.updateOne(
//         { questionId: req.body.questionId },
//         {
//           $inc: {
//             points: -1,
//           },
//         }
//       )
//         .then(() => {
//           Upvote.updateOne(
//             {
//               questionId: req.body.questionId,
//             },
//             {
//               $pull: {
//                 votes: { user: req.body.user },
//               },
//             }
//           ).then((response) => {
//             // will return here
//             res.status(200).json({ success: true, data: response });
//             console.log(response);
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     // if user hasn't upvoted the question
//     else if (
//       thatVote.votes.filter((user: any) => user === req.body.user).length === 0
//     ) {
//       Upvote.findOneAndUpdate(
//         {
//           questionId: req.body.questionId,
//           "votes.user": { $ne: req.body.user },
//         },
//         {
//           $push: {
//             votes: {
//               user: req.body.user,
//             },
//           },
//         },
//         { useFindAndModify: false }
//       ).then(() => {
//         Downvote.findOne({ questionId: req.body.questionId })
//           .then((downvote) => {
//             if (
//               downvote.votes.filter((user: User) => user === req.body.user)
//                 .length > 0
//             ) {
//               Downvote.updateOne(
//                 { questionId: req.body.questionId },
//                 {
//                   $pull: {
//                     votes: { user: req.body.user },
//                   },
//                 }
//               )
//                 .then(() => {
//                   Question.updateOne(
//                     {
//                       questionId: req.body.question.questionId,
//                     },
//                     {
//                       $inc: {
//                         points: 2,
//                       },
//                     }
//                   )
//                     .then(() => {
//                       // res.status(200).json({ success: true });
//                       console.log("increment by 2");
//                     })
//                     .catch((err) => {
//                       console.log(err);
//                     });
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                 });
//             } else {
//               Question.updateOne(
//                 { questionId: req.body.question.questionId },
//                 {
//                   $inc: {
//                     points: 1,
//                   },
//                 }
//               )
//                 .then(() => {
//                   console.log("increment by 1");
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                 });
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       });
//     }
//   });
// });