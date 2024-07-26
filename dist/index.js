"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("./routes/auth");
const recipes_1 = require("./routes/recipes");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb+srv://whitedrew538:MERN_recipes_app@recipes.9gxymlp.mongodb.net/?retryWrites=true&w=majority&appName=recipes')
    .then(() => console.log('connected'))
    .catch(() => console.log('Error'));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server!!ttttttt!');
});
app.use('/', auth_1.authRouter);
app.use('/recipes', recipes_1.recipesRouter);
app.listen(4000, () => {
    console.log(`[server]: Server is running at http://localhost:${4000}`);
});
