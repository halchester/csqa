import { connect, ConnectionOptions } from "mongoose";

const options: ConnectionOptions = {
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default async function database(
  _req: Request,
  _res: Response,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  next: any
): Promise<any> {
  await connect(process.env.DATABASE_URL as string, options);
  return next();
}
