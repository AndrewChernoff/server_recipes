import mongoose  from "mongoose";

interface IUser {
  name: string
  passwordHash: string
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true },
},
);

export const User = mongoose.model("User", UserSchema);
