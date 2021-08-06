import { ScoreboardData, getDefaultScorebordData } from "./score";

export default interface Player {
    rolls: number;
    extraRolls: number;
    scoreboardData: ScoreboardData;
    userId?: string;
}

export const getDefaultPlayer = (userId?: string): Player => ({
    rolls: 0,
    extraRolls: 0,
    scoreboardData: getDefaultScorebordData(),
    userId,
});

