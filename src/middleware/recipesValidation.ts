import { body } from "express-validator"

const validateName = body("name")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage("Length should be from 2 to 15 symbols")

    const validateingredients = body("ingredients.*")
    .isLength({ max: 30 }).withMessage("Max length should be 30 symbols")

    const validateInstruction = body("instruction")
    .isLength({ min: 5, max: 50 }).withMessage("Length should be from 5 to 50 symbols")
    
    const validateimgUrl = body("imgUrl")
    .isURL().optional()

export const validateRecipe = [validateName, validateingredients, validateInstruction, validateimgUrl]