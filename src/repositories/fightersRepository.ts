/* IMPORTANT: in order for it to work as intended, you need to add a UNIQUE constraint on 'username' column at the table fighters */

import connectDB from "../database.js";

interface Result {
    winner: string | null,
    loser: string | null,
    draw: boolean
}

async function updateFighters(firstUser: string, secondUser: string, result: Result) {
    const connection = await connectDB();

    let updateWinner: string, updateLoser: string;
    let updateDraws: boolean = false;

    if (result.winner === firstUser) {
        updateWinner = firstUser;
        updateLoser = secondUser;
    } else if (result.winner === secondUser) {
        updateWinner = secondUser;
        updateLoser = firstUser;
    } else {
        updateDraws = true;
    }

    if (updateDraws) {
        await connection.query(`
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, 0, 0, 1)
        ON CONFLICT (username)
        DO UPDATE SET draws = fighters.draws + 1
        WHERE fighters.username = $1
        `, [firstUser]);

        await connection.query(`
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, 0, 0, 1)
        ON CONFLICT (username)
        DO UPDATE SET draws = fighters.draws + 1
        WHERE fighters.username = $1
        `, [secondUser]);

        return;
    }

    await connection.query(`
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, 1, 0, 0)
        ON CONFLICT (username)
        DO UPDATE SET wins = fighters.wins + 1
        WHERE fighters.username = $1 
        `, [updateWinner]);

    await connection.query(`
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, 0, 1, 0)
        ON CONFLICT (username)
        DO UPDATE SET losses = fighters.losses + 1
        WHERE fighters.username = $1 
        `, [updateLoser]);

}

async function selectRanking(){
    const connection = await connectDB();

    return await connection.query(`
        SELECT username, wins, losses, draws FROM fighters
        ORDER BY wins DESC, draws DESC
    `);
}

const fightersRepository = {
    updateFighters,
    selectRanking
};

export default fightersRepository;