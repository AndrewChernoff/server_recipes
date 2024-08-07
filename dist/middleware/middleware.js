"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/^Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, 'secret');
            req.params.userId = decoded.userId;
            next();
        }
        catch (error) {
            return res.status(403).json({
                message: 'No access'
            });
        }
    }
};
exports.checkAuth = checkAuth;
