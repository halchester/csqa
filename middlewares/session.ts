import MongoStore from "connect-mongo";
import session from "express-session";

export default function sessionMiddleware(
  req: Request,
  res: Response,
  next: any
) {
  const store = new MongoStore({
    mongoUrl: process.env.DATABASE_URL,
    stringify: false,
  });
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store,
  })(req as any, res as any, next);
}
