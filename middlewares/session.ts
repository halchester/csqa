import session from "express-session";
import MongoStore from "connect-mongo";

export default function sessionMiddleware(
  req: Request,
  res: Response,
  next: any
): any {
  const mongoStore = new MongoStore({
    mongoUrl: process.env.DATABASE_URL,
    stringify: false
  });
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: mongoStore
  })(req as any, res as any, next);
}
