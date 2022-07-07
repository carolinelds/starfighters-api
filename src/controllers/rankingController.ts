import { Request, Response } from "express";
import { getRankingService } from "./../services/rankingService.js";

export async function getRanking(req: Request, res: Response) {
    
    const ranking = await getRankingService();

    res.send(ranking);
}