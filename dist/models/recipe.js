"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RecipeSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    ingredients: [{ type: String, require: true }],
    instruction: { type: String, require: true },
    imgUrl: { type: String, require: true },
    userOwnerId: { type: mongoose_1.default.Types.ObjectId, ref: "users", required: true },
});
exports.Recipe = mongoose_1.default.model("Recipe", RecipeSchema);
