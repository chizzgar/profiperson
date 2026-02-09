import type { Request, Response } from "express";

import { User } from "../models/User";

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
