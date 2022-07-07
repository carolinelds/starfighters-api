import { Router } from "express";

import mainRouter from "./mainRouter.js";
import battleRouter from "./battleRouter.js";


const router = Router();

router.use(mainRouter);
router.use(battleRouter);


export default router;
