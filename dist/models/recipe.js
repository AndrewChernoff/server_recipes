"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const RecipeSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    ingredients: [{ type: String, require: true }],
    instruction: { type: String, require: true },
    imgUrl: { type: String, require: true },
    userOwner: { type: mongoose_1.Types.ObjectId, ref: "users", required: true },
});
exports.Recipe = (0, mongoose_1.model)("Recipe", RecipeSchema);
