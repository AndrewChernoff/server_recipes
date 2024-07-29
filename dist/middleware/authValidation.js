"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthFields = void 0;
const express_validator_1 = require("express-validator");
const validateName = (0, express_validator_1.body)("name")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Length should be from 2 to 20 symbols");
const validatePassword = (0, express_validator_1.body)("password")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("Length should be from 5 to 15 symbols");
exports.validateAuthFields = [validateName, validatePassword];
