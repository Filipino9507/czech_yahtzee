import SerializableConvertible from "../seriazable-convertible";
import ScoreboardData, { ScoreboardDataSerializable } from "./scoreboard-data";

export interface PlayerSerializable {
    rolls: number;
    extraRolls: number;
    scoreboardData: ScoreboardDataSerializable;
    userId?: string;
}

export default class Player implements SerializableConvertible<PlayerSerializable> {
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

    public toSerializable(): PlayerSerializable {
        return {
            ...this,
            scoreboardData: this.scoreboardData.toSerializable(),
        } as PlayerSerializable;
    }
}
