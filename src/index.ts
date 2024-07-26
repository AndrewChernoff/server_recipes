import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { recipesRouter } from "./routes/recipes";

const app: Express = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://whitedrew538:MERN_recipes_app@recipes.9gxymlp.mongodb.net/?retryWrites=true&w=majority&appName=recipes')
  .then(() => console.log('connected'))
  .catch(() => console.log('Error'))


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!!ttttttt!');
});

app.use('/', authRouter)
app.use('/recipes', recipesRouter);

app.listen(4000, () => {
  console.log(`[server]: Server is running at http://localhost:${4000}`);
});