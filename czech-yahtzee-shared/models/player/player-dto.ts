import Scoreboard from "./scoreboard-data";

export default interface PlayerDTO {
    rolls: number;
    extraRolls: number;
    userId?: string;
    scoreboardData: Scoreboard;
}