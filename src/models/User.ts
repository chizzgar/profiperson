import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  age: number;
  isActive: boolean;
  role: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  role: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
}, {
  collection: "profi_users",
});

export const User = model<IUser>("User", userSchema);
