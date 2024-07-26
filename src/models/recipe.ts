import { model, Schema, Types } from "mongoose";

interface IRecipe {
  name: string
  ingredients: string[]
  instruction: string
  imgUrl: string
  userOwner: any
}

const RecipeSchema = new Schema<IRecipe>({
  name: { type: String, require: true},
  ingredients: [{ type: String, require: true }],
  instruction: { type: String, require: true},
  imgUrl: { type: String, require: true},
  userOwner: {type: Types.ObjectId, ref: "users", required: true},
},
);

export const Recipe = model("Recipe", RecipeSchema);
