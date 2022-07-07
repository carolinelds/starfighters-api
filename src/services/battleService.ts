import axios from "axios";
import fightersRepository from "../repositories/fightersRepository.js";
import errorResponse from "./../responses/errorResponses.js";

export async function addBattleService(firstUser: string, secondUser: string){

    const firstUserRepos = await axios.get(`http://api.github.com/users/${firstUser}/repos`);

    const secondUserRepos = await axios.get(`http://api.github.com/users/${secondUser}/repos`);


    if (!Array.isArray(firstUserRepos.data) || !Array.isArray(secondUserRepos.data)){
        return errorResponse.notFound("One or both users");
    }

    let firstUserStars: number = 0;
    firstUserRepos.data.forEach(repo => firstUserStars += repo.stargazers_count );
    
    let secondUserStars: number = 0;
    secondUserRepos.data.forEach(repo => secondUserStars += repo.stargazers_count );

    interface Result {
        winner: string | null,
        loser: string | null,
        draw: boolean
    }

    let result: Result;

    if (firstUserStars > secondUserStars){
        result = {
            winner: firstUser,
            loser: secondUser,
            draw: false
        };
    } else if (firstUserStars < secondUserStars){
        result = {
            winner: secondUser,
            loser: firstUser,
            draw: false
        };
    } else {
        result = {
            winner: null,
            loser: null,
            draw: true
        };
    }

    await fightersRepository.updateFighters(firstUser, secondUser, result);

    return result;
}