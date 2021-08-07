import { ScoreboardData, getDefaultScorebordData } from "./score";

export default interface Player {
    rolls: number;
    scoreboardData: ScoreboardData;
    displayedName: string;
    userId?: string;
}

export const getDefaultPlayer = (displayedName: string, userId?: string): Player => ({
    rolls: 0,
    scoreboardData: getDefaultScorebordData(),
    displayedName,
    userId,
});

