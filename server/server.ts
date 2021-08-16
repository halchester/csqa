import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {options} from "./utils/index";
import dotenv from "dotenv";
import cors from "cors";
import {join} from "path";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

// Middleware imports
import "./config/passport";
import sessionMiddleware from "./config/session";
import passport from "./config/passport";

app
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  .use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false
    })
  );

// Route imports
import userRouter from "./routers/user.route";
import questionRouter from "./routers/question.route";

app.use("/api/", userRouter, questionRouter);

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(join(__dirname + "/public/index.html"));
});

mongoose.connect(process.env.DATABASE_URL as string, options).then(() => {
  app.listen(PORT, () => {
    console.log(`DB connceted and server running at port : ${PORT}...`);
  });
});
