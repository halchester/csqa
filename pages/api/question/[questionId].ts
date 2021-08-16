import {NextApiRequest, NextApiResponse} from "next";
import nextConnect from "next-connect";
import Comment from "../../../db/Comment";
import Question from "../../../db/Question";
import middleware from "../../../middlewares/middleware";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {questionId} = req.query;

    const data = await Question.findOne({questionId: questionId as string})
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author"
        }
      });

    return res.status(200).json({success: true, data});
  } catch (err) {
    console.log(err);
    return res.status(400).json({success: false, error: err});
  }
});

/**
 * @description
 * This is for adding comment under a post, I don't want to create new API page for comment
 * but will do in further updates!
 *
 * it works something like this /api/question/questionId
 * req.body -> comment and who commented
 * * */

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {questionId} = req.query;
  const {comment, author} = req.body;

  try {
    const newComment = new Comment({comment, author});
    const commentRes = await newComment.save();

    await Question.findOne({questionId: questionId as string})
      .populate("comments")
      .exec(async (error) => {
        if (error) {
          console.log(error);
          return res.status(400).json({success: false, error});
        }

        await Question.updateOne(
          {
            questionId: questionId as string
          },
          {
            $push: {
              comments: commentRes
            }
          }
        );
      });
    return res.status(200).json({success: true, data: commentRes});
  } catch (err) {
    console.log(err);
    return res.status(400).json({success: false, error: err});
  }
});

export default handler;
