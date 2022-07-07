import { Router } from "express";
import validSchema from "../middlewares/validSchemas.js";
import usersSchema from "../schemas/usersSchema.js";
import { addBattle } from "./../controllers/battleController.js";

const battleRouter = Router();

battleRouter.post("/battle", validSchema(usersSchema, "users' data"), addBattle);

export default battleRouter;