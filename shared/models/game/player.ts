import { ScoreboardData, getDefaultScorebordData } from "./score";

export default interface Player {
    rolls: number;
    score: number;
    scoreboardData: ScoreboardData;
    displayedName: string;
    playerId: string;
    userId?: string;
}

export const getDefaultPlayer = (displayedName: string, playerId: string, userId?: string): Player => ({
    rolls: 0,
    score: 0,
    scoreboardData: getDefaultScorebordData(),
    displayedName,
    playerId,
    userId,
});

