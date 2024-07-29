import { Router } from "express";
import { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";
import { handleValidationError } from "../middleware/handleValidationError";
import { validateRecipe } from "../middleware/recipesValidation";
import { checkAuth } from "../middleware/checkAuth";

export const recipesRouter = Router({});

recipesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find({});

    if (recipes.length === 0 || !recipes) {
      res.status(200).send({ message: "No recipes" });
    } else {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

recipesRouter.post("/", checkAuth, validateRecipe, handleValidationError, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instruction: req.body.instruction,
      imgUrl: req.body.imgUrl,
      userOwnerId: userId,
    });

    const item = await newRecipe.save();

    await User.findByIdAndUpdate(
      { _id: userId },
      { $inc: { recipesQuantity: 1 } }
    );

    res.status(200).send(item);
  } catch (error) {
    res.status(500).send({ error });
  }
});

recipesRouter.put("/:id", checkAuth, validateRecipe, handleValidationError, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Recipe.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instruction: req.body.instruction,
        imgUrl: req.body.imgUrl,
        userOwnerId: req.params.id,
      }
    );

    res.status(200).send(req.body);
  } catch (error) {
    res.status(500).send({ error });
  }
});

recipesRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = req.params.userId;

    await Recipe.findByIdAndDelete({ _id: id });

    await User.findByIdAndUpdate(
      { _id: userId },
      { $inc: { recipesQuantity: -1 } }
    );

    res.status(200).send({ message: "Deleted" });
  } catch (error) {
    res.status(500).send({ error });
  }
});

recipesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recipes = await Recipe.find({ userOwnerId: id });

    res.status(200).send({ recipes });
  } catch (error) {
    res.status(500).send({ error });
  }
});
