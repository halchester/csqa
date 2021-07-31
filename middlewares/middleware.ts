import nc from "next-connect";
import database from "./database";
import { NextApiRequest, NextApiResponse } from "next";
import sessionMiddleware from "./session";
import passport from "./passport";

const middleware = nc<NextApiRequest, NextApiResponse>();

middleware
  .use(database)
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;
