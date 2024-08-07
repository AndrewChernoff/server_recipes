"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    recipesQuantity: { type: Number, default: 0 }
});
exports.User = mongoose_1.default.model("User", UserSchema);
