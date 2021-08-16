import {Request, Response} from "express";
import Question from "../models/Question";

export const downvote = async (req: Request, res: Response) => {
  const {user, down, question} = req.body;

  try {
    if (down && user) {
      let foundQuestion = await Question.findOne({
        _id: question._id
      });
      if (foundQuestion) {
        if (foundQuestion.points.downers.includes(user._id)) {
          return res.status(400).json({message: "Cannot downvote twice!"});
        }

        if (foundQuestion.points.uppers.includes(user._id)) {
          await Question.updateOne(
            {
              _id: question._id
            },
            {
              $pull: {
                "points.uppers": user._id
              }
            }
          );
        }
      }

      let updatedQuestion = await Question.updateOne(
        {
          _id: question._id
        },
        {
          $push: {
            "points.downers": user._id
          }
        }
      );
      console.log(updatedQuestion);
    }
    return res.status(200).json({message: "ok"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: "Something went wrong!"});
  }
};

export const upvote = async (req: Request, res: Response) => {
  const {user, up, question} = req.body;

  try {
    if (up && user) {
      let foundQuestion = await Question.findOne({
        _id: question._id
      });

      if (foundQuestion) {
        if (foundQuestion.points.uppers.includes(user._id)) {
          return res.status(400).json({message: "Cannot upvote twice!"});
        }

        if (foundQuestion.points.downers.includes(user._id)) {
          await Question.updateOne(
            {
              _id: question._id
            },
            {
              $pull: {
                "points.downers": user._id
              }
            }
          );
        }
      }

      let updatedQuestion = await Question.updateOne(
        {
          _id: question._id
        },
        {
          $push: {
            "points.uppers": user._id
          }
        }
      );
      console.log(updatedQuestion);
    }
    return res.status(200).json({message: "ok"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: "Something went wrong!"});
  }
};
