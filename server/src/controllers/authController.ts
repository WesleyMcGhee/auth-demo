import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../database/db";
import * as jwt from "jsonwebtoken";

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
    return res.status(500).send("Internal Server Error");
  }
}

export async function postSignin(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { username, password } = req.params;

    const user = await pool.query("SELECT * FROM users WHERE username=$1;", [
      username,
    ]);

    if (user.rowCount === 0) {
      return res.status(404).send("User does not exist");
    }

    const match: boolean = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );

    if (!match) {
      return res.status(400).send("Username or Password incorrect");
    }

    const userObj = { name: user.rows[0] };

    if (!process.env.AUTH) {
      console.error("AUTH SECRET NOT SET!!!");
      return res.status(500).send("Internal Server Error");
    }

    const accessToken = jwt.sign(userObj, process.env.AUTH);

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error(`Error in postSignin at ${new Date()}, ERROR: ${err}`);
    return res.status(500).send("Internal Server Error");
  }
}

function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  if (!process.env.AUTH_TOKEN_SECRET)
    return res.status(500).send("Internal Server Error");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? "", (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}
