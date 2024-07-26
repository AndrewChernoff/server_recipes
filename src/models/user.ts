import mongoose  from "mongoose";

interface IUser {
  name: string
  passwordHash: string
  recipesQuantity: number
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true },
  recipesQuantity: {type: Number, default: 0}
},
);

export const User = mongoose.model("User", UserSchema);
