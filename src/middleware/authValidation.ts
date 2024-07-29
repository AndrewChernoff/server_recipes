import { body } from "express-validator"

const validateName = body("name")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Length should be from 2 to 20 symbols")

    const validatePassword = body("password")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("Length should be from 5 to 15 symbols")

export const validateAuthFields = [validateName, validatePassword]