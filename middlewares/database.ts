import { connect, ConnectionOptions } from "mongoose";

const options: ConnectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default async function database(
  _req: Request,
  _res: Response,
  next: any
) {
  await connect(process.env.DATABASE_URL as string, options);
  return next();
}
