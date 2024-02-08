import { Response, Request } from "express";

export async function postSignup(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(200).send("Hello World");
}
