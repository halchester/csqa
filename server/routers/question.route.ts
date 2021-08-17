import {Router} from "express";
import {
  addQuestion,
  getAllQuestions,
  getQuestionDetail
} from "../controllers/question.controller";
import {addComment} from "../controllers/comment.controller";
import {downvote, upvote} from "../controllers/vote.controller";

const questionRouter = Router();

questionRouter.get("/questions", getAllQuestions);
questionRouter.post("/question", addQuestion);
questionRouter.get("/question/:questionId", getQuestionDetail);
questionRouter.post("/question/:questionId", addComment);
questionRouter.post("/question/down/:questionId", downvote);
questionRouter.post("/question/up/:questionId", upvote);

export default questionRouter;
