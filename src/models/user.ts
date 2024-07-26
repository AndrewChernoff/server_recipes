import { model, Schema } from "mongoose";

interface IUser {
  name: string
  passwordHash: string
}

const UserSchema = new Schema<IUser>({
  name: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true },
},
);

export const User = model("User", UserSchema);
