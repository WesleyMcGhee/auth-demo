import { Request, Response } from "express";
import pool from "../database/db";

// These will eventually need to be auth routes
async function getRoles(_: Request, res: Response) {
  try {
    const roles = await pool.query("SELECT * FROM roles;");

    return res.status(200).send(roles.rows);
  } catch (err) {}
}
