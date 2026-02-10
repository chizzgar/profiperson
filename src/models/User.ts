import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  isActive: boolean;
  role: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: false },
  role: { type: [String], default: ["customer"] },
  createdAt: { type: Date, default: Date.now },
}, {
  collection: "profi_users",
});

export const User = model<IUser>("User", userSchema);
