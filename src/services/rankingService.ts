import fightersRepository from "../repositories/fightersRepository.js";

export async function getRankingService(){
    const ranking = await fightersRepository.selectRanking();

    const formatedRanking: object = {
        fighters: ranking.rows
    };

    return formatedRanking;
}