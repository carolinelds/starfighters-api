import { Router } from "express";

import mainRouter from "./mainRouter.js";
import battleRouter from "./battleRouter.js";
import rankingRouter from "./rankingRouter.js";


const router = Router();

router.use(mainRouter);
router.use(battleRouter);
router.use(rankingRouter);


export default router;
