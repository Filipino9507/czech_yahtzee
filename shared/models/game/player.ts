import ScoreboardData from "./scoreboard-data";

export default class Player {
    public rolls: number;
    public extraRolls: number;
    public scoreboardData: ScoreboardData;
    public userId?: string;

    public constructor(userId?: string) {
        this.rolls = 0;
        this.extraRolls = 0;
        this.scoreboardData = new ScoreboardData();
        this.userId = userId;
    }
}
