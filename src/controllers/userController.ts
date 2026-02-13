import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models/User";
import { env } from "../config/env";

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.find().select("-password").lean();
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function registerUser(req: Request, res: Response) {
  const { username, email, password, role, isActive } = req.body ?? {};

  if (!username || !email || !password) {
    res.status(400).json({ error: "Username, email, and password are required" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, env.bcryptSaltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      isActive,
    });
    const { password: _password, ...user } = newUser.toObject();
    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(400).json({ error: "Failed to create user" });
  }
}
