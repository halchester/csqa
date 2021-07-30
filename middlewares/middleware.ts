import nc from "next-connect";
import database from "./database";
import { NextApiRequest, NextApiResponse } from "next";

const middleware = nc<NextApiRequest, NextApiResponse>();

middleware.use(database);

export default middleware;
