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

export async function registerUser(req: Request, res: Response) {
  const { username, email, role, isActive } = req.body ?? {};

  if (!username || !email) {
    res.status(400).json({ error: "Username and email are required" });
    return;
  }

  try {
    const newUser = await User.create({
      username,
      email,
      role,
      isActive,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(400).json({ error: "Failed to create user" });
  }
}
