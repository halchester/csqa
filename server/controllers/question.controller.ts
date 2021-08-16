import {Request, Response} from "express";
import Question from "../models/Question";
import User from "../models/User";

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const data = await Question.find().populate("author");
    return res.status(200).json({success: true, data});
  } catch (err) {
    console.log(err);
    return res.status(400).json({success: true, error: "Cannot fetch data!"});
  }
};

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const newQ = new Question(req.body);
    const response = await newQ.save();

    await Question.findOne({questionId: response.questionId})
      .populate("author")
      .exec(async (error, response) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({success: false, error: "Something went wrong!"});
        }

        await User.updateOne(
          {userId: req.body.author.userId},
          {
            $push: {
              questions: response
            }
          }
        );
      });
    return res.status(200).json({success: true, data: response});
  } catch (err) {
    console.log(err);
  }
};
