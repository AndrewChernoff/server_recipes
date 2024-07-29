"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecipe = void 0;
const express_validator_1 = require("express-validator");
const validateName = (0, express_validator_1.body)("name")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage("Length should be from 2 to 15 symbols");
const validateingredients = (0, express_validator_1.body)("ingredients.*")
    .isLength({ max: 30 }).withMessage("Max length should be 30 symbols");
const validateInstruction = (0, express_validator_1.body)("instruction")
    .isLength({ min: 5, max: 50 }).withMessage("Length should be from 5 to 50 symbols");
const validateimgUrl = (0, express_validator_1.body)("imgUrl")
    .isURL().optional();
exports.validateRecipe = [validateName, validateingredients, validateInstruction, validateimgUrl];
