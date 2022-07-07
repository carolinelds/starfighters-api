import { Request, Response } from "express";
import { addBattleService } from "./../services/battleService.js";

export async function addBattle(req: Request, res: Response) {
    
    const { firstUser, secondUser } = req.body;
    
    interface Users {
        firstUser: string,
        secondUser: string
    }

    const users : Users = { firstUser, secondUser };

    const result = await addBattleService(firstUser, secondUser);

    res.send(result);
    
}