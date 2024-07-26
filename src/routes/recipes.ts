import { Router } from 'express';
import { Request, Response } from "express";
import { Recipe } from '../models/recipe';

export const recipesRouter = Router({})

recipesRouter.get('/', async (req: Request, res: Response) => {
    try {  
        const recipes = await Recipe.find({})
  
        if(recipes.length === 0 || !recipes) {
            res.status(200).send({message: 'No recipes'})
        } else {
          res.status(200).send(recipes)
        }
    } catch (error) {
        res.status(500).send({error})
    }
})