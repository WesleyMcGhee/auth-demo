import { Response, Request } from "express";
import bcrypt from "bcrypt";
import pool from "../database/db";

// Probably not the actual one will use ENV var for this
const userSaltRounds: number = 10;

export async function postSignup(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { username, email, password } = req.params;

    const user = await pool.query(
      "SELECT username, email FROM users WHERE username=$1 OR email=$2",
      [username, email]
    );

    if (user.rows.length > 0) {
      // Do some more validiation for better error handling in the future
      return res
        .status(403)
        .send("User with email, or username already exists");
    }
    bcrypt.hash(password, userSaltRounds, async () => {
      await pool.query(
        "INSERT INTO USERS (username, email, password) VALUES($1, $2, $3)"
      );
    });

    return res.status(202).send("Created");
  } catch (err) {
    console.error(`Error in Signup function ${new Date()}`);
    return res.status(500).send(err);
  }
}
