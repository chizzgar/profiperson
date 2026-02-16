import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";

import { User } from "../models/User";
import { env } from "../config/env";

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"] },
    );

    const { password: _password, ...safeUser } = user.toObject();
    res.json({ token, user: safeUser });
  } catch (error) {
    console.error("Failed to login user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
}
