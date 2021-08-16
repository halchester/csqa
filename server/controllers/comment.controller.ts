import {Request, Response} from "express";
import Comment from "../models/Comment";
import Question from "../models/Question";

export const addComment = async (req: Request, res: Response) => {
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
};
