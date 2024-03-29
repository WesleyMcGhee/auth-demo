import { Request, Response } from "express";
import pool from "../database/db";

// Potentially add a soft delete sometime

async function postWaifu(req: Request, res: Response): Promise<Response> {
  try {
    const { name, price, description } = req.body;
    const waifu = await pool.query(
      "INSERT INTO waifu (name, price, description) VALUES($1, $2, $3)",
      [name, price, description]
    );

    return res.status(202).send(waifu.rows[0]);
  } catch (err) {
    console.error(`Error in postWaifu at ${new Date()} ERROR: ${err}`);
    return res.status(500).send(err);
  }
}

async function getWaifus(_: Request, res: Response): Promise<Response> {
  try {
    const waifus = await pool.query("SELECT * FROM waifus;");
    return res.status(200).send(waifus.rows);
  } catch (err) {
    console.error(`Error in getWaifus at ${new Date()} ERROR: ${err}`);
    return res.status(500).send(err);
  }
}

async function getWaifu(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const waifus = await pool.query("SELECT * FROM waifus WHERE id = $1", [id]);

    if (waifus.rowCount === 0) {
      return res.status(400).send("Waifu not found");
    }

    return res.status(200).send(waifus.rows[0]);
  } catch (err) {
    console.error(`Error in getWaifu at ${new Date()} ERROR: ${err}`);
    return res.status(500).send(err);
  }
}

async function updateWaifu(req: Request, res: Response): Promise<Response> {
  try {
    const { name, price, description } = req.body;
    const { id } = req.params;

    const waifu = await pool.query("SELECT * FROM waifus WHERE id = $1", [id]);

    if (waifu.rowCount === 0) {
      return res.status(400).send("Waifu not found");
    }

    const updatedWaifu = await pool.query(
      "UPDATE waifus SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
      [name, price, description, id]
    );
      return res.status(200).send(updatedWaifu.rows);
  } catch (err) {
    console.error(`Error in updateWaifu at ${new Date()} ERROR: ${err}`);
    return res.status(500).send(err);
  }
}

async function deleteWaifu(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    await pool.query("DELETE waifu WHERE id = $1", [id]);

    return res.status(200).send("Deleted");
  } catch (err) {
    console.error(`Error in deleteWaifu at ${new Date()} ERROR: ${err}`);
    return res.status(500).send(err);
  }
}

export { postWaifu, getWaifus, getWaifu, updateWaifu, deleteWaifu };
