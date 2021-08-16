import MongoStore from "connect-mongo";
import {Request, Response} from "express";
import session from "express-session";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function sessionMiddleware(
  req: Request,
  res: Response,
  next: any
) {
  const store = new MongoStore({
    mongoUrl: process.env.DATABASE_URL,
    stringify: false
  });
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store
  })(req as any, res as any, next);
}
