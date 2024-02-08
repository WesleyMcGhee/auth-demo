import { Response, Request } from "express";
import pool from "../database/db";

export async function postSignup(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { username, email, password } = req.params;

    // Want to perform some validation at some point

    // Ackshully make the database lol
    await pool.query(
      "INSERT INTO USERS (username, email, password) VALUES($1, $2, $3)"
    );

    return res.status(202).send("Created");
  } catch (err) {
    console.error(`Error in Signup function ${new Date()}`);
    return res.status(500).send(err);
  }
}
