"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesRouter = void 0;
const express_1 = require("express");
const recipe_1 = require("../models/recipe");
const user_1 = require("../models/user");
const middleware_1 = require("../middleware/middleware");
exports.recipesRouter = (0, express_1.Router)({});
exports.recipesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.Recipe.find({});
        if (recipes.length === 0 || !recipes) {
            res.status(200).send({ message: 'No recipes' });
        }
        else {
            res.status(200).send(recipes);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.recipesRouter.post('/', middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const newRecipe = new recipe_1.Recipe(req.body);
        const item = yield newRecipe.save();
        yield user_1.User.findByIdAndUpdate({ _id: userId }, { $inc: { recipesQuantity: 1 } });
        res.status(200).send(item);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.recipesRouter.put('/:id', middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield recipe_1.Recipe.findByIdAndUpdate({ _id: id }, {
            name: req.body.name,
            ingredients: req.body.ingredients,
            instruction: req.body.instruction,
            imgUrl: req.body.imgUrl,
            userOwner: req.params.id,
        });
        res.status(200).send(req.body);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.recipesRouter.delete('/:id', middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.params.userId;
        yield recipe_1.Recipe.findByIdAndDelete({ _id: id });
        yield user_1.User.findByIdAndUpdate({ _id: userId }, { $inc: { recipesQuantity: -1 } });
        res.status(200).send({ message: 'Deleted' });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.recipesRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recipes = yield recipe_1.Recipe.find({ userOwner: id });
        res.status(200).send({ recipes });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
