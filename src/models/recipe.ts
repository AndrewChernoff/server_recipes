import mongoose from "mongoose";

interface IRecipe {
  name: string
  ingredients: string[]
  instruction: string
  imgUrl: string
  userOwnerId: any
}

const RecipeSchema = new mongoose.Schema<IRecipe>({
  name: { type: String, require: true},
  ingredients: [{ type: String, require: true }],
  instruction: { type: String, require: true},
  imgUrl: { type: String, require: true},
  userOwnerId: {type: mongoose.Types.ObjectId, ref: "users", required: true},
},
);

export const Recipe = mongoose.model("Recipe", RecipeSchema);
