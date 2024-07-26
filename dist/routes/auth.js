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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const userDB = yield user_1.User.findOne({ name });
    if (userDB) {
        res.status(400).send({ message: 'User exists' });
    }
    bcrypt_1.default.genSalt(10, function (err, salt) {
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            if (err)
                throw err;
            new user_1.User({ name, passwordHash: hash }).save();
            res.status(200).send({ message: "Registered Successfully!" });
        });
    });
}));
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const userDB = yield user_1.User.findOne({ name });
    const passwordMatch = yield bcrypt_1.default.compare(password, userDB.passwordHash);
    if (passwordMatch && userDB) {
        userDB.passwordHash = undefined;
        const token = jsonwebtoken_1.default.sign({ userId: userDB._id }, 'secret', {
            expiresIn: '1h',
        });
        res.status(200).send({ data: Object.assign({ token }, userDB._doc) });
    }
    else {
        res.status(400).send({ message: "Password or name is wrong!" });
    }
}));
