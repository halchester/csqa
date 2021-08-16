import database from "./database";
import nextConnect from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import sessionMiddleware from "./session";
import passport from "./passport";

const middleware = nextConnect<NextApiRequest, NextApiResponse>();

middleware
  .use(database)
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;
