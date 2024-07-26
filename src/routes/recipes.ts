import { Router } from 'express';
import { Request, Response } from "express";
import { Recipe } from '../models/recipe';
import { Error } from 'mongoose';
import { User } from '../models/user';

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

recipesRouter.post('/', async (req: Request, res: Response) => {
    try {  
        
        const {userOwner} = req.body 

        const newRecipe = new Recipe(req.body)

          const item = await newRecipe.save()
          debugger

          await User.findByIdAndUpdate(
            { _id: userOwner }, 
            { $inc: { recipesQuantity: 1 } }
        );

          res.status(200).send(item)
        
    } catch (error) {
        res.status(500).send({error})
    }
})


recipesRouter.delete('/:id', async (req: Request, res: Response) => {
    try {  
        const { id } = req.params

        const {userOwner} = req.body
    
        await Recipe.findByIdAndDelete({_id: id})

        await User.findByIdAndUpdate(
            { _id: userOwner }, 
            { $inc: { recipesQuantity: -1 } }
        );

        res.status(200).send({message: 'Deleted'})
        
    } catch (error) {
        res.status(500).send({error})
    }
})

recipesRouter.get('/:id', async (req: Request, res: Response) => {
    try {  
        const { id } = req.params
    
        const recipes = await Recipe.find({userOwner: id})

        res.status(200).send({recipes})
        
    } catch (error) {
        res.status(500).send({error})
    }
})

recipesRouter.put('/:id', async (req: Request, res: Response) => {
    try {  
        const { id } = req.params
    
        await Recipe.findByIdAndUpdate({_id: id}, { ...req.body })

        res.status(200).send(req.body)
        
    } catch (error) {
        res.status(500).send({error})
    }
})
